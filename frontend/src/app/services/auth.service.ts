import { User } from './user';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { pipe } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  SERVER_ADDRESS: string = 'http://localhost:3000';

  constructor(private httpClient: HttpClient, private storage: Storage) {}

  register(user: User) {
    return this.httpClient.post(`${this.SERVER_ADDRESS}/api/users`, user);
  }

  async login(credentials: { email: string; password: string }) {
    return await this.httpClient
      .post(`${this.SERVER_ADDRESS}/api/users/signin`, credentials)
      .pipe(
        tap(async (res) => {
          if (res) {
            console.log(res);
            await this.storage.set('id', res['userData']['id']);
          }
        })
      );
  }
}
