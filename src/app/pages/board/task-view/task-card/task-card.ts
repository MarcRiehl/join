import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';

import { Task } from '../../../../interfaces/task/task';
import { ContactService } from '../../../../services/contacts/contact.service';
import { DialogService, DialogType } from '../../../../services/dialog/dialog.service';

@Component({
  selector: 'app-task-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task-card.html',
  styleUrl: './task-card.scss',
})
export class TaskCardComponent {
  @Input({ required: true }) task!: Task;
  private contactService = inject(ContactService);

  getContactInitials(contactId: number): string {
    const contact = this.contactService.contacts().find((contact) => contact.id === contactId);
    return contact?.initials ?? '';
  }

  get categoryClass(): string {
    return (this.task.category as any) === 'technical-task' ? 'technicalTask' : 'userStory';
  }

  get categoryDisplayName(): string {
    return (this.task.category as any) === 'technical-task' ? 'Technical Task' : 'User Story';
  }

  get completedSubtasks(): number {
    return this.task.subtasks ? this.task.subtasks.filter((subtask) => subtask.done).length : 0;
  }

  get totalSubtasks(): number {
    return this.task.subtasks ? this.task.subtasks.length : 0;
  }

  get progressPercentage(): number {
    return this.totalSubtasks === 0 ? 0 : (this.completedSubtasks / this.totalSubtasks) * 100;
  }

  get priorityIcon(): string {
    return `/assets/img/components/board/priority-symbol-${this.task.priority}.svg`;
  }

  getAssigneeColor(id: number): string {
    return this.contactService.getBubbleColors(id);
  }

  get displayedAssignees(): number[] {
    return this.task.assignedContactIds ? this.task.assignedContactIds.slice(0, 4) : [];
  }

  get extraAssigneesCount(): number {
    return this.task.assignedContactIds ? Math.max(0, this.task.assignedContactIds.length - 4) : 0;
  }

private dialogService = inject(DialogService);

  openTaskDetails(): void {
    this.dialogService.open(DialogType.TaskDetails, {
      task: this.task,
    });
  }

}