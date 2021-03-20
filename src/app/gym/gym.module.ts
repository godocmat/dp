import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GymRoutingModule } from './gym-routing.module';
import { GymReservationComponent } from './components/gym-reservation/gym-reservation.component';
import { GymReservationPageComponent } from './pages/gym-reservation-page/gym-reservation-page.component';
import {AccordionModule} from 'primeng/accordion';
import {FlexModule} from '@angular/flex-layout';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import { MyGymReservationsComponent } from './pages/my-gym-reservations/my-gym-reservations.component';
import {TableModule} from 'primeng/table';
import {SharedModule} from '../shared/shared.module';


@NgModule({
  declarations: [GymReservationComponent, GymReservationPageComponent, MyGymReservationsComponent],
  imports: [
    CommonModule,
    GymRoutingModule,
    AccordionModule,
    FlexModule,
    ConfirmDialogModule,
    TableModule,
    SharedModule
  ]
})
export class GymModule { }
