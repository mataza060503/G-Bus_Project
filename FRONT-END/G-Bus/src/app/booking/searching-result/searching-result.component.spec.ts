import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchingResultComponent } from './searching-result.component';

describe('SearchingResultComponent', () => {
  let component: SearchingResultComponent;
  let fixture: ComponentFixture<SearchingResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchingResultComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SearchingResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
