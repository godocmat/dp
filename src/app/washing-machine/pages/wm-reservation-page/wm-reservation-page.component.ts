import {Component, OnDestroy, OnInit} from '@angular/core';
import {CountdownConfig} from 'ngx-countdown';
import {AnimationOptions} from 'ngx-lottie';
import {ToastrService} from 'ngx-toastr';
import {Subscription} from 'rxjs';
import {switchMap} from 'rxjs/operators';
import {User} from 'src/app/auth/models/user';
import {AuthService} from 'src/app/auth/services/auth.service';
import {WashingMachine} from 'src/app/washing-machine/models/washing-machine';
import {WashingMachineService} from '../../services/washing-machine.service';
import * as moment from 'moment';

@Component({
  selector: 'app-wm-reservation-page',
  templateUrl: './wm-reservation-page.component.html',
  styleUrls: ['./wm-reservation-page.component.scss']
})
export class WmReservationPageComponent implements OnInit, OnDestroy {
  wms: WashingMachine[] = [];
  user: User;
  userWM: WashingMachine;
  isLoading = true;
  countdownConfig: CountdownConfig;
  subs$: Subscription[] = [];
  wmAnim: AnimationOptions = {
    path: 'assets/lottie/wmAnim.json'
  };

  constructor(private wmService: WashingMachineService,
              private toastrService: ToastrService,
              private authService: AuthService) { }

  ngOnInit(): void {
    this.subs$.push(this.wmService.getFreeWashingMachines().subscribe(res => {
      this.wms = res;
    }));

    this.subs$.push(    this.authService.user$.pipe(
      switchMap(user => {
        this.user = user;
        return this.wmService.getWashingMachineByUserId(user.uid);
      })
    ).subscribe(wm => {
      wm = wm.filter(r => r.adminTimeUntil >= moment().unix());
      console.log('daco skorej');
      if (wm.length > 0) {
        console.log('daco');
        this.userWM = wm[0];
        console.log(this.userWM);
        this.countdownConfig = {
          leftTime: this.userWM.adminTimeUntil - moment().unix()
        };
      }
      else {
        this.userWM = null;
      }
      this.isLoading = false;
    }));
  }

  reserve(): void {
    if (this.wms.length > 0) {
       this.wms[0].timeUntil = moment().add('hours', 4).unix();
       this.wms[0].adminTimeUntil = moment().add('minutes', 20).unix();
       this.wms[0].userId = this.user.uid;
       this.wmService.updateWashingMachine(this.wms[0]).then(res => {
         console.log(res);
         this.toastrService.success('Práčka úspešne rezervovaná');
       });
    }
  }

  getTimeFromUnix(unix: any): string {
    return moment.unix(unix).format('HH:mm:ss');
  }

  ngOnDestroy(): void {
    this.subs$.forEach(sub => sub.unsubscribe());
  }


}
