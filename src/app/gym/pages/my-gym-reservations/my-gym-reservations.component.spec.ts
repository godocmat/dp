import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyGymReservationsComponent } from './my-gym-reservations.component';

describe('MyGymReservationsComponent', () => {
  let component: MyGymReservationsComponent;
  let fixture: ComponentFixture<MyGymReservationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyGymReservationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyGymReservationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
