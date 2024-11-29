import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { SubNavbarComponent } from '../sub-navbar/sub-navbar.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule,RouterOutlet,NavbarComponent,SubNavbarComponent,SidebarComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {
  currentRoute = '';

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.router.events.subscribe(() => {
      this.currentRoute = this.router.url.split('/')[1]; // Extract route name
    });
  }
}
