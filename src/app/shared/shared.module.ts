import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ButtonModule} from "primeng/button";
import {TableModule} from "primeng/table";

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
import {CountdownModule} from "ngx-countdown";


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
    ButtonModule,
    CountdownModule,
    TableModule
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
    ButtonModule,
    CountdownModule,
    TableModule

  ]
})
export class SharedModule { }
