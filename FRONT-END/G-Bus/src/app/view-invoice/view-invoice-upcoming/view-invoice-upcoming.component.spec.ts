import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewInvoiceUpcomingComponent } from './view-invoice-upcoming.component';

describe('ViewInvoiceUpcomingComponent', () => {
  let component: ViewInvoiceUpcomingComponent;
  let fixture: ComponentFixture<ViewInvoiceUpcomingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewInvoiceUpcomingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewInvoiceUpcomingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
