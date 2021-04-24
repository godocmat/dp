import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from './auth.service';
import {User} from '../models/user';
import {map, take, tap} from 'rxjs/operators';
import {ToastrService} from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  user: User;
  constructor(private authService: AuthService,
              private router: Router,
              private toastrService: ToastrService) {
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    this.authService.user$.subscribe(user => this.user = user);
    return this.authService.user$.pipe(
      take(1),
      map(user => !!user),
      tap(loggedIn => {
        if (!loggedIn) {
          this.toastrService.error('Musíte byť prihlásený', 'Error');
          this.router.navigate(['auth/login']);
        }
      })
    );
  }
}
