import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NameUtil } from './name.util';

describe('NameUtil', () => {
  let component: NameUtil;
  let fixture: ComponentFixture<NameUtil>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NameUtil],
    }).compileComponents();

    fixture = TestBed.createComponent(NameUtil);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
