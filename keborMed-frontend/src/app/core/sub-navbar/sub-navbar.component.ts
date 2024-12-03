import { Component } from '@angular/core';
import { User } from '../../modules/user/user.model';
import { MatDialog } from '@angular/material/dialog';
import { UserFormComponent } from '../../modules/user/user-form/user-form.component';
import { UserStore } from '../../modules/user/user.store';
import { ImportDialogComponent } from '../../modules/user/import-dialog/import-dialog.component';
import { SettingsComponent } from '../../modules/settings/view-page/settings.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-sub-navbar',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './sub-navbar.component.html',
  styleUrl: './sub-navbar.component.scss'
})
export class SubNavbarComponent {

  constructor(private dialog: MatDialog,
    private userStore: UserStore,
  ) {

  }

  openImportDialog(): void {
    this.dialog.open(ImportDialogComponent, {
      width: '600px',
    });
  }
  
  openUserDialog(mode: string, user: User | null = null): void {
    const dialogRef = this.dialog.open(UserFormComponent, {
      width: '500px',
      data: { mode, user },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.userStore.addUser(result.data); // Add user
      }
    });
  }

}
