import {Component, OnDestroy, OnInit} from '@angular/core';
import {ArticleService} from '../../services/article.service';
import {Subscription} from 'rxjs';
import {Router} from '@angular/router';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit, OnDestroy {
  subs$: Subscription[] = [];
  article;

  constructor(private articleService: ArticleService,
              private router: Router) { }

  ngOnInit(): void {
    this.subs$.push(this.articleService.article$.subscribe(article => this.article = article));
  }

  nextPage(): void {
    if (this.article.text && this.article.title) {
      this.articleService.next(this.article);
      this.router.navigate(['article/preview']);
    }
  }

  ngOnDestroy(): void {
    this.subs$.forEach(sub => sub.unsubscribe());
  }

}
