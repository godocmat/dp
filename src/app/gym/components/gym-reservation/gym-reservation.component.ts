import { Component, OnInit } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {Gym} from '../../models/gym';
import * as moment from 'moment';
import {GymService} from '../../services/gym.service';

@Component({
  selector: 'app-gym-reservation',
  templateUrl: './gym-reservation.component.html',
  styleUrls: ['./gym-reservation.component.scss']
})
export class GymReservationComponent implements OnInit {
  gymReservations: Gym[] = [];
  constructor(private firestore: AngularFirestore,
              private gymService: GymService) { }

  ngOnInit(): void {
    this.gymService.getReservationsForTwoWeeks().subscribe(res => {
      this.gymReservations = res;
      console.log(this.gymReservations);
    });
  }

}
