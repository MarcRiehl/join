import {
  AfterViewInit,
  Component,
  ElementRef,
  ViewChild,
  inject,
  signal
} from '@angular/core';
import { OverlayContainer } from '@angular/cdk/overlay';

import { DialogService, DialogType } from '../../../services/dialog/dialog.service';
import { AddTask } from '../../add-task/add-task';
import { TaskViewDialog } from '../task-view/task-view-dialog/task-view-dialog';
import { TaskService } from '../../../services/tasks/task.service';

@Component({
  selector: 'app-task-dialog',
  standalone: true,
  imports: [
    AddTask,TaskViewDialog
  ],
  templateUrl: './task-dialog.html',
  styleUrl: './task-dialog.scss',
})
export class TaskDialog implements AfterViewInit {
  readonly dialogService = inject(DialogService);
  readonly DialogType = DialogType;
  readonly taskService = inject(TaskService);

  @ViewChild('dialog')
  dialog!: ElementRef<HTMLDialogElement>;

  private readonly overlayContainer = inject(OverlayContainer);

  private observer?: MutationObserver;
  private isClosing = false;

ngAfterViewInit(): void {
  this.dialog.nativeElement.showModal();

  requestAnimationFrame(() => {
    this.moveOverlayIntoDialog();
  });
}

  startCloseAnimation(): void {
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
    this.taskService.clearSelectedTask();
    this.dialogService.clear();
  }

private moveOverlayIntoDialog(): void {
  const container = this.overlayContainer.getContainerElement();

  if (container.parentElement !== this.dialog.nativeElement) {
    this.dialog.nativeElement.appendChild(container);

    this.observer?.disconnect();
    this.observer = undefined;
  }
}

  private moveOverlayBackToBody(): void {
    const container = this.overlayContainer.getContainerElement();

    if (container.parentElement !== document.body) {
      document.body.appendChild(container);
    }
  }
}