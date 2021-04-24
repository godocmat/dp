import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminPageComponent } from './pages/admin-page/admin-page.component';
import {SharedModule} from '../shared/shared.module';
import {AdminWmConfirmationComponent} from './components/admin-wm-confirmation/admin-wm-confirmation.component';
import {AdminWmLogsComponent} from './components/admin-wm-logs/admin-wm-logs.component';
import {AdminWmStatusComponent} from './components/admin-wm-status/admin-wm-status.component';
import { AdminGymTableComponent } from './components/admin-gym-table/admin-gym-table.component';
import { AdminUsersTableComponent } from './components/admin-users-table/admin-users-table.component';


@NgModule({
  declarations: [AdminPageComponent, AdminWmConfirmationComponent, AdminWmLogsComponent, AdminWmStatusComponent, AdminGymTableComponent, AdminUsersTableComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule
  ]
})
export class AdminModule { }
