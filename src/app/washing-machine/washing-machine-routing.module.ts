import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {WmReservationPageComponent} from './pages/wm-reservation-page/wm-reservation-page.component';

const routes: Routes = [
  {
    path: '',
    component: WmReservationPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WashingMachineRoutingModule { }
