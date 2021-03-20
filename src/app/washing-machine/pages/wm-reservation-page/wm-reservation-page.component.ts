import { Component, OnInit } from '@angular/core';
import {WashingMachineService} from '../../services/washing-machine.service';
import * as moment from 'moment';

@Component({
  selector: 'app-wm-reservation-page',
  templateUrl: './wm-reservation-page.component.html',
  styleUrls: ['./wm-reservation-page.component.scss']
})
export class WmReservationPageComponent implements OnInit {

  constructor(private wmService: WashingMachineService) { }

  ngOnInit(): void {
    this.wmService.getFreeWashingMachines().subscribe(res => {
     res.forEach(r => {
       console.log(r.timeUntil);
       console.log(moment.unix(r.timeUntil).toDate());
      });
    });
  }

}
