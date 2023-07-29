import { Component, OnInit } from '@angular/core';
import { AuthService } from './../../Services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(public _AuthService:AuthService) {
   }

  ngOnInit(): void {
  }

  logOut(){
    // this._AuthService.userIsLoggedIn = false
    localStorage.removeItem("token")
  }

}
