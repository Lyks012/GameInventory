import { Router } from '@angular/router';
import { GamesService } from './../../services/games.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.page.html',
  styleUrls: ['./add-category.page.scss'],
})
export class AddCategoryPage implements OnInit {
  constructor(private gamesService: GamesService, private router: Router) {}

  ngOnInit() {}

  addCategory(myForm) {
    this.gamesService
      .createCategory(myForm.value)
      .subscribe((res) => console.log(res));

    this.router.navigateByUrl('admin/home').then(() => {
      window.location.reload();
    });
  }
}
