import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewInvoiceCompleteComponent } from './view-invoice-complete.component';

describe('ViewInvoiceCompleteComponent', () => {
  let component: ViewInvoiceCompleteComponent;
  let fixture: ComponentFixture<ViewInvoiceCompleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewInvoiceCompleteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewInvoiceCompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
