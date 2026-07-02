import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestLayout } from './test-layout';

describe('TestLayout', () => {
  let component: TestLayout;
  let fixture: ComponentFixture<TestLayout>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestLayout],
    }).compileComponents();

    fixture = TestBed.createComponent(TestLayout);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
