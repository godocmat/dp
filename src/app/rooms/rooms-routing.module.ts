import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {RoomStepperComponent} from './pages/room-stepper/room-stepper.component';
import {BlockComponent} from './components/block/block.component';
import {FloorComponent} from './components/floor/floor.component';
import {RoomComponent} from './components/room/room.component';
import {RoomReserveComponent} from "./components/room-reserve/room-reserve.component";

const routes: Routes = [
  {
    path: '',
    component: RoomStepperComponent,
    children: [
      {
        path: '',
        redirectTo: 'block',
        pathMatch: 'full'
      },
      {
        path: 'block',
        component: BlockComponent
      },
      {
        path: 'floor',
        component: FloorComponent
      },
      {
        path: 'room',
        component: RoomComponent
      },
      {
        path: 'room_reserve',
        component: RoomReserveComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoomsRoutingModule { }
