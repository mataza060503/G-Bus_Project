import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Rating5Component } from './rating5.component';

describe('Rating5Component', () => {
  let component: Rating5Component;
  let fixture: ComponentFixture<Rating5Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Rating5Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Rating5Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
