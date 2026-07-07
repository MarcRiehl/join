import { Injectable, signal } from '@angular/core';

export enum DialogType {
  AddContact = 'add-contact',
  EditContact = 'edit-contact',
  DeleteContact = 'delete-contact',
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

  open(type: DialogType, data?: unknown): void {
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