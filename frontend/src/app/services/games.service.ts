import { tap } from 'rxjs/operators';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root',
})
export class GamesService {
  private url: string = 'http://localhost:3000';
  constructor(private httpClient: HttpClient, private storage: Storage) {}

  getAllGames() {
    return this.httpClient.get(this.url + '/api/games');
  }

  getCategoriesWithGames() {
    return this.httpClient.get(this.url + '/api/category/withGames');
  }

  getCategories() {}

  createGame(game: { name; price; category }) {
    return this.httpClient.post(this.url + '/api/games', game).pipe(
      tap(async (res) => {
        console.log(res);
      })
    );
  }
  createCategory(category: { name }) {
    return this.httpClient.post(this.url + '/api/category', category);
  }

  editCategory(previousInfos) {
    return this.httpClient.put(this.url + '/api/category', previousInfos);
  }

  editGame(game) {
    console.log(game);
    return this.httpClient.put(this.url + '/api/games', game);
  }

  deleteCategory(categoryId: number) {
    return this.httpClient.delete(this.url + '/api/category/' + categoryId);
  }

  deleteGame(gameId: number) {
    return this.httpClient.delete(this.url + '/api/games/' + gameId);
  }

  async addGameToUser(gameId) {
    let userId: number;
    await this.storage.get('id').then((result) => (userId = result));

    const gameAndUser = { gameId: gameId, userId: userId };

    return this.httpClient.post(
      this.url + '/api/users/:' + gameAndUser.gameId,
      gameAndUser
    );
  }

  async countMyGames() {
    let userId: number;
    await this.storage.get('id').then((result) => (userId = result));

    let params = new HttpParams().set('userId', userId);
    return this.httpClient.get(this.url + '/api/users/countMyGames', {
      params: params,
    });
  }

  async getUserGames() {
    let userId: number;
    await this.storage.get('id').then((result) => (userId = result));
    let params = new HttpParams().set('userId', userId);

    return this.httpClient.get(this.url + '/api/users/getMyGames', {
      params: params,
    });
  }

  async deleteGameFromUserGames(gameId) {
    let userId: number;
    await this.storage.get('id').then((result) => (userId = result));

    let params = new HttpParams().set('userId', userId).set('gameId', gameId);

    return this.httpClient.delete(this.url + '/api/users/removeAGame', {
      params: params,
    });
  }
}
