import { Router } from '@angular/router';
import { GamesService } from './../../services/games.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.page.html',
  styleUrls: ['./edit-category.page.scss'],
})
export class EditCategoryPage implements OnInit {
  private previousInfos;
  constructor(private gamesService: GamesService, private router: Router) {
    this.previousInfos = this.router.getCurrentNavigation().extras.state;
  }

  ngOnInit() {}

  async editCategory(form) {
    const infos = { ...this.previousInfos, ...form.value };
    await this.gamesService
      .editCategory(infos)
      .toPromise()
      .then((res) => {});
    this.router
      .navigateByUrl('admin/home')
      .then(() => window.location.reload());
  }
}
