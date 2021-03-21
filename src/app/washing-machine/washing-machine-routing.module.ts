import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {WmAdminPageComponent} from 'src/app/washing-machine/pages/wm-admin-page/wm-admin-page.component';
import {WmReservationPageComponent} from './pages/wm-reservation-page/wm-reservation-page.component';

const routes: Routes = [
  {
    path: '',
    component: WmReservationPageComponent
  },
  {
    path: 'admin',
    component: WmAdminPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WashingMachineRoutingModule { }
