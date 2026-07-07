import {
  AfterViewInit,
  Component,
  ElementRef,
  ViewChild,
  inject
} from '@angular/core';
import { from, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AbstractControl, ValidationErrors, FormControl, FormGroup, ReactiveFormsModule, ValidatorFn, Validators, AsyncValidatorFn } from '@angular/forms';
import { DialogService } from '../../../../services/dialog/dialog.service';
import { ContactService } from '../../../../services/contacts/contact.service';


@Component({
  selector: 'app-new-user-dialog',
  imports: [ReactiveFormsModule],
  templateUrl: './new-user-dialog.html',
  styleUrl: './new-user-dialog.scss'
})

export class NewUserDialog implements AfterViewInit {

  private readonly dialogService = inject(DialogService);
  private readonly contactService = inject(ContactService);

  @ViewChild('dialog')
  dialog!: ElementRef<HTMLDialogElement>;

  private isClosing = false;

  ngAfterViewInit(): void {
    this.dialog.nativeElement.showModal();
  }

  closeDialog(): void {
    this.startCloseAnimation();
  }
  //protected
  private startCloseAnimation(): void {

    if (this.isClosing) {
      return;
    }

    this.isClosing = true;
    this.dialog.nativeElement.classList.add('closing');
  }

  onCancel(event: Event): void {
    event.preventDefault();
    this.startCloseAnimation();
  }

  onDialogClick(event: MouseEvent): void {

    const dialog = this.dialog.nativeElement;
    const rect = dialog.getBoundingClientRect();

    const clickedInside =
      event.clientX >= rect.left &&
      event.clientX <= rect.right &&
      event.clientY >= rect.top &&
      event.clientY <= rect.bottom;

    if (!clickedInside) {
      this.startCloseAnimation();
    }

  }

  animationFinished(event: AnimationEvent): void {

    if (
      event.target !== this.dialog.nativeElement ||
      event.animationName !== 'dialogOut'
    ) {
      return;
    }

    const dialog = this.dialog.nativeElement;
    dialog.classList.remove('closing');
    dialog.close();
    this.isClosing = false;
    this.dialogService.clear();
  }

  newUserForm = new FormGroup({
    name: new FormControl('', {
      validators: [Validators.required, fullNameValidator()],
      asyncValidators: [this.nameValidator()],
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

  nameValidator(): AsyncValidatorFn {
    return (control: AbstractControl) => {
      const value = (control.value ?? '').trim();

      if (!value || control.errors) {
        return of(null);
      }

      return from(this.contactService.contactExists(value)).pipe(
        map(exists => (exists ? { nameExists: true } : null)),
        catchError(() => of(null))
      );
    };
  }

  async onSubmit(): Promise<void> {

    if (this.newUserForm.invalid) {
      this.newUserForm.markAllAsTouched();
      return;
    }

    const parts = this.name.value!.trim().split(/\s+/);

    const firstname = parts[0];
    const lastname = parts.slice(1).join(' ');

    const success = await this.contactService.addContact({
      firstname,
      lastname,
      email: this.email.value!,
      phone: this.phone.value!
    });

    if (success) {
      this.newUserForm.reset();
      this.closeDialog();
    }
  }

}

export function fullNameValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = (control.value ?? '').trim();
    if (!value) {
      return null;
    }
    const parts = value.split(/\s+/);
    if (parts.length < 2) {
      return { fullName: true };
    }
    const [firstName, lastName] = parts;
    if (firstName.length < 3 || lastName.length < 3) {
      return { nameTooShort: true };
    }
    return null;
  };
}