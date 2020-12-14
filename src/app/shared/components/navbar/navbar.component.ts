import {Component, OnDestroy, OnInit} from '@angular/core';
import {MenuItem} from 'primeng/api';
import {AuthService} from '../../../auth/services/auth.service';
import {User} from '../../../auth/models/user';
import {Subscription} from 'rxjs';
import {Router} from '@angular/router';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {

  items: MenuItem[];
  user: User;
  subs$: Subscription[] = [];

  constructor(private authService: AuthService,
              private router: Router) { }

  ngOnInit(): void {
    this.subs$.push(this.authService.user$.subscribe((user) => {
      this.user = user;
      this.getMenuItems(user);
    }));

  }

  getMenuItems(user): any[] {
    if (user) {
      return this.items = [
        {
          label: 'ŠDJ9',
        },
        {
          label: 'Telocvične',
        },
        {
          label: 'Práčky',
        },
        {
          label: 'Izby'
        },
        {
          label: 'Odhlásiť sa',
          command: () => {
            this.authService.signOut().then();
          }
        }
      ];
    }
    else {
      return this.items = [
        {
          label: 'Prihlásiť',
          command: () => {
            this.router.navigate(['auth/login']);
          }
        },
        {
          label: 'Registrovať',
          command: () => {
            this.router.navigate(['auth/register']);
          }
        },
      ];
    }
  }


  ngOnDestroy(): void {
    this.subs$.forEach(sub => sub.unsubscribe());
  }

}
