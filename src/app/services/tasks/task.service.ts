import { inject, Injectable, OnInit, signal } from '@angular/core';
import { RealtimeChannel } from '@supabase/supabase-js';

import { Task } from '../../interfaces/task/task';
import { TaskPriority, TaskStatus } from '../../interfaces/task/task.types';
import { SupabaseService } from '../supabase/supabase.service';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private supabase = inject(SupabaseService);
  private taskChannel: RealtimeChannel | undefined;
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

  async deleteTask(taskId: number): Promise<void> {
    const { error } = await this.supabase.supabase.from('tasks').delete().eq('id', taskId);
    if (error) {
      throw error;
    }
    await this.loadTasks();
  }

  subscribeToTaskChanges() {
    this.taskChannel = this.supabase.supabase
      .channel('task-changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'tasks' },

        async () => {
          await this.loadTasks();
        },
      )
      .subscribe();
  }

  async unsubscribeFromTaskChanges(): Promise<void> {
    if (this.taskChannel) {
      await this.supabase.supabase.removeChannel(this.taskChannel);
      this.taskChannel = undefined;
    }
  }

  // hier wird lediglich der Status gespeichert
  async updateTaskStatus(taskId: number, status: TaskStatus): Promise<void> {
    const { error } = await this.supabase.supabase
      .from('tasks')
      .update({
        status: status,
      })
      .eq('id', taskId);
    if (error) {
      throw error;
    }
    await this.loadTasks();
  }

  getTasksByStatus(status: TaskStatus): Task[] {
    return this.tasks().filter((task) => {
      return task.status === status;
    });
  }
}
