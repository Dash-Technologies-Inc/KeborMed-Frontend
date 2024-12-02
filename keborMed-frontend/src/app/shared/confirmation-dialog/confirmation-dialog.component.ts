import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-confirmation-dialog',
  standalone: true,
  imports: [CommonModule,FormsModule,MatDialogModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.scss'],
})
export class ConfirmationDialogComponent {
  inputValue = ''; // For input-based confirmation

  constructor(
    public dialogRef: MatDialogRef<ConfirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      title: string; // Title for the dialog
      message: string; // Message for the dialog
      requireInput?: boolean; // If input is required for confirmation
      expectedInput?: string; // The input text required to confirm
    }
  ) {}

  onCancel(): void {
    this.dialogRef.close(false); // Close the dialog without confirmation
  }

  onConfirm(): void {
    // Close the dialog with a confirmation
    this.dialogRef.close({
      confirmed: true,
      inputValue: this.inputValue,
    });
  }

  isConfirmDisabled() {
    // Disable the confirm button if input validation is required and doesn't match
    return this.data.requireInput && this.inputValue !== this.data.expectedInput;
  }
}
