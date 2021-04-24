import {Component, OnDestroy, OnInit} from '@angular/core';
import {UsersService} from '../../services/users.service';
import {User} from '../../../auth/models/user';
import {Subscription} from 'rxjs';
import {RoomService} from '../../../rooms/services/room.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-admin-users-table',
  templateUrl: './admin-users-table.component.html',
  styleUrls: ['./admin-users-table.component.scss']
})
export class AdminUsersTableComponent implements OnInit, OnDestroy {
  users: User[] = [];
  isLoading = true;
  sub$: Subscription;
  constructor(private usersService: UsersService,
              private roomService: RoomService,
              private toastr: ToastrService) { }

  ngOnInit(): void {
    this.sub$ = this.usersService.getUsers().subscribe(users => {
      this.users = users;
      this.isLoading = false;
    });
  }

  deleteRoom(user): void {
    const roomNumber = user.room;
    this.roomService.getRoomObject(roomNumber).subscribe(room => {
      room.users = room.users.filter(u => u.uid !== user.uid);
      this.roomService.updateRoomById(roomNumber, room).then(r => {
        user.room = null;
        this.usersService.updateUser(user).then(res => {
          this.toastr.success('Izba bola odstránená');
        });
      });
    });

  }
  setPayment(user): void {
    user.payment = !user.payment;
    this.usersService.updateUser(user).then();
  }

  ngOnDestroy(): void {
    this.sub$.unsubscribe();
  }

}
