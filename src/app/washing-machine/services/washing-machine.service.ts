import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import * as moment from 'moment';
import {map} from 'rxjs/operators';
import {WashingMachine} from '../models/washing-machine';
import {AngularFirestore} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class WashingMachineService {

  constructor(private firestore: AngularFirestore) { }

  getFreeWashingMachines(): Observable<WashingMachine[]> {
    return this.firestore.collection('wm_reservations', ref => {
      return ref.where('adminTimeUntil', '<=', moment().unix());
      // return ref
      //   .where('date', '<', moment().day(13).unix())
      //   .where('date', '>', moment().day(0).unix()).orderBy('date', 'asc');
    })
      .get()
      .pipe(
        map((requests) => {
          return requests.docs.map((snap) => {
            return {
              uid: snap.id,
              ...snap.data() as WashingMachine
            };
          });
        })
      );
  }

  reserveWashingMachine(washingMachine: WashingMachine): Promise<void> {
    return this.firestore.collection('wm_reservations').doc(washingMachine.uid).update(washingMachine);
  }

  getWashingMachineByUserId(userId: string): Observable<WashingMachine[]> {
    return this.firestore.collection('wm_reservations', ref => {
      return ref.where('userId', '==', userId)
        .where('adminTimeUntil', '>=', moment().unix());
    }).get().pipe(
      map((req) => {
        return req.docs.map((snap) => {
          return {
            uid: snap.id,
            ...snap.data() as WashingMachine
          };
        });
      })
    );
  }
}
