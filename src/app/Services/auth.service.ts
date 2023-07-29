import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import jwt_decode from 'jwt-decode';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseUrl: string = 'https://route-movies-api.vercel.app/';
  // userIsLoggedIn = true

  constructor(private _HttpClient: HttpClient, private _Router: Router) {}

  userIsLoggedIn() {
    try {
      let decoded = jwt_decode(localStorage.getItem('token') || '');
      // console.log(decoded);

      return true;
    } catch (error) {
      return false;
    }
  }

  register(formData: object): Observable<any> {
    return this._HttpClient.post(this.baseUrl + 'signup', formData);
  }

  login(formData: object): Observable<any> {
    return this._HttpClient.post(this.baseUrl + 'signin', formData);
  }

  isTokenValid() {
    window.dispatchEvent(new Event('storage'));
    window.addEventListener('storage', () => {
      if (
        localStorage.getItem('token') == null ||
        localStorage.getItem('token') == ''
      ) {
        this._Router.navigate(['/login']);
      }

      try {
        var decodedHeader = jwt_decode(localStorage.getItem('token') || '', {
          header: true,
        });
      } catch (error) {
        localStorage.removeItem("token")        
        this._Router.navigate(['/login']);
      }

      if (!this.userIsLoggedIn()) {
        this._Router.navigate(['/login']);
      }

      // this.getGameDetails(gameID:number)
    });
  }
}
