import { Component, inject, OnInit } from '@angular/core';

import { TaskService } from '../../services/tasks/task.service';

@Component({
  selector: 'app-add-task',
  imports: [],
  templateUrl: './add-task.html',
  styleUrl: './add-task.scss',
})
export class AddTask implements OnInit {
  public taskService = inject(TaskService);

  ngOnInit(): void {
    this.taskService.loadTasks();
  }
}
