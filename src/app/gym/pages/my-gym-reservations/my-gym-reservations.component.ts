import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {AuthService} from '../../../auth/services/auth.service';
import {switchMap} from 'rxjs/operators';
import {GymService} from '../../services/gym.service';
import {Gym} from '../../models/gym';
import * as moment from 'moment';
import {ToastrService} from 'ngx-toastr';
import {ConfirmationService} from 'primeng/api';

@Component({
  selector: 'app-my-gym-reservations',
  templateUrl: './my-gym-reservations.component.html',
  styleUrls: ['./my-gym-reservations.component.scss'],
  providers: [ConfirmationService]
})
export class MyGymReservationsComponent implements OnInit, OnDestroy {
  subs$: Subscription[] = [];
  reservations: Gym[] = [];

  constructor(private authService: AuthService,
              private gymService: GymService,
              private toastrService: ToastrService,
              private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.subs$.push(this.authService.user$.pipe(
      switchMap(user => {
        return this.gymService.getUserReservations(user);
      })
    ).subscribe((res) => {
      this.reservations = res;
    }));
  }

  deleteReservation(reservation): void {
    this.confirmationService.confirm({
      message: 'Naozaj chcete zrušiť rezerváciu ?',
      acceptLabel: 'Áno',
      rejectLabel: 'Nie',
      accept: () => {
        reservation.status = 'free';
        reservation.user = '';
        this.gymService.updateReservation(reservation).then(res => {
          // TODO: otestovat ci sa data updatuju same
         // this.reservations = this.reservations.filter(r => r.uid !== reservation.uid);
          this.toastrService.success('Rezervácia úspešne odstránená');
        }).catch(err => this.toastrService.error(err));
      }
    });
  }

  ngOnDestroy(): void {
    this.subs$.forEach(sub => sub.unsubscribe());
  }

}
