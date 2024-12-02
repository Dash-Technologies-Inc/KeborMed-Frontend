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
  constructor(private userStore: UserStore,
    private dialogRef: MatDialogRef<ImportDialogComponent>,
    private userService : UserService
  ) {
    this.users$ = this.userStore.selectAllUsers.pipe(map((users) => users ?? []));
  }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: (result) => {
          this.parsedData = result.data;
          this.calculateUniqueUsers();
        },
      });
    }
  }

  calculateUniqueUsers(): void {
    this.users$.pipe(map((existingUsers) => {
      const existingEmails = new Set(existingUsers.map((user) => user.email));
      const uniqueUsers = this.parsedData.filter(
        (user: User) => !existingEmails.has(user.email)
      );
      this.uniqueUsersCount = uniqueUsers.length;

    })).subscribe();
  }

  onImportSubmit(): void {
    this.users$.pipe(map((existingUsers) => {
      // Step 1: Extract existing emails and IDs
      const existingEmails = new Set(existingUsers.map((user) => user.email));
      const maxExistingId = Math.max(...existingUsers.map((user) => user.id), 0);

      // Step 2: Filter unique users and add IDs
      const uniqueUsers = this.parsedData
        .filter((user: User) => !existingEmails.has(user.email))
        .map((user: Partial<User>, index: number) => ({
          ...user,
          id: maxExistingId + index + 1, // Dynamically assign ID
        }));

      if (uniqueUsers.length > 0) {
        // Step 3: Add unique users to the store
        this.userStore.addUsers(uniqueUsers);
        this.dialogRef.close();

      }
      else {
        this.parsedData = [];
        this.uniqueUsersCount = 0;
      }
    })).subscribe();
  }


  downloadSampleFile(): void {
    let sampleData = this.userService.getSampleCsvData();
    const blob = new Blob([sampleData], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);

    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = 'sample-users.csv';
    anchor.click();

    window.URL.revokeObjectURL(url);
  }


  onCancel(): void {
    this.parsedData = [];
    this.uniqueUsersCount = 0;
    this.dialogRef.close();
  }
}
