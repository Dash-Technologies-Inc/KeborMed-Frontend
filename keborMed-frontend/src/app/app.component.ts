import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LayoutComponent } from './core/layout/layout.component';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule,LayoutComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor() {
  
  }
}
