import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import * as moment from 'moment';
import {map} from 'rxjs/operators';
import {Gym} from '../models/gym';

@Injectable({
  providedIn: 'root'
})
export class GymService {

  constructor(private firestore: AngularFirestore) { }

  getReservationsForTwoWeeks() {
    return this.firestore.collection('gym_reservations', ref => {
      return ref.where('date', '<', moment().day(13).unix());
    }).get()
      .pipe(
        map((requests) => {
          return requests.docs.map((snap) => {
            return {
              uid: snap.id,
              ...snap.data()
            } as Gym;
          });
        })
      );
  }
}
