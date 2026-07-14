import { inject, Injectable, OnInit, signal } from '@angular/core';

import { Task } from '../../interfaces/task/task';
import { SupabaseService } from '../supabase/supabase.service';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private supabase = inject(SupabaseService);

  tasks = signal<Task[]>([]);

  async loadTasks(): Promise<Task[]> {
    const { data, error } = await this.supabase.supabase.from('tasks').select('*');
    console.log('Raw data:', data);
    console.log('Supabase error:', error);

    if (!error && data) {
      const mappedTasks: Task[] = data.map((task: any) => ({
        id: task.id,
        title: task.title,
        description: task.description,
        dueDate: task.due_date,
        priority: task.priority,
        category: task.category,
        status: task.status,
        assignedContactIds: task.assigned_contact_ids,
        subtasks: task.subtasks,
        createdAt: task.created_at,
      }));

      this.tasks.set(mappedTasks);
      return mappedTasks;
    }
    return [];
  }

  async createTask(task: Omit<Task, 'id' | 'createdAt'>): Promise<void> {
    const { data, error } = await this.supabase.supabase.from('tasks').insert([
      {
        title: task.title,
        description: task.description,
        due_date: task.dueDate,
        priority: task.priority,
        category: task.category,
        status: task.status,
        assigned_contact_ids: task.assignedContactIds,
        subtasks: task.subtasks,
      },
    ]);
    if (!error) {
      await this.loadTasks();
    }
  }
  //  Methode aufrufen:
  // im Formular -> onSubmit() -> this.taskService.createTask(task);
  // in der task-Komponente:
  //  async onSubmit(): Promise<void> {
  //      const task = {
  //    Formulardaten zusammensetzen
  //      };
  //    await this.taskService.createTask(task);
  //    }
  // Auf button setzen:
  // <button type="button" (click)="createTask()">Create Task</button>

  async updateTask(task: Task): Promise<void> {
    const { error } = await this.supabase.supabase
      .from('tasks')
      .update({
        title: task.title,
        description: task.description,
        due_date: task.dueDate,
        priority: task.priority,
        category: task.category,
        status: task.status,
        assigned_contact_ids: task.assignedContactIds,
        subtasks: task.subtasks,
      })
      .eq('id', task.id);

    if (error) {
      throw error;
    }
    await this.loadTasks();
  }

  // ----------------------------
  // TASKS
  // ----------------------------
  // Alle Tasks laden (check)
  // Einen Task nach ID laden
  // Neuen Task erstellen (check)
  // Task bearbeiten (check)
  // Task löschen
  // Taskstatus ändern
  // (To Do -> Done)
  // Kategorie ändern
  // Priorität ändern
  // Zugewiesene Kontakte ändern
  // Subtasks aktualisieren
  // Tasks filtern
  // Tasks suchen
  // Tasks sortieren
}
