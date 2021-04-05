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
      // ref.where('date', '<', moment().day(13).unix())
      return ref.where('date', '>=', moment().day(0).hour(0).minute(0).second(0).unix()).orderBy('date', 'asc').limit(24);
    }).snapshotChanges().pipe(map((req) => {
      return req.map((r) => {
        return {
          uid: r.payload.doc.id,
          ...r.payload.doc.data() as Gym
        };
      });
    }));
  }

  getUserReservations(user): Observable<Gym[]> {
    return this.firestore.collection('gym_reservations', ref => {
      return ref.where('user', '==', user).where('date', '>=', moment().unix()).orderBy('date', 'asc');
    }).snapshotChanges().pipe(map((req) => {
      return req.map((r) => {
        return {
          uid: r.payload.doc.id,
          ...r.payload.doc.data() as Gym
        };
      });
    }));
  }
  //
  // addReservation(reservation): Promise<any> {
  //   return this.firestore.collection('gym_reservations').add(reservation);
  // }

  deleteReservation(reservation: Gym): Promise<void> {
    return this.firestore.doc('gym_reservations/' + reservation.uid).set(reservation, {merge: true});
  }

  updateReservation(reservation: Gym): Promise<void> {
    return this.firestore.doc('gym_reservations/' + reservation.uid).set(reservation, {merge: true});
  }
}
