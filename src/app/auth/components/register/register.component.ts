import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {


  registerForm: FormGroup;


  constructor(private authService: AuthService,
              private fb: FormBuilder,
              private toastrService: ToastrService,
              private router: Router) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      email: ['', [
        Validators.email,
        Validators.required
      ]],
      password: ['', [
        Validators.required,
        Validators.minLength(6)
      ]],
      repassword: ['', [
        Validators.required,
      ]],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]]
    }, {validators: this.pwdMatchValidator});
  }

  pwdMatchValidator(frm: FormGroup): any {
    return frm.get('password').value === frm.get('repassword').value
      ? null : {mismatch: true};
  }

  register(): void {
    if (!this.registerForm.invalid) {
      const userData = {
        firstName: this.getFormValue('firstName'),
        lastName: this.getFormValue('lastName')
      };
      this.authService.registerUser(this.getFormValue('email'), this.getFormValue('password'), userData).then(() => this.router.navigate(['/auth/login']));
    }
    else {
      this.toastrService.error('Zle vyplnený formulár. Skontrolujte, či ste zadali všetky polia a či sa vaše heslá zhodujú');
    }

  }

  getFormValue(key): string {
    return this.registerForm.get(key).value;
  }

}
