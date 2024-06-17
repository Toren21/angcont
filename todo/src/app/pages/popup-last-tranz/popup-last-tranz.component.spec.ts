import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupLastTranzComponent } from './popup-last-tranz.component';

describe('PopupLastTranzComponent', () => {
  let component: PopupLastTranzComponent;
  let fixture: ComponentFixture<PopupLastTranzComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PopupLastTranzComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PopupLastTranzComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
