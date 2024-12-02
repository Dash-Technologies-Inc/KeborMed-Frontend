import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, of, switchMap, tap } from 'rxjs';
import { UserStore } from './user.store';
import { ApiResponse, User } from './user.model';
import { SettingsService } from '../settings/settings.service';

@Injectable({ providedIn: 'root' })
export class UserService {
  private apiUrl = 'https://dummyjson.com/users';

  constructor(private http: HttpClient, private userStore: UserStore, private settingsService: SettingsService) { }

  // Fetch users from the API and set them in the store
  fetchUsers(): Observable<User[]> {
    return this.userStore.selectAllUsers.pipe(
      switchMap((users) => {
        if (users.length > 0) {
          // Return users from the store
          return of(users);
        } else {
          // Fetch users from the API
          return this.http.get<ApiResponse>(this.apiUrl).pipe(
            map((response: ApiResponse) => response.users), // Extract users from ApiResponse
            tap((fetchedUsers: User[]) => {
              // Update the store with the fetched users
              this.userStore.setUsers(fetchedUsers);
            })
          );
        }
      })
    );
  }

  // Additional CRUD operations (optional)
  deleteUser(userId: number): void {
    // Example logic if you have delete functionality on the server
    // this.http.delete(`${this.apiUrl}/${userId}`).subscribe(() => {
    this.userStore.deleteUser(userId);
    // });
  }

  formatDate(date: string): string {
    let currentDateFormat = this.settingsService.loadSettings().dateFormat;

    const [year, month, day] = date.split('-'); // Assuming date format is YYYY-MM-DD
    switch (currentDateFormat) {
      case 'YYYY/MM/DD':
        return `${year}/${month}/${day}`;
      case 'DD/MM/YYYY':
        return `${day}/${month}/${year}`;
      case 'MM-DD-YYYY':
        return `${month}-${day}-${year}`;
      default:
        return date;
    }
  }

  getSampleCsvData() {
    return `firstName,lastName,age,gender,email,birthDate
John,Doe,30,male,john.doe@example.com,1993-05-15
Jane,Smith,25,female,jane.smith@example.com,1998-02-20`;
  }

}
