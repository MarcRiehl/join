import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Subtasks } from './subtasks';

describe('Subtasks', () => {
  let component: Subtasks;
  let fixture: ComponentFixture<Subtasks>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Subtasks],
    }).compileComponents();

    fixture = TestBed.createComponent(Subtasks);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
