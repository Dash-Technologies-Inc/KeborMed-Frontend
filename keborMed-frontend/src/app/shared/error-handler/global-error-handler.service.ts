import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar'; // For user feedback
import { Router } from '@angular/router';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  constructor(private injector: Injector) {}

  handleError(error: any): void {
    const snackBar = this.injector.get(MatSnackBar);
    const router = this.injector.get(Router);

    console.error('An error occurred:', error);

    // Show user-friendly feedback
    snackBar.open('An unexpected error occurred. Please try again.', 'Close', {
      duration: 5000,
    });

    // Optionally navigate to an error page
    router.navigate(['/error']);

    // Log the error to an external service (e.g., Sentry, LogRocket)
    this.logError(error);
  }

  private logError(error: any): void {
    // Implement logging to an external service here
    console.log('Error logged to the server:', error);
  }
}
