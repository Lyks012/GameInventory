import { GamesService } from './../../services/games.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  categories;
  constructor(private router: Router, private gameService: GamesService) {}

  async ngOnInit() {
    (await this.gameService.getCategoriesWithGames()).subscribe((res) => {
      this.categories = res;
    });
  }

  deleteGame(gameId) {
    this.gameService.deleteGame(gameId).subscribe((res) => {
      console.log(res);
    });
    location.reload();
  }

  deleteCategory(categoryId: number) {
    this.gameService.deleteCategory(categoryId).subscribe((res) => {
      console.log(res);
    });
    location.reload();
  }

  editCategory(categoryId: number, categoryName: string) {
    this.router.navigateByUrl('/admin/edit-category', {
      state: { name: categoryName, id: categoryId },
    });
  }
  editGame(gameId: number, gameName: string) {
    this.router.navigateByUrl('/admin/edit-game', {
      state: { name: gameName, id: gameId },
    });
  }
  goTo(url: string) {
    this.router.navigateByUrl('/' + url);
  }
}
