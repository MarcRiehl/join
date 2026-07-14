import { Component, inject } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { TaskService } from '../../services/tasks/task.service';
import { noPastDateValidator, getTodayDateString } from '../../utils/date.util/date.util';
import { AssignedTo } from "./assigned-to/assigned-to";

@Component({
  selector: 'app-add-task',
  imports: [ReactiveFormsModule, AssignedTo],
  templateUrl: './add-task.html',
  styleUrl: './add-task.scss',
})
export class AddTask {
  private taskService = inject(TaskService);
  minDate = getTodayDateString();

  addTaskForm = new FormGroup({
    title: new FormControl('', Validators.required),
    description: new FormControl(''),
    dueDate: new FormControl('', [Validators.required, noPastDateValidator()]),
    priority: new FormControl('medium', Validators.required),
    category: new FormControl('', Validators.required),
  });

  // Method to set the priority value in the form
  setPriority(value: string): void {
    this.addTaskForm.get('priority')?.setValue(value);
  }
  // Method to check if a specific priority is selected
  isPrioritySelected(value: string): boolean {
    return this.addTaskForm.get('priority')?.value === value;
  }
  // Property to track the state of the category dropdown (open or closed)
  isCategoryDropdownOpen = false;
  toggleCategoryDropdown(): void {
    this.isCategoryDropdownOpen = !this.isCategoryDropdownOpen;
  }
  // Method to set the category value in the form
  setCategory(value: string): void {
    this.addTaskForm.get('category')?.setValue(value);
    this.isCategoryDropdownOpen = false;
  }
}
