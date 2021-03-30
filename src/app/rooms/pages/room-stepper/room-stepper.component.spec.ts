import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomStepperComponent } from './room-stepper.component';

describe('RoomStepperComponent', () => {
  let component: RoomStepperComponent;
  let fixture: ComponentFixture<RoomStepperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoomStepperComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomStepperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
