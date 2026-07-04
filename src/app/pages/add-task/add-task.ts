import { Component, inject } from '@angular/core';

import { TaskService } from '../../services/tasks/task.service';

@Component({
  selector: 'app-add-task',
  imports: [],
  templateUrl: './add-task.html',
  styleUrl: './add-task.scss',
})
export class AddTask {
  private taskService = inject(TaskService);
}
