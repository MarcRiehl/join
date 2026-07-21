import { Component, EventEmitter, Output, inject } from '@angular/core';
import { DialogService, DialogType } from '../../../../services/dialog/dialog.service';
import { ContactService } from '../../../../services/contacts/contact.service';
import { Task } from '../../../../interfaces/task/task';
import { TaskService } from '../../../../services/tasks/task.service';
import { CommonModule } from '@angular/common';
import {
  getCategoryClass,
  getCategoryDisplayName,
} from '../../../../utils/task.util/task.util';
import { UserBubble } from '../../../../components/user-bubble/user-bubble';


@Component({
  selector: 'app-task-view-dialog',
  imports: [CommonModule, UserBubble],
  templateUrl: './task-view-dialog.html',
  styleUrl: './task-view-dialog.scss',
})

export class TaskViewDialog {
  @Output() close = new EventEmitter<void>();
  readonly taskService = inject(TaskService);
  readonly task = this.taskService.selectedTask;
  readonly contactService = inject(ContactService);


  get categoryClass(): string {
    const task = this.task();
    return task ? getCategoryClass(task.category as any) : '';
  }

  get categoryDisplayName(): string {
    const task = this.task();
    return task ? getCategoryDisplayName(task.category as any) : '';
  }

  get priorityIcon(): string {
    const task = this.task();
    return task
      ? `/assets/img/components/board/priority-symbol-${task.priority}.svg`
      : '';
  }

  get completedSubtasks(): number {
    const task = this.task();
    return task?.subtasks?.filter(subtask => subtask.done).length ?? 0;
  }

  get totalSubtasks(): number {
    return this.task()?.subtasks?.length ?? 0;
  }

  closeDialog(): void {
    this.close.emit();
  }

  getContact(contactId: number) {
    return this.contactService
      .contacts()
      .find(contact => contact.id === contactId);
  }

  toggleSubtask(index: number): void {
    const task = this.task();

    if (!task) {
      return;
    }

    this.taskService.toggleSubtask(task, index);
  }

async deleteTask(): Promise<void> {
  const task = this.task();

  if (!task) {
    return;
  }

  try {
    await this.taskService.deleteTask(task.id);

    this.close.emit();
  } catch (error) {
    console.error('Task could not be deleted:', error);
  }
}

  readonly dialogService = inject(DialogService);
  readonly DialogType = DialogType;

editTask(): void {
  this.dialogService.open(DialogType.EditTask);
}

}