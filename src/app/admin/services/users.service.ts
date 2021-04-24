import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {AngularFirestore} from '@angular/fire/firestore';
import {User} from '../../auth/models/user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private firestore: AngularFirestore) { }

  getUsers(): Observable<User[]> {
    return this.firestore.collection('users').snapshotChanges().pipe(map((req) => {
      return req.map((r) => {
        return {
          uid: r.payload.doc.id,
          ...r.payload.doc.data() as User
        };
      });
    }));
  }

  updateUser(user: User): Promise<void> {
    return this.firestore.doc('users/' + user.uid).update(user);
  }
}
