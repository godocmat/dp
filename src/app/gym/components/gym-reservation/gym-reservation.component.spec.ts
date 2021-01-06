import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GymReservationComponent } from './gym-reservation.component';

describe('GymReservationComponent', () => {
  let component: GymReservationComponent;
  let fixture: ComponentFixture<GymReservationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GymReservationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GymReservationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
