import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminGymTableComponent } from './admin-gym-table.component';

describe('AdminGymTableComponent', () => {
  let component: AdminGymTableComponent;
  let fixture: ComponentFixture<AdminGymTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminGymTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminGymTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
