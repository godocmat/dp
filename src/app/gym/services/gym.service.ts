import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import * as moment from 'moment';
import {map} from 'rxjs/operators';
import {Gym} from '../models/gym';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GymService {

  constructor(private firestore: AngularFirestore) { }

  getReservationsForTwoWeeks(): Observable<Gym[]> {
    return this.firestore.collection('gym_reservations', ref => {
      return ref.where('date', '<', moment().day(13).unix())
        .where('date', '>', moment().day(0).unix()).orderBy('date', 'asc');
    }).get()
      .pipe(
        map((requests) => {
          return requests.docs.map((snap) => {
            return {
              uid: snap.id,
              ...snap.data() as Gym
            } as Gym;
          });
        })
      );
  }

  getUserReservations(user): Observable<Gym[]> {
    return this.firestore.collection('gym_reservations', ref => {
      return ref.where('user', '==', user);
    }).get()
      .pipe(
        map((requests) => {
          return requests.docs.map((snap) => {
            return {
              uid: snap.id,
              ...snap.data() as Gym
            } as Gym;
          });
        })
      );
  }

  deleteReservation(reservation: Gym): Promise<void> {
    return this.firestore.doc('gym_reservations/' + reservation.uid).set(reservation, {merge: true});
  }

  updateReservation(reservation: Gym): Promise<void> {
    return this.firestore.doc('gym_reservations/' + reservation.uid).set(reservation, {merge: true});
  }
}
