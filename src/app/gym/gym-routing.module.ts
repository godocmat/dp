import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {GymReservationComponent} from './components/gym-reservation/gym-reservation.component';

const routes: Routes = [
  {
    path: '',
    component: GymReservationComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GymRoutingModule { }
