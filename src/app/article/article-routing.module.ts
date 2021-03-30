import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ArticlePageComponent} from './pages/article-page/article-page.component';
import {EditorComponent} from './components/editor/editor.component';
import {PreviewComponent} from './components/preview/preview.component';
import {ArticleDisplayComponent} from './pages/article-display/article-display.component';

const routes: Routes = [
  {
    path: '',
    component: ArticlePageComponent,
    children: [
      {
        path: '',
        redirectTo: 'editor',
        pathMatch: 'full'
      },
      {
        path: 'editor',
        component: EditorComponent
      },
      {
        path: 'preview',
        component: PreviewComponent
      }
    ]
  },
  {
    path: 'article/:id',
    component: ArticleDisplayComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ArticleRoutingModule { }
