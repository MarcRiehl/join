import { Component, inject, Input } from '@angular/core';

import { Task } from '../../../interfaces/task/task';
import { TaskStatus } from '../../../interfaces/task/task.types';
import { TaskService } from '../../../services/tasks/task.service';
import { TaskCardComponent } from './task-card/task-card';

@Component({
  selector: 'app-task-view',
  standalone: true,
  imports: [TaskCardComponent],
  templateUrl: './task-view.html',
  styleUrl: './task-view.scss',
})
export class TaskView {
  @Input({ required: true }) title!: string;
  @Input({ required: true }) status!: TaskStatus;
  @Input() searchTerm = '';
  private taskService = inject(TaskService);

  get tasks(): Task[] {
    const tasks = this.taskService.getTasksByStatus(this.status);

    return tasks.filter((task) => {
      return (
        task.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        task.description.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    });
  }
}
