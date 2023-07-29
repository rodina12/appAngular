import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GamesService } from './../../Services/games.service';
declare var $: any;

@Component({
  selector: 'app-game-details',
  templateUrl: './game-details.component.html',
  styleUrls: ['./game-details.component.scss'],
})
export class GameDetailsComponent implements OnInit {
  id: any;
  game: any = {};
  loading = false;
  hideImage = false;
  'background-image' = '';
  constructor(
    private _ActivatedRoute: ActivatedRoute,
    private _GamesService: GamesService
  ) {
    this.loading = true;

    this.id = _ActivatedRoute.snapshot.paramMap.get('id');
    this._GamesService.getGameDetails(this.id).subscribe((data) => {
      this.game = data;
      // console.log(data);

      $(document).ready(() => {
        $('.owl-carousel').owlCarousel({
          items: 1,
          margin: 10,
          loop: true,
          dots: true,
          autoplay: true,
          autoplayTimeout: 2000,
          autoplayHoverPause: true,
        });
      });
      this.loading = false;
    });
  }

  hideGameImage() {
    this.hideImage = !this.hideImage;
  }


  ngOnInit(): void {}
}
