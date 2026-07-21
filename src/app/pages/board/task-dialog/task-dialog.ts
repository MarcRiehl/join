import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  inject,
  computed,
  signal
} from '@angular/core';
import { from, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators, AsyncValidatorFn } from '@angular/forms';
import { DialogService, DialogType } from '../../../services/dialog/dialog.service';
import { ToastService } from '../../../services/toast/toast-service';
import { ContactService } from '../../../services/contacts/contact.service';
import { noPastDateValidator, getTodayDateString } from '../../../utils/date.util/date.util';
import { fullNameValidator, splitFullName } from '../../../utils/name.util/name.util';
import { AddTask } from "../../add-task/add-task";
import { OverlayContainer } from '@angular/cdk/overlay';

@Component({
  selector: 'app-task-dialog',
  imports: [ReactiveFormsModule, AddTask],
  templateUrl: './task-dialog.html',
  styleUrl: './task-dialog.scss',
})
export class TaskDialog implements AfterViewInit, OnInit {
  readonly dialogService = inject(DialogService);
  private readonly contactService = inject(ContactService);
  private toastService = inject(ToastService);

  readonly DialogType = DialogType;
  type = signal<DialogType | null>(null);


  isTaskDialog = computed(() =>
    this.dialogService.current().type === DialogType.AddTask
  );

  selectedContact = this.contactService.selectedContact;

  isEditMode = computed(() => this.selectedContact() !== null);

  @ViewChild('dialog')
  dialog!: ElementRef<HTMLDialogElement>;

  private isClosing = false;

  private overlayContainer = inject(OverlayContainer);
  private observer?: MutationObserver;

  ngAfterViewInit(): void {
    this.dialog.nativeElement.showModal();

    const container = this.overlayContainer.getContainerElement();

    this.observer = new MutationObserver(() => {
      this.moveOverlayIntoDialog();
    });

    this.observer.observe(container, {
      childList: true,
      subtree: true
    });
  }

  ngOnInit(): void {
    const contact = this.selectedContact();

    if (!contact) {
      return;
    }

    this.addTaskForm.patchValue({
      name: `${contact.firstname} ${contact.lastname}`,
      email: contact.email,
      phone: contact.phone?.toString() ?? ''
    });

  }

  closeDialog(): void {
    this.startCloseAnimation();
  }

  //protected
  protected startCloseAnimation(): void {

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
    if (event.target !== this.dialog.nativeElement) {
      return;
    }

    if (
      event.animationName !== 'dialogOut' &&
      event.animationName !== 'dialogOutMobile'
    ) {
      return;
    }

    this.moveOverlayBackToBody();
    this.observer?.disconnect();
    const dialog = this.dialog.nativeElement;
    dialog.classList.remove('closing');
    dialog.close();
    this.isClosing = false;
    this.dialogService.clear();
  }

  private moveOverlayIntoDialog(): void {
    const container = this.overlayContainer.getContainerElement();

    if (container.parentElement !== this.dialog.nativeElement) {
      this.dialog.nativeElement.appendChild(container);
    }
  }

  private moveOverlayBackToBody(): void {
    const container = this.overlayContainer.getContainerElement();

    if (container.parentElement !== document.body) {
      document.body.appendChild(container);
    }
  }

  addTaskForm = new FormGroup({
    name: new FormControl('', {
      validators: [Validators.required, Validators.pattern(/^[A-Za-zÄÖÜäöüß\s'-]+$/), fullNameValidator()],
      asyncValidators: [this.nameValidator()],
      updateOn: 'blur'
    }),
    email: new FormControl('', {
      validators: [Validators.required, Validators.email],
      updateOn: 'blur'
    }),
    phone: new FormControl('', {
      validators: [Validators.required, Validators.pattern(/^[0-9+\s()-]+$/)],
      updateOn: 'blur'
    })
  });

  get name() {
    return this.addTaskForm.controls.name;
  }

  get email() {
    return this.addTaskForm.controls.email;
  }

  get phone() {
    return this.addTaskForm.controls.phone;
  }

  formMessage = '';
  messageType: 'success' | 'error' | '' = '';

  nameValidator(): AsyncValidatorFn {
    return (control: AbstractControl) => {
      const value = (control.value ?? '').trim();

      if (!value || control.errors) {
        return of(null);
      }

      return from(
        this.contactService.contactExists(
          value,
          this.selectedContact()?.id
        )
      ).pipe(
        map(exists => (exists ? { nameExists: true } : null)),
        catchError(() => of(null))
      );
    };
  }


  async onSubmit(): Promise<void> {

    if (this.addTaskForm.invalid) {
      this.addTaskForm.markAllAsTouched();
      return;
    }

    const { firstname, lastname } = splitFullName(this.name.value!);
    const editMode = this.isEditMode();

    let success = false;

    if (this.isEditMode()) {

      success = await this.contactService.updateContact({
        id: this.selectedContact()!.id,
        firstname,
        lastname,
        email: this.email.value!,
        phone: this.phone.value!
      });

    } else {

      success = await this.contactService.addContact({
        firstname,
        lastname,
        email: this.email.value!,
        phone: this.phone.value!
      });

    }

    if (success) {
      this.addTaskForm.reset();
      this.closeDialog();

      if (!editMode) {
        this.toastService.success('Contact successfully created.');
      }
    }
  }

  onRemoveSelectedContact() {
    this.contactService.deleteSelectedContact();
    this.closeDialog();
  }
}