import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../../services/tasks/task.service';
import { TaskStatus } from '../../interfaces/task/task.types';
import { TaskView } from './task-view/task-view';
import { DialogService, DialogType } from '../../services/dialog/dialog.service';
import { ContactService } from '../../services/contacts/contact.service';
import { Router } from '@angular/router';
import { TaskDialog } from './task-dialog/task-dialog';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [TaskView, FormsModule, TaskDialog],
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

  readonly contactService = inject(ContactService);
  readonly dialogService = inject(DialogService);
  readonly DialogType = DialogType;
  private router = inject(Router);

  openDialog(): void {
    const isDesktop = window.matchMedia('(min-width: 569px)').matches;

    if (isDesktop) {
      this.dialogService.open(DialogType.AddTask);
    } else {
      this.router.navigate(['/add-task']);
    }
  }
}
