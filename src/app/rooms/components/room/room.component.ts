import { Component, OnInit } from '@angular/core';
import {RoomService} from '../../services/room.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})
export class RoomComponent implements OnInit {
  sub: Subscription;
  room;

  constructor(private roomService: RoomService) { }

  ngOnInit(): void {
    this.sub = this.roomService.room$.subscribe(room => this.room = room);
  }

  nextPage(value) {

  }

}
