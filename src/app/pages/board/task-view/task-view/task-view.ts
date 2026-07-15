import { Component, inject } from '@angular/core';

import { Task } from '../../../../interfaces/task/task';
import { TaskCategory, TaskPriority, TaskStatus } from '../../../../interfaces/task/task.types';
import { TaskService } from '../../../../services/tasks/task.service';

@Component({
  selector: 'app-task-view',
  imports: [],
  templateUrl: './task-view.html',
  styleUrl: './task-view.scss',
})
export class TaskView {
  private taskService = inject(TaskService);

  // Verknüpfung jeder sichtbaren Spalte direkt mit dem passenden Datenbankstatus.
  boardColumns: { title: string; status: TaskStatus }[] = [
    { title: 'To do', status: 'todo' },
    { title: 'In progress', status: 'inProgress' },
    { title: 'Await feedback', status: 'awaitFeedback' },
    { title: 'Done', status: 'done' },
  ];
}
