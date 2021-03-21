import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from "src/app/shared/shared.module";

import { WashingMachineRoutingModule } from './washing-machine-routing.module';
import { WmReservationPageComponent } from './pages/wm-reservation-page/wm-reservation-page.component';
import { AdminWmConfirmationComponent } from './components/admin-wm-confirmation/admin-wm-confirmation.component';
import { WmAdminPageComponent } from './pages/wm-admin-page/wm-admin-page.component';
import { AdminWmLogsComponent } from './components/admin-wm-logs/admin-wm-logs.component';
import { AdminWmStatusComponent } from './components/admin-wm-status/admin-wm-status.component';


@NgModule({
  declarations: [WmReservationPageComponent, AdminWmConfirmationComponent, WmAdminPageComponent, AdminWmLogsComponent, AdminWmStatusComponent],
    imports: [
        CommonModule,
        WashingMachineRoutingModule,
        SharedModule
    ]
})
export class WashingMachineModule { }
