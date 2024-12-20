import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from '../user.model';
import { SettingsService } from '../../settings/settings.service';
import { UserService } from '../user.service';
import { MatDialog } from '@angular/material/dialog';

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

  displayedColumns: string[] = ['fullName', 'age', 'gender', 'email','birthDate', 'actions']; // Updated columns
  paginatedUsers: User[] = [];
  currentPage: number = 1;
  @Input() itemsPerPage: number = 5;

  constructor(private settingsService : SettingsService,
    private userService : UserService,
  ) {
    this.currentDateFormat = this.settingsService.loadSettings().dateFormat;
  }

  ngOnChanges(): void {
    this.updatePaginatedUsers();
  }

  onSelectUser(user: User): void {
    this.userSelected.emit(user);
  }

  onActionButtonClick(action: { label: string; action: string }, user: User, confirmed: boolean = true): void {
    if (confirmed) {
      this.actionButtonClick.emit({ action: action.action, user });
    }
  }

  formatDate(date: string): string {
        return this.userService.formatDate(date);
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
  
  updatePaginatedUsers(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedUsers = this.users.slice(startIndex, endIndex);
  }

  onPageChange(newPage: number): void {
    this.currentPage = newPage;
    this.updatePaginatedUsers();
  }


  dropdownItems = [
    { label: 'Edit', action: 'edit' },
    { label: 'View Details', action: 'viewDetails' },
  ];
  
  onDropdownAction(action: string, user: User): void {
    this.onActionButtonClick({ label: action, action }, user);
  }

}
