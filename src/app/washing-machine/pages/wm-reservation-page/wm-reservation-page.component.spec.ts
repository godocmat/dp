import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WmReservationPageComponent } from './wm-reservation-page.component';

describe('WmReservationPageComponent', () => {
  let component: WmReservationPageComponent;
  let fixture: ComponentFixture<WmReservationPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WmReservationPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WmReservationPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
