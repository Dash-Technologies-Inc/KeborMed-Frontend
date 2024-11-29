import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { map, Observable } from 'rxjs';
import { ConfirmationDialogComponent } from '../../../shared/confirmation-dialog/confirmation-dialog.component';
import { User } from '../user.model';
import { UserService } from '../user.service';
import { UserStore } from '../user.store';
import { UserFormComponent } from '../user-form/user-form.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  users$: Observable<User[]>;
  actionButtons = [
    { label: 'Delete', action: 'delete' },
    { label: 'View Details', action: 'viewDetails' },
    { label: 'Edit', action: 'edit' },
  ];

  constructor(
    private userService: UserService,
    private userStore: UserStore,
    private dialog: MatDialog
  ) {
    this.users$ = this.userStore.selectAllUsers.pipe(map((users) => users ?? []));
  }

  ngOnInit(): void {
    this.userService.fetchUsers().subscribe();
  }

  // Handle action button clicks
  onActionButtonClick(event: { action: string; user: User }): void {
    if (event.action === 'delete') {
      this.confirmDeleteUser(event.user.id);
    } else {
      this.openUserDialog(event.action, event.user);
    }
  }

  // Open dialog for create, view, or edit actions
  openUserDialog(mode:string, user: User | null = null): void {
    const dialogRef = this.dialog.open(UserFormComponent, {
      width: '500px',
      data: { mode, user },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (mode === 'create') {
          this.userStore.addUser (result); // Add user
        } else if (mode === 'edit') {
          this.userStore.updateUser(result); // Update user
        }
      }
    });
  }

  

  private confirmDeleteUser(userId: number): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        title: 'Delete User',
        message: 'Are you sure you want to delete this user?',
      },
    });

    dialogRef.afterClosed().subscribe((confirmed) => {
      if (confirmed) {
        this.userStore.deleteUser(userId);
      }
    });
  }
}
