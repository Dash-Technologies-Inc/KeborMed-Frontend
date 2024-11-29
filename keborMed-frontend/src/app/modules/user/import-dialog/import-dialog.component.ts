import { Component } from '@angular/core';
import { UserStore } from '../user.store';
import * as Papa from 'papaparse';
import { map, Observable } from 'rxjs';
import { User } from '../user.model';
import { MatDialogRef } from '@angular/material/dialog';

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
    private dialogRef: MatDialogRef<ImportDialogComponent>
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
      if (uniqueUsers.length <= 0) {
        this.parsedData = [];
        this.uniqueUsersCount = 0;
      }
 
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
      else
      {
        this.parsedData = [];
        this.uniqueUsersCount = 0;
      }
    })).subscribe();
  }



  onCancel(): void {
    this.parsedData = [];
    this.uniqueUsersCount = 0;
    this.dialogRef.close();
  }
}
