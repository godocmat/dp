import {Component, OnDestroy, OnInit} from '@angular/core';
import {RoomService} from '../../services/room.service';
import {Subscription} from 'rxjs';
import {Router} from "@angular/router";

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})
export class RoomComponent implements OnInit, OnDestroy {
  sub: Subscription;
  room;

  constructor(private roomService: RoomService,
              private router: Router) { }

  ngOnInit(): void {
    this.sub = this.roomService.room$.subscribe(room => {
      this.room = room;
      if (room.length <= 1) {
        this.router.navigate(['rooms/block']).then(r => this.roomService.next(''));
      }
      else if (room.length > 4) {
        this.router.navigate(['rooms/block']).then(r => this.roomService.next(''));
      }
    });
  }

  nextPage(value): void {
    this.roomService.next(this.room + value);
    this.router.navigate(['rooms/room_reserve']);
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

}
