import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DateUtil } from './date.util';

describe('DateUtil', () => {
  let component: DateUtil;
  let fixture: ComponentFixture<DateUtil>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DateUtil],
    }).compileComponents();

    fixture = TestBed.createComponent(DateUtil);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
