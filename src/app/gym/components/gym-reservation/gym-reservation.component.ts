import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {Gym} from '../../models/gym';
import * as moment from 'moment';
import {GymService} from '../../services/gym.service';
import {AuthService} from '../../../auth/services/auth.service';
import {User} from '../../../auth/models/user';
import {Subscription} from 'rxjs';
import {ToastrService} from 'ngx-toastr';
import {ConfirmationService} from 'primeng/api';

@Component({
  selector: 'app-gym-reservation',
  templateUrl: './gym-reservation.component.html',
  styleUrls: ['./gym-reservation.component.scss'],
  providers: [ConfirmationService]
})
export class GymReservationComponent implements OnInit, OnDestroy {

   @Input() gymReservation: Gym;
   reserved = false;
   unavailable = false;
   user: User;
   subs$: Subscription[] = [];

  constructor(private firestore: AngularFirestore,
              private gymService: GymService,
              private authService: AuthService,
              private toastrService: ToastrService,
              private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.reserved = this.gymReservation.status !== 'free';
    this.unavailable = this.gymReservation.date <= moment().unix().toString();
    console.log(this.unavailable)
    this.subs$.push(this.authService.user$.subscribe(user => this.user = user));
  }

  reserve(): void {
    this.confirmationService.confirm({
      message: 'Naozaj chcete rezervovať túto telocvičňu ?',
      acceptLabel: 'Áno',
      rejectLabel: 'Nie',
      accept: () => {
        this.gymReservation.status = 'reserved';
        this.gymReservation.user = this.user;
        this.gymService.updateReservation(this.gymReservation).then(res => {
          this.toastrService.success('Telocvičňa úspešne rezervovaná');
          this.reserved = true;
        }).catch(err => {
          this.toastrService.error('Nepodarilo sa rezervovať telocvičňu');
        });
      }
    });
  }

  ngOnDestroy(): void {
    this.subs$.forEach(sub => sub.unsubscribe());
  }

}
