import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () =>
      import('./home/home.module').then((m) => m.HomePageModule),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'registration',
    loadChildren: () =>
      import('./registration/registration.module').then(
        (m) => m.RegistrationPageModule
      ),
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./login/login.module').then((m) => m.LoginPageModule),
  },
  {
    path: 'not-found',
    loadChildren: () =>
      import('./not-found/not-found.module').then((m) => m.NotFoundPageModule),
  },
  {
    path: 'user',
    loadChildren: () =>
      import('./user/user.module').then((m) => m.UserPageModule),
  },
  {
    path: 'user/',
    redirectTo: 'user',
    pathMatch: 'full',
  },
  {
    path: 'user/my-games/user',
    redirectTo: 'user',
    pathMatch: 'full',
  },
  {
    path: 'user/my-games/',
    redirectTo: 'user/my-games',
    pathMatch: 'full',
  },

  {
    path: 'admin/home',
    loadChildren: () =>
      import('./admin/home/home.module').then((m) => m.HomePageModule),
  },
  {
    path: 'admin/add-game',
    loadChildren: () =>
      import('./admin/add-game/add-game.module').then(
        (m) => m.AddGamePageModule
      ),
  },
  {
    path: 'admin/add-category',
    loadChildren: () =>
      import('./admin/add-category/add-category.module').then(
        (m) => m.AddCategoryPageModule
      ),
  },
  {
    path: 'admin/edit-category',
    loadChildren: () =>
      import('./admin/edit-category/edit-category.module').then(
        (m) => m.EditCategoryPageModule
      ),
  },
  {
    path: 'admin/edit-game',
    loadChildren: () =>
      import('./admin/edit-game/edit-game.module').then(
        (m) => m.EditGamePageModule
      ),
  },
  {
    path: 'user/my-games',
    loadChildren: () =>
      import('./my-games/my-games.module').then((m) => m.MyGamesPageModule),
  },
  {
    path: 'edit-game',
    loadChildren: () =>
      import('./admin/edit-game/edit-game.module').then(
        (m) => m.EditGamePageModule
      ),
  },
  {
    path: 'edit-category',
    loadChildren: () =>
      import('./admin/edit-category/edit-category.module').then(
        (m) => m.EditCategoryPageModule
      ),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
