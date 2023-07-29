import { Component, OnInit } from '@angular/core';
import { GamesService } from 'src/app/Services/games.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  popularityGames = []
  
  x = new Array(3)

  constructor(private _GamesService:GamesService, private _Router: Router, private _AuthService:AuthService) {
    this._GamesService.getSortedGames("popularity").subscribe((data)=>{
      this.popularityGames = data.slice(0,3)
    })


    this._AuthService.isTokenValid()

    
   }

   getGameDetails(gameID:number){
    console.log(gameID);
    this._GamesService.getGameDetails(gameID).subscribe((data)=>{
      console.log(data);
      
    })
    
   }

  ngOnInit(): void {
  }

  

}
