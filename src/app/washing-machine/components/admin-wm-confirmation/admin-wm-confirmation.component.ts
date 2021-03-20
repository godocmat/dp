import { Component, OnInit } from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {WashingMachine} from 'src/app/washing-machine/models/washing-machine';
import {WashingMachineService} from 'src/app/washing-machine/services/washing-machine.service';
import * as moment from 'moment';

@Component({
  selector: 'app-admin-wm-confirmation',
  templateUrl: './admin-wm-confirmation.component.html',
  styleUrls: ['./admin-wm-confirmation.component.scss']
})
export class AdminWmConfirmationComponent implements OnInit {
  wms: WashingMachine[];
  isLoading = true;

  constructor(private wmService: WashingMachineService,
              private toastrService: ToastrService) { }

  ngOnInit(): void {
    this.wmService.getWashingMachinesForAdminConfirmation().subscribe(res => {
      this.wms = res.filter(wm => wm.adminTimeUntil < wm.timeUntil);
      this.isLoading = false;
    });
  }

  confirmReservation(wm: WashingMachine): void {
    wm.adminTimeUntil = wm.timeUntil;
    this.wmService.updateWashingMachine(wm).then(res => this.toastrService.success('Rezervacia potvrdena'));
  }

  unixToDate(unix: number): string {
    return moment.unix(unix).format('DD.MM.YYYY HH:mm:ss');
  }

}
