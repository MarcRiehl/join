import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild
} from '@angular/core';

import { AbstractControl, ValidationErrors, FormControl, FormGroup, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { Contact as ContactInterface } from '../../../../interfaces/contacts/contact';

@Component({
  selector: 'app-new-user-dialog',
  imports: [ReactiveFormsModule],
  templateUrl: './new-user-dialog.html',
  styleUrl: './new-user-dialog.scss',
})

export class NewUserDialog {
  
  // @Input({ required: true })

  // newUser!: ContactInterface;

  @Output()
  close = new EventEmitter<void>();

  private dialogElement?: HTMLDialogElement;

  @ViewChild('dialog')
  set dialogRef(dialog: ElementRef<HTMLDialogElement> | undefined) {

    if (!dialog) return;

    this.dialogElement = dialog.nativeElement;

    if (!this.dialogElement.open) {
      this.dialogElement.showModal();
    }
  }

  closeDialog(): void {
    this.dialogElement?.close();
    this.close.emit();
  }

  onDialogClose(): void {
    this.close.emit();
  }

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
  
  async onSubmit() {}
}

export function fullNameValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = (control.value ?? '').trim();
    
    const parts = value.split(/\s+/);

    return parts.length >= 2 ? null : { fullName: true };
  };
}

