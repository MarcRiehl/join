import { Component, inject } from '@angular/core';
import { DialogService } from '../../../../services/dialog/dialog.service';
import { Task } from '../../../../interfaces/task/task';

@Component({
  selector: 'app-task-view-dialog',
  imports: [],
  templateUrl: './task-view-dialog.html',
  styleUrl: './task-view-dialog.scss',
})
export class TaskViewDialog {

  readonly dialogService = inject(DialogService);

  get task(): Task {
    return (this.dialogService.current().data as { task: Task }).task;
  }
}
