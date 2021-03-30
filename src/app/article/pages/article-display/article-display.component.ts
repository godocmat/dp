import {Component, OnDestroy, OnInit} from '@angular/core';
import {ArticleService} from '../../services/article.service';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs';
import {log} from 'util';
import {Article} from '../../models/article';

@Component({
  selector: 'app-article-display',
  templateUrl: './article-display.component.html',
  styleUrls: ['./article-display.component.scss']
})
export class ArticleDisplayComponent implements OnInit, OnDestroy {
  subs$: Subscription[] = [];
  article: Article;

  constructor(private articleService: ArticleService,
              private activeRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.subs$.push(this.articleService.getArticleById(this.activeRoute.snapshot.params.id).subscribe(article => this.article = article));
  }

  ngOnDestroy(): void {
    this.subs$.forEach(sub => sub.unsubscribe());
  }

}
