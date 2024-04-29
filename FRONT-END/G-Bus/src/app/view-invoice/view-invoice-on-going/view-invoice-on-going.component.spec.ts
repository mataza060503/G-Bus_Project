import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewInvoiceOnGoingComponent } from './view-invoice-on-going.component';

describe('ViewInvoiceOnGoingComponent', () => {
  let component: ViewInvoiceOnGoingComponent;
  let fixture: ComponentFixture<ViewInvoiceOnGoingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewInvoiceOnGoingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewInvoiceOnGoingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
