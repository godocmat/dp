import {Component, OnDestroy, OnInit} from '@angular/core';
import {RoomService} from "../../services/room.service";
import {switchMap} from "rxjs/operators";
import {forkJoin, of, Subscription, zip} from 'rxjs';
import {Room} from "../../models/room";
import {AuthService} from "../../../auth/services/auth.service";
import {User} from "../../../auth/models/user";
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {ConfirmDialog} from 'primeng/confirmdialog';
import {ConfirmationService} from 'primeng/api';

@Component({
  selector: 'app-room-reserve',
  templateUrl: './room-reserve.component.html',
  styleUrls: ['./room-reserve.component.scss'],
  providers: [ConfirmationService]
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
              private toastrService: ToastrService,
              private confirmDialog: ConfirmationService) { }

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

      }})).subscribe((roomObject: Room) => {
      console.log(roomObject);
      if (roomObject) {
        this.roomObj = roomObject;
      }
      this.isLoading = false;
    });
  }

  reserve(): void {
    this.confirmDialog.confirm({
      message: 'Naozaj chcete rezervovať izbu ' + this.room + ' ?',
      accept: () => {
        this.roomObj.users.push(this.user);
        this.updateRoomAndUser();
      },
      reject: () => {
        this.confirmDialog.close();
      }
    });
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
