import {Component, OnDestroy, OnInit} from '@angular/core';
import * as moment from "moment";
import {ToastrService} from "ngx-toastr";
import {Subscription} from "rxjs";
import {WashingMachine} from "src/app/washing-machine/models/washing-machine";
import {WashingMachineService} from "src/app/washing-machine/services/washing-machine.service";

@Component({
  selector: 'app-admin-wm-status',
  templateUrl: './admin-wm-status.component.html',
  styleUrls: ['./admin-wm-status.component.scss']
})
export class AdminWmStatusComponent implements OnInit, OnDestroy {
  wms: WashingMachine[];
  isLoading = true;
  subs$: Subscription[] = [];

  constructor(private wmService: WashingMachineService,
              private toastrService: ToastrService) { }

  ngOnInit(): void {
    this.subs$.push(this.wmService.getAllWashingMachines().subscribe(res => {
      this.wms = res.sort((a, b) => +a.uid - +b.uid);
      this.isLoading = false;
    }));

  }

  setStatus(wm: WashingMachine, status: 'active' | 'inactive'): void {
    wm.status = status;
    this.wmService.updateWashingMachine(wm).then();
  }

  ngOnDestroy(): void {
    this.subs$.forEach(sub => sub.unsubscribe());
  }

}
