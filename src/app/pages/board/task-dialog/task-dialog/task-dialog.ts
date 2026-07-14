import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  inject,
  computed
} from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators, AsyncValidatorFn } from '@angular/forms';
import { DialogService } from '../../../../services/dialog/dialog.service';
import { ToastService } from '../../../../services/toast/toast-service';
import { ContactService } from '../../../../services/contacts/contact.service';
import { noPastDateValidator, getTodayDateString } from '../../../../utils/date.util/date.util';

@Component({
  selector: 'app-task-dialog',
  imports: [ReactiveFormsModule],
  templateUrl: './task-dialog.html',
  styleUrl: './task-dialog.scss',
})
export class TaskDialog {
  private readonly dialogService = inject(DialogService);
  private readonly contactService = inject(ContactService);
  private toastService = inject(ToastService);
 selectedContact = this.contactService.selectedContact;

  isEditMode = computed(() => this.selectedContact() !== null);

  @ViewChild('dialog')
  dialog!: ElementRef<HTMLDialogElement>;

  private isClosing = false;

  ngAfterViewInit(): void {
    this.dialog.nativeElement.showModal();
  }

  ngOnInit(): void {
    const contact = this.selectedContact();

    if (!contact) {
      return;
    }

    // this.newUserForm.patchValue({
    //   name: `${contact.firstname} ${contact.lastname}`,
    //   email: contact.email,
    //   phone: contact.phone?.toString() ?? ''
    // });

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
    if (event.target !== this.dialog.nativeElement) {
      return;
    }

    if (
      event.animationName !== 'dialogOut' &&
      event.animationName !== 'dialogOutMobile'
    ) {
      return;
    }

    const dialog = this.dialog.nativeElement;
    dialog.classList.remove('closing');
    dialog.close();
    this.isClosing = false;
    this.dialogService.clear();
  }

  onRemoveSelectedContact() {
    this.contactService.deleteSelectedContact();
    this.closeDialog();
  }

    addTaskForm = new FormGroup({
      title: new FormControl('', Validators.required),
      description: new FormControl(''),
      dueDate: new FormControl('', [Validators.required, noPastDateValidator()]),
      priority: new FormControl('medium', Validators.required),
      category: new FormControl('', Validators.required),
    });

    async onSubmit(): Promise<void> {
      
    }
  
}

