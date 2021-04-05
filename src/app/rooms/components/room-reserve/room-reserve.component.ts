import {Component, OnDestroy, OnInit} from '@angular/core';
import {RoomService} from "../../services/room.service";
import {switchMap} from "rxjs/operators";
import {forkJoin, of, Subscription, zip} from 'rxjs';
import {Room} from "../../models/room";
import {AuthService} from "../../../auth/services/auth.service";
import {User} from "../../../auth/models/user";
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-room-reserve',
  templateUrl: './room-reserve.component.html',
  styleUrls: ['./room-reserve.component.scss']
})
export class RoomReserveComponent implements OnInit, OnDestroy {
  isLoading = true;
  room;
  roomObj: Room;
  user: User;
  user1: User;
  user2: User;
  user3: User;
  user4: User;
  sub: Subscription;

  constructor(private roomService: RoomService,
              private authService: AuthService,
              private router: Router,
              private toastrService: ToastrService) { }

  ngOnInit(): void {
    this.sub = this.authService.user$.pipe(
      switchMap(user => {
        this.user = user;
        return this.roomService.room$;
      }),
      switchMap(room => {
        this.room = room;
        console.log(room);
        if (room.length < 4) {
          this.router.navigate(['rooms']).then(r => this.roomService.next(''));
          return of(null);
        }
        else if (room.length >= 4) {
          return this.roomService.getRoomById(this.room);
        }
        else {
          return of(null);

      }}),
      switchMap((roomObject: Room) => {
        console.log(roomObject);
        if (roomObject) {
          this.roomObj = roomObject;
          return zip(
              this.authService.getUserById(roomObject.uidFirst),
              this.authService.getUserById(roomObject.uidSecond),
              this.authService.getUserById(roomObject.uidThird),
              this.authService.getUserById(roomObject.uidFourth)
          );
        }
        else {
          return of(null);
        }
      })
    ).subscribe((users) => {
      console.log('sub', users);
      if (users) {
        this.user1 = users[0];
        this.user2 = users[1];
        this.user3 = users[2];
        this.user4 = users[3];
      }
      this.isLoading = false;
    });
  }

  reserve(): void {
    if (!this.roomObj.uidFirst) {
      this.roomObj.uidFirst = this.user.uid;
      this.updateRoomAndUser();
    }
    else if (!this.roomObj.uidSecond) {
      this.roomObj.uidSecond = this.user.uid;
      this.updateRoomAndUser();
    }
    else if (!this.roomObj.uidThird) {
      this.roomObj.uidThird = this.user.uid;
      this.updateRoomAndUser();
    }
    else if (!this.roomObj.uidFourth) {
      this.roomObj.uidFourth = this.user.uid;
      this.updateRoomAndUser();
    }
  }

  updateRoomAndUser(): void {
    this.roomObj.roomType = this.user.sex;
    this.roomService.updateRoomById(this.room, this.roomObj).then(r => {
      this.user.room = this.room;
      this.authService.updateUserById(this.user.uid, this.user).then(res => {
        this.toastrService.success('Izba úspešne rezervovaná');
      });
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

}
