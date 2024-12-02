import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export const HttpErrorInterceptorFn: HttpInterceptorFn = (req, next) => {
  // Injecting MatSnackBar for user-friendly error messages
  const snackBar = inject(MatSnackBar);

  return next(req).pipe(
    catchError((error) => {
      // Log the error to the console for debugging
      console.error('HTTP Error:', error);

      // Handle the error and show a user-friendly message
      const errorMessage = getErrorMessage(error);
      snackBar.open(errorMessage, 'Dismiss', {
        duration: 5000,
      });

      // Rethrow the error for further handling
      return throwError(() => error);
    })
  );
};

// Helper function to generate user-friendly error messages
function getErrorMessage(error: any): string {
  if (error.status === 0) {
    return 'Network error: Please check your internet connection.';
  } else if (error.status >= 400 && error.status < 500) {
    return error.error?.message || 'Client error: Something went wrong.';
  } else if (error.status >= 500) {
    return 'Server error: Please try again later.';
  }
  return 'An unexpected error occurred. Please contact support.';
}
