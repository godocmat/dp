import { Component, OnInit } from '@angular/core';
import {RoomService} from "../../services/room.service";
import {switchMap} from "rxjs/operators";
import {forkJoin} from "rxjs";
import {Room} from "../../models/room";
import {AuthService} from "../../../auth/services/auth.service";
import {User} from "../../../auth/models/user";

@Component({
  selector: 'app-room-reserve',
  templateUrl: './room-reserve.component.html',
  styleUrls: ['./room-reserve.component.scss']
})
export class RoomReserveComponent implements OnInit {
  room;
  user1: User;
  user2: User;
  user3: User;
  user4: User;

  constructor(private roomService: RoomService,
              private authService: AuthService) { }

  ngOnInit(): void {
    this.roomService.room$.pipe(
      switchMap(room => {
        this.room = room;
        console.log(this.room)
        return this.roomService.getRoomById(this.room);
      }),
      switchMap((roomObject: Room) => {
        console.log(roomObject);
        return forkJoin(
          [
            this.authService.getUserById(roomObject.uidFirst),
            this.authService.getUserById(roomObject.uidSecond),
            this.authService.getUserById(roomObject.uidThird),
            this.authService.getUserById(roomObject.uidFourth)
          ]
        );
      })
    ).subscribe((users) => {
      this.user1 = users[0];
      console.log(this.user1);
      this.user2 = users[1];
      this.user3 = users[2];
      this.user4 = users[3];
    });
  }

}
