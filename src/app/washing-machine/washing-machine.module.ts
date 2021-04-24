import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from 'src/app/shared/shared.module';

import { WashingMachineRoutingModule } from './washing-machine-routing.module';
import { WmReservationPageComponent } from './pages/wm-reservation-page/wm-reservation-page.component';

@NgModule({
  declarations: [WmReservationPageComponent],
    imports: [
        CommonModule,
        WashingMachineRoutingModule,
        SharedModule
    ]
})
export class WashingMachineModule { }
