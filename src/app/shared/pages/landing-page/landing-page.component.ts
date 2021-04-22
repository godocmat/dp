import {Component, OnDestroy, OnInit} from '@angular/core';
import {ArticleService} from '../../../article/services/article.service';
import {forkJoin, Subscription} from 'rxjs';
import {Article} from '../../../article/models/article';
import {Router} from '@angular/router';
import {AuthService} from '../../../auth/services/auth.service';
import {User} from '../../../auth/models/user';
import {switchMap} from 'rxjs/operators';
import {WashingMachineService} from '../../../washing-machine/services/washing-machine.service';
import {WashingMachine} from '../../../washing-machine/models/washing-machine';
import {GymService} from '../../../gym/services/gym.service';
import {Gym} from '../../../gym/models/gym';
import * as moment from 'moment';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit, OnDestroy {
  subs$: Subscription[] = [];
  articles: Article[] = [];
  user: User;
  userWM: WashingMachine;
  userGym: Gym[] = [];
  wmTimeToShow;

  constructor(private articleService: ArticleService, private router: Router,
              private authService: AuthService,
              private wmService: WashingMachineService,
              private gymService: GymService) { }

  ngOnInit(): void {
    this.subs$.push(this.articleService.getArticles().subscribe(articles => this.articles = articles));
    this.subs$.push(this.authService.user$.pipe(
      switchMap((user) => {
        this.user = user;
        return this.wmService.getWashingMachineByUserId(user.uid);
      }),
      switchMap((userWM) => {
        this.userWM = userWM[0];
        this.wmTimeToShow = moment.unix(this.userWM?.adminTimeUntil).format('HH:mm:ss');
        return this.gymService.getUserReservations(this.user);
      })
    ).subscribe(userGym => this.userGym = userGym));
  }

  showArticle(uid): void {
    this.router.navigate(['article/article/' + uid]);
  }

  ngOnDestroy(): void {
    this.subs$.forEach(sub => sub.unsubscribe());
  }
}
