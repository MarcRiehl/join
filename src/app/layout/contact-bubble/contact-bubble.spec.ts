import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactBubble } from './contact-bubble';

describe('ContactBubble', () => {
  let component: ContactBubble;
  let fixture: ComponentFixture<ContactBubble>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactBubble],
    }).compileComponents();

    fixture = TestBed.createComponent(ContactBubble);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
