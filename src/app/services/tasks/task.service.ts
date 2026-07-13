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

  // ----------------------------
  // TASKS
  // ----------------------------
  // Alle Tasks laden (check)
  // Einen Task nach ID laden
  // Neuen Task erstellen
  // Task bearbeiten
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
