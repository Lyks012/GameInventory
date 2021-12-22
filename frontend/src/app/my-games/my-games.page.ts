import { GamesService } from './../services/games.service';
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-my-games',
  templateUrl: './my-games.page.html',
  styleUrls: ['./my-games.page.scss'],
})
export class MyGamesPage implements OnInit {
  myGames;
  constructor(private gamesService: GamesService) {}

  async ngOnInit() {
    (await this.gamesService.getUserGames()).subscribe((res) => {
      this.myGames = res['myGames'];
    });
  }

  async delete(gameId) {
    (await this.gamesService.deleteGameFromUserGames(gameId)).subscribe(
      (res) => {
        console.log(res);
      }
    );
    location.reload();
  }
}
