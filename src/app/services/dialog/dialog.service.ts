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

  readonly closing = signal(false);

  open(type: DialogType, data?: unknown) {
    this.current.set({ type, data });
    this.closing.set(false);
  }

  requestClose() {
    this.closing.set(true);
  }

  finishClose() {
    this.current.set({
      type: null
    });

    this.closing.set(false);
  }

}