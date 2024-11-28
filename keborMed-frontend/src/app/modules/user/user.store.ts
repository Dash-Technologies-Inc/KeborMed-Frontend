import { createStore, withProps } from '@ngneat/elf';
import { withEntities, deleteEntities, setEntities, selectAllEntities } from '@ngneat/elf-entities';
import { persistState, localStorageStrategy } from '@ngneat/elf-persist-state';
import { Injectable } from '@angular/core';
import { User } from './user.model';

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
  selectAllUsers = this.store.pipe(selectAllEntities());

  // Delete user
  deleteUser = (id: number) => this.store.update(deleteEntities(id));

  // Set users
  setUsers = (users: User[]) => this.store.update(setEntities(users));
}
