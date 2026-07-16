import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { TaskStatus } from '../../interfaces/task/task.types';
import { ContactService } from '../../services/contacts/contact.service';
import { TaskService } from '../../services/tasks/task.service';
import { TaskView } from './task-view/task-view';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [TaskView, FormsModule],
  templateUrl: './board.html',
  styleUrl: './board.scss',
})
export class BoardComponent implements OnInit {
  taskService = inject(TaskService);
  private contactService = inject(ContactService);
  searchTerm = '';

  boardColumns: { title: string; status: TaskStatus }[] = [
    { title: 'To do', status: 'todo' },
    { title: 'In progress', status: 'inProgress' },
    { title: 'Await feedback', status: 'awaitFeedback' },
    { title: 'Done', status: 'done' },
  ];

  ngOnInit(): void {
    this.taskService.loadTasks();
    this.contactService.loadContacts();
    this.taskService.subscribeToTaskChanges();
  }
}
