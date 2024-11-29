import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from '../user.model';
import { SettingsService } from '../../settings/settings.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent {
  currentDateFormat: string = 'YYYY/MM/DD';
  @Input() users: User[] = [];
  @Input() actionButtons: { label: string; action: string }[] = [];
  @Output() userSelected = new EventEmitter<User>();
  @Output() actionButtonClick = new EventEmitter<{ action: string; user: User }>();

  displayedColumns: string[] = ['fullName', 'age', 'gender', 'email','birthDate','phone', 'actions']; // Updated columns

  constructor(private settingsService : SettingsService) {
    this.currentDateFormat = this.settingsService.loadSettings().dateFormat;
  }

  onSelectUser(user: User): void {
    this.userSelected.emit(user);
  }

  onActionButtonClick(action: { label: string; action: string }, user: User): void {
    this.actionButtonClick.emit({ action: action.action, user });
  }

  formatDate(date: string): string {
    const [year, month, day] = date.split('-'); // Assuming date format is YYYY-MM-DD
    switch (this.currentDateFormat) {
      case 'YYYY/MM/DD':
        return `${year}/${month}/${day}`;
      case 'DD/MM/YYYY':
        return `${day}/${month}/${year}`;
      case 'MM-DD-YYYY':
        return `${month}-${day}-${year}`;
      default:
        return date;
    }
  }

  getButtonColor(action: string): string {
    switch (action) {
      case 'delete':
        return 'warn';
      case 'edit':
        return 'accent';
      default:
        return 'primary';
    }
  }
}
