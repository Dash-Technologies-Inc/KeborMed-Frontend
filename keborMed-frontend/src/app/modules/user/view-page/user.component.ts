import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { User } from '../user.model';
import { UserStore } from '../user.store';
import { UserFormComponent } from '../user-form/user-form.component';
import { ConfirmationDialogComponent } from '../../../shared/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  allUsers: User[] = []; // Store all users
  filteredUsers: User[] = []; // Store filtered users
  searchQuery: string = ''; // Store current search query
  actionButtons = [
    { label: 'Delete', action: 'delete' },
    { label: 'View Details', action: 'viewDetails' },
    { label: 'Edit', action: 'edit' },
  ];

  constructor(
    private userStore: UserStore,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    // Load users and initialize both allUsers and filteredUsers
    this.userStore.selectAllUsers.subscribe((users) => {
      this.allUsers = users;
      this.filteredUsers = [...users]; // Initially, show all users
    });
  }

  // Handle search logic
  onSearch(query: string): void {
    this.searchQuery = query;
    this.filteredUsers = this.allUsers.filter((user) =>
      Object.values(user)
        .join(' ')
        .toLowerCase()
        .includes(query.toLowerCase())
    );
  }

  // Handle action button clicks
  onActionButtonClick(event: { action: string; user: User }): void {
    if (event.action === 'delete') {
      this.confirmDeleteUser(event.user);
    } else {
      this.openUserDialog(event.action, event.user);
    }
  }

  // Open dialog for create, view, or edit actions
  openUserDialog(mode: string, user: User | null = null): void {
    const dialogRef = this.dialog.open(UserFormComponent, {
      width: '500px',
      data: { mode, user },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (result.mode === 'create') {
          this.userStore.addUser(result.data); // Add user
        } else if (result.mode === 'edit') {
          this.userStore.updateUser(result.data); // Update user
        }
      }
    });
  }


  confirmDeleteUser(user:User): void {
    let entityName = 'User'
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        title: 'Delete ' + entityName ,
        message: `Are you sure you want to delete "${user.firstName + ' ' + user.lastName}"? This action cannot be undone.`,
        requireInput: true,
        expectedInput: `${user.firstName + ' ' + user.lastName}`, // Entity name to be typed as confirmation
      },
    });
  
    dialogRef.afterClosed().subscribe((result) => {
      if (result?.confirmed) {
        console.log('Entity deleted:', entityName);
        this.userStore.deleteUser(user.id);
        this.filteredUsers = this.allUsers.filter((data) => data.id !== user.id); // Update filtered list
      } else {
        console.log('Deletion cancelled');
      }
    });
  }
}
