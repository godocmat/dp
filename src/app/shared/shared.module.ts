import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ButtonModule} from "primeng/button";

import { SharedRoutingModule } from './shared-routing.module';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import {FlexLayoutModule, FlexModule} from '@angular/flex-layout';
import {MenubarModule} from 'primeng/menubar';
import { TooltipModule } from 'primeng/tooltip';
import { InputTextModule } from 'primeng/inputtext';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SpinnerModule} from 'primeng/spinner';
import {ProgressSpinnerModule} from 'primeng/progressspinner';


@NgModule({
  declarations: [NavbarComponent, LandingPageComponent],
  exports: [
    NavbarComponent,
    FlexLayoutModule,
    FlexModule,
    TooltipModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    SpinnerModule,
    ProgressSpinnerModule,
    ButtonModule
  ],
  imports: [
    CommonModule,
    SharedRoutingModule,
    FlexLayoutModule,
    FlexModule,
    FormsModule,
    ReactiveFormsModule,
    MenubarModule,
    TooltipModule,
    InputTextModule,
    ProgressSpinnerModule,
    ButtonModule

  ]
})
export class SharedModule { }
