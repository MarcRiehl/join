import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Task } from '../../../../interfaces/task/task';

@Component({
  selector: 'app-task-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task-card.html',
  styleUrl: './task-card.scss'
})
export class TaskCardComponent {
  @Input({ required: true }) task!: Task;

  get categoryClass(): string {
    return (this.task.category as any) === 'technical-task' ? 'technicalTask' : 'userStory';
  }

  get categoryDisplayName(): string {
    return (this.task.category as any) === 'technical-task' ? 'Technical Task' : 'User Story';
  }

  // get completedSubtasks(): number {
  //   return this.task.subtasks ? this.task.subtasks.filter(st => st.completed).length : 0;
  // }

  get totalSubtasks(): number {
    return this.task.subtasks ? this.task.subtasks.length : 0;
  }

  // get progressPercentage(): number {
  //   return this.totalSubtasks === 0 ? 0 : (this.completedSubtasks / this.totalSubtasks) * 100;
  // }

  get priorityIcon(): string {
    return `/assets/img/components/board/priority-symbol-${this.task.priority}.svg`;
  }
}