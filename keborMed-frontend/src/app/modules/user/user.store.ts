import { Injectable } from '@angular/core';
import { createStore, withProps } from '@ngneat/elf';
import {
  withEntities,
  deleteEntities,
  setEntities,
  updateEntities,
  selectAllEntities,
  addEntities,
} from '@ngneat/elf-entities';
import { persistState, localStorageStrategy } from '@ngneat/elf-persist-state';
import { User } from './user.model';
import { map } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserStore {
  private store = createStore(
    { name: 'user' },
    withEntities<User>(),
    withProps<{ isLoading: boolean }>({ isLoading: false })
  );

  constructor() {
    // Set up persistence
    persistState(this.store, { key: 'user', storage: localStorageStrategy });
  }

  // Select all users

  selectAllUsers = this.store.pipe(
    selectAllEntities(),
    map((users) => [...users].reverse()) // Reverse the order
  );
  // Set users
  setUsers = (users: User[]) => this.store.update(setEntities(users));

  // Delete a user
  deleteUser = (id: number) => this.store.update(deleteEntities(id));

  // Add a single user with dynamic ID
  addUser(newUser: Partial<User>): void {
    const users = this.selectAllUsers;
    const newId = users.subscribe.length + 1;

    // Validate and create a new user
    const user: User = {
      ...newUser,
      id: newId, // Generate ID dynamically
    } as User;

    this.store.update(addEntities(user));
  }

  // Update a user
  updateUser = (updatedUser: User) =>
    this.store.update(updateEntities(updatedUser.id, () => updatedUser));

}
