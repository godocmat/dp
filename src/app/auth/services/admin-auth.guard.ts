import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {map, take, tap} from 'rxjs/operators';
import {AuthService} from './auth.service';
import {ToastrService} from 'ngx-toastr';
import {User} from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate {
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
      map(user => !!user?.roles?.admin),
      tap(loggedIn => {
        if (!loggedIn) {
          this.toastrService.error('Do tejto časti nemáte prístup', 'Error');
          this.router.navigate(['/']);
        }
      })
    );
  }
}
