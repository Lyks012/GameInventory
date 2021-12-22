import { Router } from '@angular/router';
import { GamesService } from './../../services/games.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-game',
  templateUrl: './add-game.page.html',
  styleUrls: ['./add-game.page.scss'],
})
export class AddGamePage implements OnInit {
  public categories;

  constructor(private gameService: GamesService, private router: Router) {}

  ngOnInit() {
    this.gameService.getCategoriesWithGames().subscribe((res) => {
      this.categories = res;
    });
  }

  addGame(form) {
    const game = {
      name: form.value.name,
      price: form.value.price,
      category: form.value.category_id,
    };

    this.gameService
      .createGame(game)
      .subscribe((res) =>
        this.router
          .navigateByUrl('admin/home')
          .then(() => window.location.reload())
      );
  }
}
