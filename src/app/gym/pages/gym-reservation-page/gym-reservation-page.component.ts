import {Component, OnDestroy, OnInit} from '@angular/core';
import {Gym} from '../../models/gym';
import {AngularFirestore} from '@angular/fire/firestore';
import {GymService} from '../../services/gym.service';
import * as moment from 'moment';
import {Subscription} from 'rxjs';
import {log} from 'util';

@Component({
  selector: 'app-gym-reservation-page',
  templateUrl: './gym-reservation-page.component.html',
  styleUrls: ['./gym-reservation-page.component.scss']
})
export class GymReservationPageComponent implements OnInit, OnDestroy {

  subs$: Subscription[] = [];
  gymReservations: Gym[] = [];
  firstSunday;
  firstTuesday;
  firstThursday;
  secondSunday;
  secondTuesday;
  secondThursday;
  constructor(private firestore: AngularFirestore,
              private gymService: GymService) { }

  ngOnInit(): void {
    this.subs$.push(this.gymService.getReservationsForTwoWeeks().subscribe(res => {
      this.gymReservations = res;
    }));
    this.firstSunday = moment().day(0).format('DD MMM YYYY');
    this.firstTuesday = moment().day(2).format('DD MMM YYYY');
    this.firstThursday = moment().day(4).format('DD MMM YYYY');
    this.secondSunday = moment().day(7).format('DD MMM YYYY');
    this.secondTuesday = moment().day(9).format('DD MMM YYYY');
    this.secondThursday = moment().day(11).format('DD MMM YYYY');

    // for (let i = 19; i < 23; i++) {
    //   let obj = {
    //     date: moment().day(0).unix() + i,
    //     gymNumber: 1,
    //     status: 'free',
    //     timeFrom: i,
    //     timeUntil: i + 1
    //   };
    //   this.gymService.addReservation(obj).then(r => {
    //     console.log('r', r);
    //     console.log('pridana');
    //     console.log(obj)
    //   });
    // }
  }


  ngOnDestroy(): void {
    this.subs$.forEach(sub => sub.unsubscribe());
  }
}
