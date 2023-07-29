import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { GamesService } from './../../Services/games.service';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss'],
})
export class GamesComponent implements OnInit {
  gamesNumber: number = 20;
  gamesBy: any;
  selected: any;
  gamesArray = [];
  showedGames = [];
  loading = false;
  x = new Array(8)
  constructor(
    private _ActivatedRoute: ActivatedRoute,
    private _GamesService: GamesService
  ) {
    this.getGames();
  }

  getGames() {
    this._ActivatedRoute.paramMap.subscribe((params) => {
      this.loading = true;
      this.gamesBy = params.get('gamesBy');
      this.selected = params.get('selected');

      if (this.gamesBy == 'Categories') {
        this._GamesService
          .getGamesByCategory(this.selected)
          .subscribe((data) => {
            this.gamesArray = data;
            this.showedGames = this.gamesArray.slice(0, 20);
            this.loading = false;
          });
      } else if (this.gamesBy == 'sort-by') {
        this._GamesService.getSortedGames(this.selected).subscribe((data) => {
          this.gamesArray = data;
          this.showedGames = this.gamesArray.slice(0, 20);
          this.loading = false;
        });
      } else if (this.gamesBy == 'Platforms') {
        this._GamesService
          .getGamesByPlatform(this.selected)
          .subscribe((data) => {
            this.gamesArray = data;
            this.showedGames = this.gamesArray.slice(0, 20);
            this.loading = false;
          });
      } else if (this.gamesBy == 'all') {
        this._GamesService.getAllGames().subscribe((data) => {
          this.gamesArray = data;
          this.showedGames = this.gamesArray.slice(0, 20);
          this.loading = false;
        });
      }
      
    });
  }

  seeMore() {
    this.gamesNumber += 20;
    this.showedGames = this.gamesArray.slice(0, this.gamesNumber);
  }

  ngOnInit(): void {}
}
