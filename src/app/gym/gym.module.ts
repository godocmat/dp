import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GymRoutingModule } from './gym-routing.module';
import { GymReservationComponent } from './components/gym-reservation/gym-reservation.component';


@NgModule({
  declarations: [GymReservationComponent],
  imports: [
    CommonModule,
    GymRoutingModule
  ]
})
export class GymModule { }
