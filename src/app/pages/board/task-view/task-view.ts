import { Component, Input, inject } from '@angular/core';
import { CdkDragDrop, CdkDropList, CdkDrag } from '@angular/cdk/drag-drop';
import { Task } from '../../../interfaces/task/task';
import { TaskStatus } from '../../../interfaces/task/task.types';
import { TaskService } from '../../../services/tasks/task.service';
import { TaskCardComponent } from './task-card/task-card';

@Component({
  selector: 'app-task-view',
  standalone: true,
  imports: [TaskCardComponent, CdkDropList, CdkDrag],
  templateUrl: './task-view.html',
  styleUrl: './task-view.scss',
})
export class TaskView {
  @Input({ required: true }) title!: string;
  @Input({ required: true }) status!: TaskStatus;
  private taskService = inject(TaskService);

  get tasks(): Task[] {
    return this.taskService.getTasksByStatus(this.status);
  }

  drop(event: CdkDragDrop<Task[]>) {
    if (event.previousContainer !== event.container) {
      const task = event.item.data as Task;
      this.taskService.updateTaskStatus(task.id, this.status);
    }
  }
}