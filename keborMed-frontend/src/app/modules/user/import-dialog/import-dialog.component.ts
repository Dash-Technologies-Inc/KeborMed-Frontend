import { Component } from '@angular/core';
import { UserStore } from '../user.store';
import * as Papa from 'papaparse';
import { map, Observable } from 'rxjs';
import { User } from '../user.model';
import { MatDialogRef } from '@angular/material/dialog';
import { UserService } from '../user.service';

@Component({
  selector: 'app-import-dialog',
  templateUrl: './import-dialog.component.html',
  styleUrls: ['./import-dialog.component.scss'],
})
export class ImportDialogComponent {
  parsedData: any[] = [];
  uniqueUsersCount: number = 0;
  users$: Observable<User[]>;
  errorMessage: string | null = null; // To store error messages

  constructor(
    private userStore: UserStore,
    private dialogRef: MatDialogRef<ImportDialogComponent>,
    private userService: UserService
  ) {
    this.users$ = this.userStore.selectAllUsers.pipe(map((users) => users ?? []));
  }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      try {
        if (!file.name.endsWith('.csv')) {
          throw new Error('Invalid file format. Please upload a CSV file.');
        }

        Papa.parse(file, {
          header: true,
          skipEmptyLines: true,
          complete: (result) => {
            if (!result || !result.data || !Array.isArray(result.data)) {
              throw new Error('Failed to parse the file. Ensure it is a valid CSV.');
            }
            this.parsedData = result.data;
            this.calculateUniqueUsers();
          },
          error: (err) => {
            throw new Error(`Error parsing CSV: ${err.message}`);
          },
        });
      } catch (error: any) {
        this.errorMessage = error.message || 'An unknown error occurred while processing the file.';
        console.error('File Processing Error:', error);
      }
    } else {
      this.errorMessage = 'No file selected. Please upload a CSV file.';
    }
  }

  calculateUniqueUsers(): void {
    this.users$
      .pipe(
        map((existingUsers) => {
          const existingEmails = new Set(existingUsers.map((user) => user.email));
          const uniqueUsers = this.parsedData.filter(
            (user: User) => !existingEmails.has(user.email)
          );
          this.uniqueUsersCount = uniqueUsers.length;
        })
      )
      .subscribe({
        error: (err) => {
          this.errorMessage = 'An error occurred while calculating unique users.';
          console.error('Unique User Calculation Error:', err);
        },
      });
  }

  onImportSubmit(): void {
    this.users$
      .pipe(
        map((existingUsers) => {
          // Extract existing emails and IDs
          const existingEmails = new Set(existingUsers.map((user) => user.email));
          const maxExistingId = Math.max(...existingUsers.map((user) => user.id), 0);

          // Filter unique users and add IDs
          const uniqueUsers = this.parsedData
            .filter((user: User) => !existingEmails.has(user.email))
            .map((user: Partial<User>, index: number) => ({
              ...user,
              id: maxExistingId + index + 1, // Dynamically assign ID
            }));

          if (uniqueUsers.length > 0) {
            this.userStore.addUsers(uniqueUsers);
            this.dialogRef.close();
          } else {
            this.errorMessage = 'No unique users found to import.';
          }
        })
      )
      .subscribe({
        error: (err) => {
          this.errorMessage = 'An error occurred while importing users.';
          console.error('Import Error:', err);
        },
      });
  }

  downloadSampleFile(): void {
    try {
      const sampleData = this.userService.getSampleCsvData();
      const blob = new Blob([sampleData], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);

      const anchor = document.createElement('a');
      anchor.href = url;
      anchor.download = 'sample-users.csv';
      anchor.click();

      window.URL.revokeObjectURL(url);
    } catch (error) {
      this.errorMessage = 'An error occurred while downloading the sample file.';
      console.error('Sample File Download Error:', error);
    }
  }

  onCancel(): void {
    this.parsedData = [];
    this.uniqueUsersCount = 0;
    this.errorMessage = null; // Clear any existing error messages
    this.dialogRef.close();
  }
}
