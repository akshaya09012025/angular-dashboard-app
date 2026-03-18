import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent {
  @Output() userAdded = new EventEmitter<any>();
  @Output() closeForm = new EventEmitter<void>();

  form: FormGroup;
  submitError: string | null = null; // For server or submit errors

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      role: ['', Validators.required]
    });
  }

  submit() {
    this.submitError = null; // Reset previous error

    if (this.form.invalid) {
      this.form.markAllAsTouched(); // Highlight invalid fields
      this.submitError = 'Please fix the errors above before submitting.';
      return;
    }

    try {
      const newUser = this.form.value;
      // Edge case: check for duplicate email
      if (this.isDuplicateEmail(newUser.email)) {
        this.submitError = 'Email already exists. Please use a different email.';
        return;
      }

      this.userAdded.emit(newUser);
      this.form.reset();
      this.closeForm.emit();
    } catch (err) {
      console.error('Error submitting form:', err);
      this.submitError = 'Something went wrong. Please try again later.';
    }
  }

  cancel() {
    this.closeForm.emit();
  }

  private isDuplicateEmail(email: string): boolean {
    return false;
  }

  // Convenience getters for template
  get name() { return this.form.get('name'); }
  get email() { return this.form.get('email'); }
  get role() { return this.form.get('role'); }
}