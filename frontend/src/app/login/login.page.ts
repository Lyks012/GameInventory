import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  constructor(private authService: AuthService, private route: Router) {}

  ngOnInit() {}

  async login(form) {
    let correctCredentials: any;
    const credentials = {
      email: form.value.email,
      password: form.value.password,
    };
    correctCredentials = await this.authService.login(credentials);
    correctCredentials.subscribe(
      (res) => {
        if (res['userData'].isAdmin) this.route.navigateByUrl('/admin/home');
        else this.route.navigateByUrl('/user');
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
