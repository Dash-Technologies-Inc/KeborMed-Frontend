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

  onActionButtonClick(action: { action: string; user: User }) {
    switch (action.action) {
      case 'delete':
        //this.confirmDeleteUser(action.user);
        break;
      case 'edit':
        this.openUserDialog('edit', action.user);
        break;
      case 'viewDetails':
        this.openUserDialog('viewDetails', action.user);
        break;
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

  
}
