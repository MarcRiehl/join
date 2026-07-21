import { Component } from '@angular/core';
import { TaskCategory } from '../../interfaces/task/task.types';

@Component({
  selector: 'app-task.util',
  imports: [],
  templateUrl: './task.util.html',
  styleUrl: './task.util.scss',
})
export class TaskUtil {
}

export function getCategoryClass(category: TaskCategory | string): string {
  return category === 'technical-task'
    ? 'technicalTask'
    : 'userStory';
}

export function getCategoryDisplayName(category: TaskCategory | string): string {
  return category === 'technical-task'
    ? 'Technical Task'
    : 'User Story';
}