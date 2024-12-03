import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { User } from '../user.model';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
})
export class UserFormComponent implements OnInit {
  mode: 'viewDetails' | 'edit' | 'create';
  user: User | null = null;
  userForm: FormGroup; // Reactive Form

  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: { mode: 'viewDetails' | 'edit' | 'create'; user: User | null },
    private dialogRef: MatDialogRef<UserFormComponent>,
    public userService: UserService
  ) {
    this.mode = data.mode;
    this.user = data.user;

    // Initialize the form
    this.userForm = this.fb.group({
      id: [{ value: '' }],
      firstName: [{ value: '' }, [Validators.required]],
      lastName: [{ value: '', }, [Validators.required]],
      email: [{ value: '', }, [Validators.required, Validators.email]],
      gender: [{ value: '', }, [Validators.required]],
      age: [{ value: '', }, [Validators.required, Validators.min(1)]],
      birthDate: [{ value: '', }, [Validators.required]],
    });
  }

  ngOnInit(): void {
    // Properly initialize formData based on the mode
    if (this.user && (this.mode === 'edit' || this.mode === 'viewDetails')) {
      this.userForm.patchValue(this.user); // Patch existing user data for edit/view
    } else if (this.mode === 'create') {
      this.userForm.reset(); // Ensure the form is reset for create mode
    }
  }

  onSave(): void {
    if (this.userForm.valid) {
      const formData = this.userForm.getRawValue(); // Get values, including disabled fields
      this.dialogRef.close({ data: formData, mode: this.mode }); // Pass the form data back
    } else {
      this.userForm.markAllAsTouched(); // Show validation errors
    }
  }

  formatDate(date: string | undefined): string {
    if (!date) {
      return '';
    }
    return this.userService.formatDate(date);
  }

  editMode() {
    this.mode = "edit";
  }

  onClose(): void {
    this.dialogRef.close(); // Close dialog
  }
}
