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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
