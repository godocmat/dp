import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import {Observable, of} from 'rxjs';
import {User} from '../models/user';
import {switchMap} from 'rxjs/operators';
import {AngularFirestore, AngularFirestoreDocument} from '@angular/fire/firestore';
import {ToastrService} from 'ngx-toastr';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$: Observable<User>;

  constructor(public  afAuth: AngularFireAuth,
              private afs: AngularFirestore,
              private toastrService: ToastrService,
              public  router: Router) {
    this.user$ = this.afAuth.authState.pipe(
      switchMap((user) => {
        if (user) {
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      })
    );
  }

  async createUser(user): Promise<void> {
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);
    let currentUser: User;

    userRef.get().toPromise().then((current) => {
      currentUser = current.data();
      const data = {
        uid: user.uid,
        email: user.email,
      } as User;
      return userRef.set(data, {merge: true});
    });
  }

  async loginUser(email, password): Promise<void> {
    try {
      this.afAuth.signInWithEmailAndPassword(email, password).then((user) => {
        if (user.user.emailVerified === false) {
          this.afAuth.signOut();
          this.toastrService.error('Emailová adresa ešte nebola potvrdená');
          throw new Error('Emailová adresa ešte nebola potvrdená');
        }
        else {
          this.router.navigate(['/']);
        }
      });
    }
    catch (err) {
      console.error(err);
      this.toastrService.error(err);
    }

  }

  async registerUser(email, password): Promise<void> {
    try {
      await this.afAuth.createUserWithEmailAndPassword(email, password).then((user) => {
        this.createUser(user.user);
        user.user.sendEmailVerification().then(res => {
          this.afAuth.signOut();
        });
      }).catch(err => console.error(err));
    } catch (err) {
      console.error(err);
      this.toastrService.error(err);
    }
  }

  async resetPassword(email): Promise<void> {
      if (email) {
        this.afAuth.sendPasswordResetEmail(email)
          .then(res => {
            // reset pass sent
            this.toastrService.success('Resetovací email bol odoslaný');
          })
          .catch(err => {
            console.error(err);
            this.toastrService.error(err);
          });
      }
  }


  async signOut(): Promise<void> {
    await this.afAuth.signOut();
    await this.router.navigate(['/']);
  }
}
