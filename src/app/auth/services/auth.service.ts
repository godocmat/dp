import {Inject, Injectable} from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import {Observable, of} from 'rxjs';
import {User} from '../models/user';
import {map, switchMap, tap} from 'rxjs/operators';
import {AngularFirestore, AngularFirestoreDocument} from '@angular/fire/firestore';
import {ToastrService} from 'ngx-toastr';
import {DialogService} from 'primeng/dynamicdialog';
import {ResetPasswordDialogComponent} from '../components/reset-password-dialog/reset-password-dialog.component';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$: Observable<User>;

  constructor(public  afAuth: AngularFireAuth,
              private afs: AngularFirestore,
              private toastrService: ToastrService,
              @Inject(DialogService) private dialogService: DialogService,
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

  async createUser(user, userData): Promise<void> {
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);
    let currentUser: User;

    userRef.get().toPromise().then((current) => {
      currentUser = current.data();
      const data = {
        uid: user.uid,
        email: user.email,
        roles: {
          client: true
        },
        payment: false,
        room: null,
        ...userData
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
          this.toastrService.success('Boli ste úspešne prihlásený');
        }
      }).catch(err => this.toastrService.error(err));
    }
    catch (err) {
      console.error(err);
      this.toastrService.error(err);
    }
  }

  async registerUser(email, password, userData): Promise<void> {
    try {
      await this.afAuth.createUserWithEmailAndPassword(email, password).then((user) => {
        this.createUser(user.user, userData);
        user.user.sendEmailVerification().then(() => {
          this.toastrService.success('Na vašu emailovú adresu bol odoslaný overovací email');
          this.afAuth.signOut();
        });
      }).catch(err => {
        this.toastrService.error(err);
        console.error(err);
      });
    } catch (err) {
      console.error(err);
      this.toastrService.error(err);
    }
  }

  async resetPassword(): Promise<void> {
    const ref = this.dialogService.open(ResetPasswordDialogComponent, {
      header: 'Zabduli ste heslo ? Vložte svoj email',
      width: 'auto',
      styleClass: 'light-text-green-shadow'
    });

    ref.onClose.subscribe((email) => {
      if (email) {
        this.afAuth.sendPasswordResetEmail(email)
          .then(() => {
            this.toastrService.success('Email pre zmenu hesla bol odoslaný');
          })
          .catch(err => this.toastrService.error(err));
      }
    });
  }

  getUserById(userId: string): Observable<User> {
    if (userId.length > 0) {
      return this.afs.collection('users').doc(userId).snapshotChanges().pipe(
        map((r) => r.payload.data() as User),
        tap(r => console.log(r))
      );
    }
    else {
      return of(null);
    }

  }

  updateUserById(userId: string, data): Promise<any> {
    return this.afs.collection('users').doc(userId).update(data);
  }


  async signOut(): Promise<void> {
    await this.afAuth.signOut();
    this.toastrService.success('Boli ste úspešne odhlásený');
    await this.router.navigate(['/auth/login']);
  }
}
