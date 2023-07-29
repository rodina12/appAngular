import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './../../Services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup = new FormGroup({
    first_name: new FormControl(null, [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
      Validators.pattern(/^[a-zA-Z1-9 ]{3,20}$/),
    ]),
    last_name: new FormControl(null, [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
      Validators.pattern(/^[a-zA-Z1-9 ]{3,20}$/),
    ]),
    email: new FormControl(null, [Validators.email, Validators.required]),
    age: new FormControl(null, [Validators.min(1), Validators.max(100)]),
    password: new FormControl(null, [
      Validators.pattern(/[a-zA-Z1-9]/),
      Validators.required,
      Validators.minLength(8)
    ]),
  });

  constructor(private _AuthService: AuthService, private _Router: Router) {}
  flag: boolean = false;
  response: any = '';

  fnameError = '';
  lnameError = '';
  emailError = '';
  ageError = '';
  passError = '';

  register(registerForm: any) {
    this.response = ""
    if (
      !this.registerForm.get('first_name')?.errors &&
      !this.registerForm.get('last_name')?.errors &&
      !this.registerForm.get('email')?.errors &&
      !this.registerForm.get('age')?.errors &&
      !this.registerForm.get('password')?.errors
    ) {
      this.flag = true;

      this._AuthService.register(registerForm.value).subscribe((response) => {
        if (response.message == 'success') {
          this._Router.navigate(['/login']);
        } else {
          this.flag = false;
          this.response = response.message;
        }
      });
    }

    // First Name Validation
    if (this.registerForm.get('first_name')?.errors) {
      if (this.registerForm.get('first_name')?.errors?.['minlength']) {
        this.fnameError = 'First Name length must be between 3 to 20 character';
      } else if (this.registerForm.get('first_name')?.errors?.['pattern']) {
        this.fnameError = 'Special chars not allowed';
      } else {
        this.fnameError = 'First name is required';
      }
    } else {
      if(/^ {1,}$/.test(registerForm.value.first_name)){
        this.fnameError = 'Enter valid name'
      }else{
        this.fnameError = '';
      }
    }

    // First Name Validation
    if (this.registerForm.get('last_name')?.errors) {
      if (this.registerForm.get('last_name')?.errors?.['minlength']) {
        this.lnameError = 'Last Name length must be between 3 to 20 character';
      } else if (this.registerForm.get('last_name')?.errors?.['pattern']) {
        this.lnameError = 'Special chars not allowed';
      } else {
        this.lnameError = 'Last name is required';
      }
    } else {
      if(/^ {1,}$/.test(registerForm.value.last_name)){
        this.lnameError = 'Enter valid name'
      }else{
        this.lnameError = '';
      }
    }

    // Email Validation
    if (this.registerForm.get('email')?.errors) {
      if (this.registerForm.get('email')?.errors?.['email']) {
        this.emailError = 'Enter valid email';
      }else{
        this.emailError = 'Email is required';
      }

    }else{
      this.emailError = '';
    }

    // Age Validation
    if (this.registerForm.get('age')?.errors) {
      if (
        this.registerForm.get('age')?.errors?.['min'] ||
        this.registerForm.get('age')?.errors?.['max']
      ) {
        this.ageError = 'Age must be between 1 to 100';
      } else {
        this.ageError = 'Age is required';
      }
    } else {
      this.ageError = '';
    }

    //Password Validation
    if (this.registerForm.get('password')?.errors) {
      if(this.registerForm.get('password')?.errors?.['minlength']){
        this.passError = 'Min length is 8 characters';
      }else{
        this.passError = 'Password is required';
      }
    }else{
      this.passError = '';
    }
  }

  ngOnInit(): void {}
}
