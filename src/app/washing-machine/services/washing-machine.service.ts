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
      return ref.where('adminTimeUntil', '<=', moment().unix())
        .where('status', '==', 'active');
    }).snapshotChanges().pipe(map((req) => {
      return req.map((r) => {
        return {
          uid: r.payload.doc.id,
          ...r.payload.doc.data() as WashingMachine
        };
      });
    }));
  }

  getAllWashingMachines(): Observable<WashingMachine[]> {
    return this.firestore.collection('wm_reservations').snapshotChanges().pipe(map(req => {
      return req.map(r => {
        return {
          uid: r.payload.doc.id,
          ...r.payload.doc.data() as WashingMachine
        };
      });
    }));
  }

  updateWashingMachine(washingMachine: WashingMachine): Promise<void> {
    return this.firestore.collection('wm_reservations').doc(washingMachine.uid).update(washingMachine);
  }

  getWashingMachineByUserId(userId: string): Observable<WashingMachine[]> {
    return this.firestore.collection('wm_reservations', ref => {
      return ref.where('userId', '==', userId)
        .where('adminTimeUntil', '>=', moment().unix());
    }).snapshotChanges().pipe(map((req) => {
      return req.map((r) => {
        return {
          uid: r.payload.doc.id,
          ...r.payload.doc.data() as WashingMachine
        };
      });
    }));
  }

  getWashingMachinesForAdminConfirmation(): Observable<WashingMachine[]> {
    return this.firestore.collection('wm_reservations', ref => {
      return ref.where('adminTimeUntil', '>=', moment().unix());
    }).snapshotChanges().pipe(map((req) => {
      return req.map((r) => {
        return {
          uid: r.payload.doc.id,
          ...r.payload.doc.data() as WashingMachine
        };
      });
    }));
  }

  getAdminRecords(limit: number): Observable<WashingMachine[]> {
    return this.firestore.collection('wm_logs', ref => {
      return ref.orderBy('adminTimeUntil', 'desc').limit(limit);
    }).snapshotChanges()
      .pipe(map((req) => {
        return req.map((r) => {
          return {
            logId: r.payload.doc.id,
            ...r.payload.doc.data() as WashingMachine
          };
        });
      }));
  }

  addAdminRecord(record: WashingMachine): Promise<any> {
    return this.firestore.collection('wm_logs').add(record);
  }
}
