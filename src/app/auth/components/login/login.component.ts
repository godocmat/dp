import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;


  constructor(private authService: AuthService,
              private fb: FormBuilder,
              private toastrService: ToastrService) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [
        Validators.email,
        Validators.required
      ]],
      password: ['', [
        Validators.required,
        Validators.minLength(6)
      ]],
    });
  }


  login(): void {
    if (!this.loginForm.invalid) {
      this.authService.loginUser(this.getFormValue('email'), this.getFormValue('password')).then();
    }
    else {
      this.toastrService.error('Zle vyplnený formulár');
    }

  }

  resetPassword(): void {
    this.authService.resetPassword().then();
  }

  getFormValue(key): string {
    return this.loginForm.get(key).value;
  }

}
