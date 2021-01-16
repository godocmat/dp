import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {GymReservationPageComponent} from './pages/gym-reservation-page/gym-reservation-page.component';
import {MyGymReservationsComponent} from './pages/my-gym-reservations/my-gym-reservations.component';

const routes: Routes = [
  {
    path: '',
    component: GymReservationPageComponent
  },
  {
    path: 'my_reservations',
    component: MyGymReservationsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GymRoutingModule { }
