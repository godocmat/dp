import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LandingPageComponent} from './shared/pages/landing-page/landing-page.component';
import {AuthGuard} from './auth/services/auth.guard';
import {AdminAuthGuard} from './auth/services/admin-auth.guard';

const routes: Routes = [
  {
    path: '',
    component: LandingPageComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
    canActivate: [AdminAuthGuard]
  }
  ,
  {
    path: 'gym',
    loadChildren: () => import('./gym/gym.module').then(m => m.GymModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'washing-machine',
    loadChildren: () => import('./washing-machine/washing-machine.module').then(m => m.WashingMachineModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'article',
    loadChildren: () => import('./article/article.module').then(m => m.ArticleModule),
    canActivate: [AdminAuthGuard]
  },
  {
    path: 'rooms',
    loadChildren: () => import('./rooms/rooms.module').then(m => m.RoomsModule),
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
