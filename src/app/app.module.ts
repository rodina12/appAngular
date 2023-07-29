import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './Components/home/home.component';
import { LoginComponent } from './Components/login/login.component';
import { RegisterComponent } from './Components/register/register.component';
import { NavbarComponent } from './Components/navbar/navbar.component';
import { NotfoundComponent } from './Components/notfound/notfound.component';
import { ReactiveFormsModule  , FormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { GamesComponent } from './Components/games/games.component';
import { GameDetailsComponent } from './Components/game-details/game-details.component';
import {LocationStrategy, HashLocationStrategy} from '@angular/common';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    NavbarComponent,
    NotfoundComponent,
    GamesComponent,
    GameDetailsComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, ReactiveFormsModule, HttpClientModule, FormsModule],
  providers: [  {provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent],
})
export class AppModule {}
