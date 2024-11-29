import { Injectable } from '@angular/core';
import { createStore, withProps } from '@ngneat/elf';
import {
  withEntities,
  deleteEntities,
  setEntities,
  updateEntities,
  selectAllEntities,
  addEntities,
  upsertEntities,
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
    // Get the current state of users
    const currentState = this.store.getValue();
    const currentUsers = currentState.ids.map((id) => currentState.entities[id]);
  
    // Generate a new ID based on the current state
    const newId = (currentUsers.length > 0 ? Math.max(...currentUsers.map((user) => user.id)) : 0) + 1;
  
    // Create the new user with a dynamically generated ID
    const user: User = {
      ...newUser,
      id: newId,
    } as User;
  
    // Add the new user to the store
    this.store.update(addEntities(user));
  }
  

  addUsers(users: User[]) {
    this.store.update(upsertEntities(users));
  }

  // Update a user
  updateUser = (updatedUser: User) =>
    this.store.update(updateEntities(updatedUser.id, () => updatedUser));

}
