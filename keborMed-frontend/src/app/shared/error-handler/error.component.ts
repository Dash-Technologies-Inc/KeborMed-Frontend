import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-error',
  standalone: true,
  imports: [RouterModule],
  template: `
    <div class="error-page">
      <h1>Something went wrong</h1>
      <p>We apologize for the inconvenience. Please try again later.</p>
      <button mat-raised-button color="primary" routerLink="/">Go to Home</button>
    </div>
  `,
  styles: [`
    .error-page {
      text-align: center;
      margin-top: 50px;
    }
  `],
})
export class ErrorComponent {}
