import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserBubble } from './user-bubble';

describe('UserBubble', () => {
  let component: UserBubble;
  let fixture: ComponentFixture<UserBubble>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserBubble],
    }).compileComponents();

    fixture = TestBed.createComponent(UserBubble);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
