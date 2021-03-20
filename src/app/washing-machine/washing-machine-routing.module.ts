import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AdminWmConfirmationComponent} from "src/app/washing-machine/components/admin-wm-confirmation/admin-wm-confirmation.component";
import {WmReservationPageComponent} from './pages/wm-reservation-page/wm-reservation-page.component';

const routes: Routes = [
  {
    path: '',
    component: WmReservationPageComponent
  },
  {
    path: 'admin-confirmation',
    component: AdminWmConfirmationComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WashingMachineRoutingModule { }
