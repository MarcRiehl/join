import { Component, inject, ElementRef, HostListener } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TaskService } from '../../services/tasks/task.service';
import { noPastDateValidator, getTodayDateString } from '../../utils/date.util/date.util';
import { AssignedTo } from './assigned-to/assigned-to';
import { Contact } from '../../interfaces/contacts/contact';
import { TaskPriority, TaskCategory, TaskStatus } from '../../interfaces/task/task.types';

@Component({
  selector: 'app-add-task',
  imports: [ReactiveFormsModule, AssignedTo],
  templateUrl: './add-task.html',
  styleUrl: './add-task.scss',
})
export class AddTask {
  private taskService = inject(TaskService);
  private router = inject(Router);
  minDate = getTodayDateString();
  private elementRef = inject(ElementRef);
  isSaving = false;

  addTaskForm = new FormGroup({
    title: new FormControl('', Validators.required),
    description: new FormControl(''),
    dueDate: new FormControl('', [Validators.required, noPastDateValidator()]),
    priority: new FormControl('medium', Validators.required),
    category: new FormControl('', Validators.required),
    assignedContactIds: new FormControl<number[]>([]),
  });

  get dueDateControl() {
    return this.addTaskForm.get('dueDate');
  }

  // Method to set the priority value in the form
  setPriority(value: string): void {
    this.addTaskForm.get('priority')?.setValue(value);
  }
  // Method to check if a specific priority is selected
  isPrioritySelected(value: string): boolean {
    return this.addTaskForm.get('priority')?.value === value;
  }

  selectedContacts: Contact[] = [];

  // Method to store the contacts selected in the AssignedTo dropdown
  onAssignedContactsChange(contacts: Contact[]): void {
    this.selectedContacts = contacts;
  }

  // Validates the form, saves the task via TaskService, and redirects to the Board page on success
  async onSubmit(): Promise<void> {
    this.addTaskForm.markAllAsTouched();
    if (this.addTaskForm.invalid) return;
    this.isSaving = true;
    try {
      await this.taskService.createTask(this.buildTaskObject());
      this.router.navigate(['/board']);
    } finally {
      this.isSaving = false;
    }
  }

  // Resets the form to its default state (priority back to medium)
  onClear(): void {
    this.addTaskForm.reset();
    this.addTaskForm.get('priority')?.setValue('medium');
  }

  private buildTaskObject() {
    const { title, description, dueDate, priority, category } = this.addTaskForm.value;
    return {
      title: title!,
      description: description!,
      dueDate: dueDate!,
      priority: priority as TaskPriority,
      category: category as TaskCategory,
      status: 'to-do' as TaskStatus,
      assignedContactIds: this.selectedContacts.map((c) => c.id!),
      subtasks: [],
    };
  }

  categories = [
    { label: 'Technical Task', value: 'technical-task' },
    { label: 'User Story', value: 'user-story' },
  ];

  setCategory(value: string): void {
    this.addTaskForm.get('category')?.setValue(value);
    this.isCategoryDropdownOpen = false;
  }
  // Property to track the state of the category dropdown (open or closed)
  isCategoryDropdownOpen = false;
  toggleCategoryDropdown(): void {
    this.isCategoryDropdownOpen = !this.isCategoryDropdownOpen;
  }

  getCategoryLabel(): string {
    const value = this.addTaskForm.get('category')?.value;
    return this.categories.find((c) => c.value === value)?.label ?? '';
  }
  // Closes the category dropdown when clicking outside of it
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    const clickedInside = this.elementRef.nativeElement.contains(event.target);
    if (!clickedInside && this.isCategoryDropdownOpen) {
      this.isCategoryDropdownOpen = false;
    }
  }

  setAssignedContactIds(ids: number[]): void {
    this.addTaskForm.get('assignedContactIds')?.setValue(ids);
  }
}
