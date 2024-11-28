import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { User } from '../user.model';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent {
  @Input() users: User[] = [];
  @Input() actionButtons: { label: string; action: string }[] = [];
  @Output() userSelected = new EventEmitter<User>();
  @Output() actionButtonClick = new EventEmitter<{ action: string; user: User }>();

  isSmallScreen = false;

  constructor(private breakpointObserver: BreakpointObserver) {
    // Use Angular CDK Layout to observe screen size changes
    this.breakpointObserver.observe([Breakpoints.Small, Breakpoints.Handset]).subscribe((result) => {
      this.isSmallScreen = result.matches;
    });
  }

  onSelectUser(user: User): void {
    this.userSelected.emit(user);
  }

  onActionButtonClick(action: { label: string; action: string }, user: User): void {
    this.actionButtonClick.emit({ action: action.action, user });
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
