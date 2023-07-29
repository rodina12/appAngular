import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { AuthService } from './../../Services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  flag = false;
  response: any = '';

  loginForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.email, Validators.required]),
    password: new FormControl(null, [
      Validators.pattern(/^[a-zA-Z1-9]/),
      Validators.required,
    ]),
  });

  constructor(private _AuthService: AuthService, private _Router: Router) {}

  login(loginForm: any) {
    this.response = '';
    this.flag = true;
    // localStorage.setItem('token', "000");

    // this._Router.navigate(['/home']);


    this._AuthService.login(loginForm.value).subscribe((response) => {
      if (response.message == 'success') {
        localStorage.setItem('token', response.token);
        // this._AuthService.userIsLoggedIn = true;
        this._Router.navigate(['/home']);
      } else {
        this.flag = false;
        this.response = response.message;

      }
    });
  }

  ngOnInit(): void {}
}
