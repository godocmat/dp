import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {AngularFirestore} from '@angular/fire/firestore';
import {map} from 'rxjs/operators';
import {Article} from '../models/article';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  article$ = new BehaviorSubject({});

  constructor(private af: AngularFirestore) { }

  next(value): void {
    this.article$.next(value);
  }

  addNewArticle(article): Promise<any> {
    return this.af.collection('articles').add(article);
  }

  getArticles(): Observable<Article[]> {
    return  this.af.collection('articles', ref => {
      return ref.limit(5).orderBy('createdAt', 'desc');
    }).snapshotChanges().pipe(map(req => {
      return req.map((r) => {
       return {
         uid: r.payload.doc.id,
         ...r.payload.doc.data() as Article
       };
      });
    }));
  }

  getArticleById(id): Observable<Article> {
    return this.af.collection('articles').doc(id).get().pipe(map((r) => {
      return {
        uid: r.id,
        ...r.data() as Article
      };
    }));
  }
}
