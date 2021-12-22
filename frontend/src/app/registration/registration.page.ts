import { User } from './../services/user';
import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})
export class RegistrationPage implements OnInit {
  constructor(private router: Router, private authService: AuthService) {}

  register(form) {
    const user: User = {
      id: null,
      username: form.value.username,
      email: form.value.email,
      password: form.value.password,
      isAdmin: form.value.accountType == 'admin' ? true : false,
    };

    this.authService.register(user).subscribe((res) => {
      this.router.navigateByUrl('/login');
    });
  }
  ngOnInit() {}
}
