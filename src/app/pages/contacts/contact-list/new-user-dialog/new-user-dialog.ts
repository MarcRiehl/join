import {
  Component, inject
} from '@angular/core';

import { AbstractControl, ValidationErrors, FormControl, FormGroup, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { Contact as ContactInterface } from '../../../../interfaces/contacts/contact';
import { DialogService } from '../../../../services/dialog/dialog.service';
import { DialogHost } from '../../../../layout/dialog-host/dialog-host';

@Component({
  selector: 'app-new-user-dialog',
  imports: [ReactiveFormsModule],
  templateUrl: './new-user-dialog.html',
  styleUrl: './new-user-dialog.scss',
})

export class NewUserDialog {

  // @Input({ required: true })

  // newUser!: ContactInterface;

  newUserForm = new FormGroup({
    name: new FormControl('', {
      validators: [Validators.required, Validators.minLength(4), fullNameValidator()],
      updateOn: 'blur'
    }),
    email: new FormControl('', {
      validators: [Validators.required, Validators.email],
      updateOn: 'blur'
    }),
    phone: new FormControl('', {
      validators: [Validators.required],
      updateOn: 'blur'
    })
  });

  get name() {
    return this.newUserForm.controls.name;
  }

  get email() {
    return this.newUserForm.controls.email;
  }

  get phone() {
    return this.newUserForm.controls.phone;
  }

  formMessage = '';
  messageType: 'success' | 'error' | '' = '';

  async onSubmit() { }

  
    host = inject(DialogHost);
}

export function fullNameValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = (control.value ?? '').trim();

    const parts = value.split(/\s+/);

    return parts.length >= 2 ? null : { fullName: true };
  };
}

