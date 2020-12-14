import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MenubarModule} from 'primeng/menubar';
import { TooltipModule } from 'primeng/tooltip';
import { InputTextModule } from 'primeng/inputtext';


@NgModule({
  declarations: [NavbarComponent, LandingPageComponent],
  exports: [
    NavbarComponent
  ],
  imports: [
    CommonModule,
    SharedRoutingModule,
    FlexLayoutModule,
    MenubarModule,
    TooltipModule,
    InputTextModule,

  ]
})
export class SharedModule { }
