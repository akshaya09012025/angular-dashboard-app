import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserFormComponent } from './user-form/user-form.component';
@NgModule({
  declarations: [UserFormComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  exports: [UserFormComponent]
})
export class UserFormModule {}