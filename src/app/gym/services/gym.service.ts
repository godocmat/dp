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
      return ref.where('user', '==', user);
    }).snapshotChanges().pipe(map((req) => {
      return req.map((r) => {
        return {
          uid: r.payload.doc.id,
          ...r.payload.doc.data() as Gym
        };
      });
    }));
  }

  deleteReservation(reservation: Gym): Promise<void> {
    return this.firestore.doc('gym_reservations/' + reservation.uid).set(reservation, {merge: true});
  }

  updateReservation(reservation: Gym): Promise<void> {
    return this.firestore.doc('gym_reservations/' + reservation.uid).set(reservation, {merge: true});
  }
}
