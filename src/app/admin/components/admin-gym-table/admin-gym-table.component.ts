import {Component, OnDestroy, OnInit} from '@angular/core';
import {GymService} from '../../../gym/services/gym.service';
import {Gym} from '../../../gym/models/gym';
import {ToastrService} from 'ngx-toastr';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-admin-gym-table',
  templateUrl: './admin-gym-table.component.html',
  styleUrls: ['./admin-gym-table.component.scss']
})
export class AdminGymTableComponent implements OnInit, OnDestroy {
  isLoading = true;
  gyms = [];
  sub$: Subscription;
  constructor(private gymService: GymService,
              private toastr: ToastrService) { }

  ngOnInit(): void {
    this.sub$ = this.gymService.getReservationsForTwoWeeks().subscribe(gyms => {
      this.gyms = gyms;
      this.isLoading = false;
    });
  }

  deleteUserReservation(gym: Gym): void {
    gym.user = '';
    gym.status = 'free';
    this.gymService.updateReservation(gym).then(r => this.toastr.success('Rezervácia odstránená'));
  }

  reserve(gym): void {
    gym.user = 'ADMIN';
    gym.status = 'reserved';
    this.gymService.updateReservation(gym).then(r => this.toastr.success('Úspešne rezervované'));
  }

  ngOnDestroy(): void {
    this.sub$.unsubscribe();
  }

}
