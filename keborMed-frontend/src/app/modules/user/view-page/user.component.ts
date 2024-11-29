import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { map, Observable } from 'rxjs';
import { ConfirmationDialogComponent } from '../../../shared/confirmation-dialog/confirmation-dialog.component';
import { User } from '../user.model';
import { UserService } from '../user.service';
import { UserStore } from '../user.store';

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

  // Handle user selection (click on user)
  onUserSelected(user: User): void {
    console.log('User selected:', user);
    // Add logic for user selection if needed
  }

  // Handle action button clicks
  onActionButtonClick(event: { action: string; user: User }): void {
    if (event.action === 'delete') {
      this.confirmDeleteUser(event.user.id);
    } else if (event.action === 'viewDetails') {
      this.viewUserDetails(event.user);
    }
  }

  private confirmDeleteUser(userId: number): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: { 
        title: 'Delete User', 
        message: 'Are you sure you want to delete this user?'
       },
    });

    dialogRef.afterClosed().subscribe((confirmed) => {
      if (confirmed) {
        this.userStore.deleteUser(userId);
      }
    });
  }

  private viewUserDetails(user: User): void {
    alert(`User Details:\n\nName: ${user.name}\nEmail: ${user.email}`);
  }
}
