import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  
  {
    path: 'login',
    loadChildren: () =>
      import('./modules/Authentication/login/login.module').then(
        (m) => m.LoginModule
      ),
  },
  {
    path: 'register',
    loadChildren: () =>
      import('./modules/Authentication/register/register.module').then(
        (m) => m.RegisterModule
      ),
  },
  
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./modules/Dashboard/dashboard.module').then(
        (m) => m.DashboardModule
      ),
    
  },
  {
    path: '**',
    loadChildren: () =>
      import('./modules/Error/page-not-found/page-not-found.module').then(
        (m) => m.PageNotFoundModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
