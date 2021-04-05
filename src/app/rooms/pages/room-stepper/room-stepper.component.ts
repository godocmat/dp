import {Component, OnDestroy, OnInit} from '@angular/core';
import {MenuItem} from 'primeng/api';
import {forkJoin, of, Subscription, zip} from 'rxjs';
import {User} from '../../../auth/models/user';
import {AuthService} from '../../../auth/services/auth.service';
import {switchMap} from 'rxjs/operators';
import {RoomService} from '../../services/room.service';
import {Room} from '../../models/room';

@Component({
  selector: 'app-room-stepper',
  templateUrl: './room-stepper.component.html',
  styleUrls: ['./room-stepper.component.scss']
})
export class RoomStepperComponent implements OnInit, OnDestroy {
  items: MenuItem[];
  sub: Subscription;
  room;
  roomObj: Room;

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
      })
    ).subscribe((roomObj) => {
      if (roomObj) {
        this.roomObj = roomObj;
      }
    });

  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

}
