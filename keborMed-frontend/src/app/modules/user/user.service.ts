import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, of, switchMap, tap } from 'rxjs';
import { UserStore } from './user.store';
import { ApiResponse, User } from './user.model';

@Injectable({ providedIn: 'root' })
export class UserService {
  private apiUrl = 'https://dummyjson.com/users';

  constructor(private http: HttpClient, private userStore: UserStore) {}

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
}
