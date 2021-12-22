import { Router } from '@angular/router';
import { GamesService } from './../services/games.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage implements OnInit {
  categories;
  constructor(private gameService: GamesService, private router: Router) {}

  goTo(url: string) {
    this.router.navigateByUrl(url);
  }

  async ngOnInit() {
    (await this.gameService.getCategoriesWithGames()).subscribe((res) => {
      this.categories = res;
      console.log(this.categories);
    });
  }

  async addToMyGames(gameId) {
    (await this.gameService.addGameToUser(gameId)).subscribe((res) => {
      console.log(res);
    });

    //popup successfull
  }
}
