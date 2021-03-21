import {Component, OnDestroy, OnInit} from '@angular/core';
import * as moment from 'moment';
import {ToastrService} from 'ngx-toastr';
import {Subscription} from 'rxjs';
import {WashingMachine} from 'src/app/washing-machine/models/washing-machine';
import {WashingMachineService} from 'src/app/washing-machine/services/washing-machine.service';

@Component({
  selector: 'app-admin-wm-logs',
  templateUrl: './admin-wm-logs.component.html',
  styleUrls: ['./admin-wm-logs.component.scss']
})
export class AdminWmLogsComponent implements OnInit, OnDestroy {
  wms: WashingMachine[];
  isLoading = true;
  subs$: Subscription[] = [];

  constructor(private wmService: WashingMachineService,
              private toastrService: ToastrService) { }

  ngOnInit(): void {
    this.subs$.push(this.wmService.getAdminRecords(25).subscribe(res => {
      this.wms = res;
      this.isLoading = false;
    }));

  }

  unixToDate(unix: number): string {
    return moment.unix(unix).format('DD.MM.YYYY HH:mm:ss');
  }

  ngOnDestroy(): void {
    this.subs$.forEach(sub => sub.unsubscribe());
  }

}
