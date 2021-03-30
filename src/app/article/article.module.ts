import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArticleRoutingModule } from './article-routing.module';
import {EditorModule} from 'primeng/editor';
import {ArticlePageComponent} from './pages/article-page/article-page.component';
import {SharedModule} from '../shared/shared.module';
import {EditorComponent} from './components/editor/editor.component';
import {PreviewComponent} from './components/preview/preview.component';
import {StepsModule} from 'primeng/steps';
import {MenuItem} from 'primeng/api';
import { ArticleDisplayComponent } from './pages/article-display/article-display.component';


@NgModule({
  declarations: [ArticlePageComponent, EditorComponent, PreviewComponent, ArticleDisplayComponent],
  imports: [
    CommonModule,
    ArticleRoutingModule,
    EditorModule,
    SharedModule,
    StepsModule
  ]
})
export class ArticleModule { }
