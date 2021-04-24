import {Component, OnDestroy, OnInit} from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {Subscription} from 'rxjs';
import {WashingMachine} from 'src/app/washing-machine/models/washing-machine';
import {WashingMachineService} from 'src/app/washing-machine/services/washing-machine.service';
import * as moment from 'moment';

@Component({
  selector: 'app-admin-wm-confirmation',
  templateUrl: './admin-wm-confirmation.component.html',
  styleUrls: ['./admin-wm-confirmation.component.scss']
})
export class AdminWmConfirmationComponent implements OnInit, OnDestroy {
  wms: WashingMachine[];
  isLoading = true;
  subs$: Subscription[] = [];

  constructor(private wmService: WashingMachineService,
              private toastrService: ToastrService) { }

  ngOnInit(): void {
    this.subs$.push(this.wmService.getWashingMachinesForAdminConfirmation().subscribe(res => {
      this.wms = res.filter(wm => wm.adminTimeUntil >= moment().unix());
      this.isLoading = false;
    }));
  }

  updateReservation(wm: WashingMachine, deleteReservation: boolean): void {
    if (deleteReservation) {
      wm.timeUntil = moment().unix() - 1;
    }
    wm.adminTimeUntil = wm.timeUntil;
    this.wmService.updateWashingMachine(wm).then(res => {
      deleteReservation ? this.toastrService.info('Rezervacia odstranena') : this.toastrService.success(`Rezervacia potvrdena`);
      if (!deleteReservation) {
        wm.adminTimeUntil = moment().unix();
        this.wmService.addAdminRecord(wm).then();
      }
    });
  }

  unixToDate(unix: number): string {
    return moment.unix(unix).format('DD.MM.YYYY HH:mm:ss');
  }

  ngOnDestroy(): void {
    this.subs$.forEach(sub => sub.unsubscribe());
  }

}
