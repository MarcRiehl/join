import {
  AfterViewInit,
  Component,
  ElementRef,
  ViewChild,
  inject
} from '@angular/core';
import { AbstractControl, ValidationErrors, FormControl, FormGroup, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { DialogService } from '../../../../services/dialog/dialog.service';

@Component({
  selector: 'app-new-user-dialog',
  imports: [ReactiveFormsModule],
  templateUrl: './new-user-dialog.html',
  styleUrl: './new-user-dialog.scss'
})

export class NewUserDialog implements AfterViewInit {

  private readonly dialogService = inject(DialogService);

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