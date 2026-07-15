import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../../services/tasks/task.service';
import { TaskStatus } from '../../interfaces/task/task.types';
import { TaskView } from './task-view/task-view';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [TaskView, FormsModule],
  templateUrl: './board.html',
  styleUrl: './board.scss'
})
export class BoardComponent implements OnInit {
  taskService = inject(TaskService);
  searchTerm = '';

  boardColumns: { title: string; status: TaskStatus }[] = [
    { title: 'To do', status: 'todo' },
    { title: 'In progress', status: 'inProgress' },
    { title: 'Await feedback', status: 'awaitFeedback' },
    { title: 'Done', status: 'done' },
  ];

  async ngOnInit() {
    await this.taskService.loadTasks();
    this.taskService.subscribeToTaskChanges();
  }
}