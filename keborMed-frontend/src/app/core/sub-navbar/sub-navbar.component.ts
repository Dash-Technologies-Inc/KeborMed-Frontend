import { Component } from '@angular/core';
import { User } from '../../modules/user/user.model';
import { MatDialog } from '@angular/material/dialog';
import { UserFormComponent } from '../../modules/user/user-form/user-form.component';
import { UserStore } from '../../modules/user/user.store';

@Component({
  selector: 'app-sub-navbar',
  standalone: true,
  imports: [],
  templateUrl: './sub-navbar.component.html',
  styleUrl: './sub-navbar.component.scss'
})
export class SubNavbarComponent {

  constructor(private dialog: MatDialog,
    private userStore: UserStore,
  ) {

  }

  openUserDialog(mode: string, user: User | null = null): void {
    const dialogRef = this.dialog.open(UserFormComponent, {
      width: '500px',
      data: { mode, user },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.userStore.addUser(result); // Add user
      }
    });
  }

}
