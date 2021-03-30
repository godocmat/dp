import {Component, OnDestroy, OnInit} from '@angular/core';
import {RoomService} from '../../services/room.service';
import {Subscription} from 'rxjs';
import {Router} from '@angular/router';

@Component({
  selector: 'app-block',
  templateUrl: './block.component.html',
  styleUrls: ['./block.component.scss']
})
export class BlockComponent implements OnInit, OnDestroy {
  sub: Subscription;
  room = '';
  constructor(private roomService: RoomService,
              private router: Router) { }

  ngOnInit(): void {
    this.sub = this.roomService.room$.subscribe(room => this.room = room);
  }

  nextPage(value): void {
    this.room = value;
    this.roomService.next(value);
    this.router.navigate(['rooms/floor']);
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

}
