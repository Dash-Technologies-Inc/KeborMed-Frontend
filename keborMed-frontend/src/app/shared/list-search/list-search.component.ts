import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-list-search',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './list-search.component.html',
  styleUrl: './list-search.component.scss'
})
export class ListSearchComponent {
  @Input() placeholder = 'Search';
  @Output() search = new EventEmitter<string>();
  searchTerm: string = '';

  onSearchChange(): void {
    this.search.emit(this.searchTerm.trim());
  }
}
