import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoomService {
  room$ = new BehaviorSubject<string>('');

  constructor(private af: AngularFirestore) { }

  next(value) {
    this.room$.next(value);
  }
}
