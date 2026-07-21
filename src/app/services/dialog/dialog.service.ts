import { Injectable, signal } from '@angular/core';

export enum DialogType {
  Contact = 'contact',
  AddTask = 'add-task',
  EditTask = 'edit-task'
}

export interface DialogState<T = unknown> {
  type: DialogType | null;
  data?: T;
}

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  readonly current = signal<DialogState>({
    type: null
  });

open<T>(type: DialogType, data?: T): void {
  this.current.set({
    type,
    data
  });
}

  clear(): void {
    this.current.set({
      type: null
    });
  }
}