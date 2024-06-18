import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalePopupComponent } from './sale-popup.component';

describe('SalePopupComponent', () => {
  let component: SalePopupComponent;
  let fixture: ComponentFixture<SalePopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SalePopupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SalePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
