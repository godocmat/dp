import {Component, OnDestroy, OnInit} from '@angular/core';
import {RoomService} from '../../services/room.service';
import {Subscription} from 'rxjs';
import {Router} from '@angular/router';

@Component({
  selector: 'app-floor',
  templateUrl: './floor.component.html',
  styleUrls: ['./floor.component.scss']
})
export class FloorComponent implements OnInit, OnDestroy {
  room;
  sub: Subscription

  constructor(private roomService: RoomService,
              private router: Router) { }

  ngOnInit(): void {
    this.sub = this.roomService.room$.subscribe(room => this.room = room);
  }

  nextPage(value): void {
    this.room += value;
    this.roomService.next(this.room);
    this.router.navigate(['rooms/room']);
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

}
