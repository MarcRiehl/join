import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogHost } from './dialog-host';

describe('DialogHost', () => {
  let component: DialogHost;
  let fixture: ComponentFixture<DialogHost>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogHost],
    }).compileComponents();

    fixture = TestBed.createComponent(DialogHost);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
