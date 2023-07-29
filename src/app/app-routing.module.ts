import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { GameDetailsComponent } from './Components/game-details/game-details.component';
import { GamesComponent } from './Components/games/games.component';
import { HomeComponent } from './Components/home/home.component';
import { LoginComponent } from './Components/login/login.component';
import { NotfoundComponent } from './Components/notfound/notfound.component';
import { RegisterComponent } from './Components/register/register.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'home' , canActivate:[AuthGuard] , component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'games/:gamesBy', canActivate:[AuthGuard], component: GamesComponent },
  { path: 'games/:gamesBy/:selected', canActivate:[AuthGuard], component: GamesComponent },
  { path: 'gameDetails/:id', canActivate:[AuthGuard], component: GameDetailsComponent },
  { path: '**', component: NotfoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
