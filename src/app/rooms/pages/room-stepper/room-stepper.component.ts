import { Component, OnInit } from '@angular/core';
import {MenuItem} from 'primeng/api';

@Component({
  selector: 'app-room-stepper',
  templateUrl: './room-stepper.component.html',
  styleUrls: ['./room-stepper.component.scss']
})
export class RoomStepperComponent implements OnInit {
  items: MenuItem[];

  constructor() { }

  ngOnInit(): void {
    this.items = [
      {
        label: 'Blok',
        routerLink: 'block'
      },
      {
        label: 'Poschodie',
        routerLink: 'floor'
      },
      {
        label: 'Izba',
        routerLink: 'room'
      }
    ];
  }

}
