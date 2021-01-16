import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GymReservationPageComponent } from './gym-reservation-page.component';

describe('GymReservationPageComponent', () => {
  let component: GymReservationPageComponent;
  let fixture: ComponentFixture<GymReservationPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GymReservationPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GymReservationPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
