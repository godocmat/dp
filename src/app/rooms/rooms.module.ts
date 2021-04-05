import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RoomsRoutingModule } from './rooms-routing.module';
import { RoomStepperComponent } from './pages/room-stepper/room-stepper.component';
import {StepsModule} from 'primeng/steps';
import { FloorComponent } from './components/floor/floor.component';
import { RoomComponent } from './components/room/room.component';
import {SharedModule} from '../shared/shared.module';
import {BlockComponent} from './components/block/block.component';
import { RoomReserveComponent } from './components/room-reserve/room-reserve.component';


@NgModule({
  declarations: [RoomStepperComponent, BlockComponent, FloorComponent, RoomComponent, RoomReserveComponent],
  imports: [
    CommonModule,
    RoomsRoutingModule,
    StepsModule,
    SharedModule
  ]
})
export class RoomsModule { }
