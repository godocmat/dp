import { Component, OnInit } from '@angular/core';
import {MenuItem} from 'primeng/api';
import {forkJoin, of, Subscription, zip} from 'rxjs';
import {User} from '../../../auth/models/user';
import {AuthService} from '../../../auth/services/auth.service';
import {switchMap} from 'rxjs/operators';
import {RoomService} from '../../services/room.service';

@Component({
  selector: 'app-room-stepper',
  templateUrl: './room-stepper.component.html',
  styleUrls: ['./room-stepper.component.scss']
})
export class RoomStepperComponent implements OnInit {
  items: MenuItem[];
  sub: Subscription;
  room;
  user1: User;
  user2: User;
  user3: User;
  user4: User;

  constructor(private authService: AuthService,
              private roomService: RoomService) { }

  ngOnInit(): void {
    this.items = [
      {
        label: 'Blok',
        routerLink: 'block'
      },
      {
        label: 'Poschodie',
        routerLink: 'floor'
      },
      {
        label: 'Izba',
        routerLink: 'room'
      },
      {
        label: 'Rezervácia',
        routerLink: 'room-reserve'
      }
    ];
    this.sub = this.authService.user$.pipe(
      switchMap(user => {
        if (user.room) {
          this.room = user.room;
          return this.roomService.getRoomById(user.room);
        }
        else {
          return of(null);
        }
      }),
      switchMap(room => {
        if (room) {
          return zip(
              this.authService.getUserById(room.uidFirst),
              this.authService.getUserById(room.uidSecond),
              this.authService.getUserById(room.uidThird),
              this.authService.getUserById(room.uidFourth)
          );
        }
        else {
          return of(null);
        }
      })
    ).subscribe(users => {
      if (users) {
        this.user1 = users[0];
        this.user2 = users[1];
        this.user3 = users[2];
        this.user4 = users[3];
      }
    });

  }

}
