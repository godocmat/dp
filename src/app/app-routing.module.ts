import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LandingPageComponent} from './shared/pages/landing-page/landing-page.component';

const routes: Routes = [
  {
    path: '',
    component: LandingPageComponent
  },
  {
    path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  }
  ,
  {
    path: 'gym', loadChildren: () => import('./gym/gym.module').then(m => m.GymModule)
  },
  {
    path: 'washing-machine', loadChildren: () => import('./washing-machine/washing-machine.module').then(m => m.WashingMachineModule)
  },
  {
    path: 'article', loadChildren: () => import('./article/article.module').then(m => m.ArticleModule)
  },
  {
    path: 'rooms', loadChildren: () => import('./rooms/rooms.module').then(m => m.RoomsModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
