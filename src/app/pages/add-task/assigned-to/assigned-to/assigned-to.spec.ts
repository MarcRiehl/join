import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignedTo } from './assigned-to';

describe('AssignedTo', () => {
  let component: AssignedTo;
  let fixture: ComponentFixture<AssignedTo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssignedTo],
    }).compileComponents();

    fixture = TestBed.createComponent(AssignedTo);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
