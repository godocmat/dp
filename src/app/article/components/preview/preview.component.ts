import {Component, OnDestroy, OnInit} from '@angular/core';
import {ArticleService} from '../../services/article.service';
import {Subscription} from 'rxjs';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss']
})
export class PreviewComponent implements OnInit, OnDestroy {
  subs$: Subscription[] = [];
  article;

  constructor(private articleService: ArticleService,
              private router: Router,
              private toastrService: ToastrService) { }

  ngOnInit(): void {
    this.subs$.push(this.articleService.article$.subscribe(article => this.article = article));
  }

  previousPage(): void {
    this.router.navigate(['article/editor']);
  }

  submit(): void {
    this.article.createdAt = new Date();
    this.articleService.addNewArticle(this.article).then(r => {
      this.toastrService.success('Článok bol úspešne pridaný');
      this.router.navigate(['']);
    });
  }

  ngOnDestroy(): void {
    this.subs$.forEach(sub => sub.unsubscribe());
  }

}
