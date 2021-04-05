import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {BehaviorSubject, Observable} from 'rxjs';
import {map} from "rxjs/operators";
import {Room} from "../models/room";

@Injectable({
  providedIn: 'root'
})
export class RoomService {
  room$ = new BehaviorSubject<string>('');

  constructor(private af: AngularFirestore) { }

  next(value): void {
    this.room$.next(value);
  }

  getRoomById(roomId: string): Observable<Room> {
    return this.af.collection('rooms').doc(roomId).snapshotChanges().pipe(
      map(r => {
        return {
          ...r.payload.data() as Room
        };
      })
    );
  }

  updateRoomById(roomId: string, data): Promise<any> {
    return this.af.collection('rooms').doc(roomId).update(data);
  }

}
