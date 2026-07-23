import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskUtil } from './task.util';

describe('TaskUtil', () => {
  let component: TaskUtil;
  let fixture: ComponentFixture<TaskUtil>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskUtil],
    }).compileComponents();

    fixture = TestBed.createComponent(TaskUtil);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
