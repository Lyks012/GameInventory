import { Router } from '@angular/router';
import { GamesService } from './../../services/games.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-game',
  templateUrl: './edit-game.page.html',
  styleUrls: ['./edit-game.page.scss'],
})
export class EditGamePage implements OnInit {
  public categories;
  private previousInfos;
  constructor(private gamesService: GamesService, private router: Router) {
    this.previousInfos = this.router.getCurrentNavigation().extras.state;
  }

  ngOnInit() {
    this.gamesService.getCategoriesWithGames().subscribe((res) => {
      this.categories = res;
    });
  }

  async editGame(form) {
    const infos = { ...this.previousInfos, ...form.value };
    await this.gamesService
      .editGame(infos)
      .toPromise()
      .then((res) => {});
    this.router
      .navigateByUrl('admin/home')
      .then(() => window.location.reload());
  }
}
