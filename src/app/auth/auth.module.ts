import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './components/login/login.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import {ButtonModule} from 'primeng/button';
import { RegisterComponent } from './components/register/register.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { ResetPasswordDialogComponent } from './components/reset-password-dialog/reset-password-dialog.component';
import {DynamicDialogModule} from 'primeng/dynamicdialog';
import {SharedModule} from '../shared/shared.module';
import {DropdownModule} from 'primeng/dropdown';


@NgModule({
  declarations: [LoginComponent, LoginPageComponent, RegisterComponent, RegisterPageComponent, ResetPasswordDialogComponent],
    imports: [
        CommonModule,
        AuthRoutingModule,
        ButtonModule,
        DynamicDialogModule,
        SharedModule,
        DropdownModule
    ]
})
export class AuthModule { }
