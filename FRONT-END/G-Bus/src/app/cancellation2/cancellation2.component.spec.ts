import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Cancellation2Component } from './cancellation2.component';

describe('Cancellation2Component', () => {
  let component: Cancellation2Component;
  let fixture: ComponentFixture<Cancellation2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Cancellation2Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Cancellation2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
