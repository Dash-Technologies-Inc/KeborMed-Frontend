import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-dropdown-menu',
  template: `
    <div class="dropdown-menu">
      <button
        *ngFor="let item of items"
        class="dropdown-item"
        (click)="onItemSelected(item.action)"
      >
        {{ item.label }}
      </button>
    </div>
  `,
  styleUrls: ['./dropdown-menu.component.scss'],
  standalone: true,
  imports:[CommonModule]
})
export class DropdownMenuComponent {
  @Input() items: { label: string; action: string }[] = [];
  @Output() itemSelected = new EventEmitter<string>();

  onItemSelected(action: string): void {
    this.itemSelected.emit(action);
  }
}
