import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  
  {
    path: 'login',
    loadChildren: () =>
      import('./login/login.module').then(
        (m) => m.LoginModule
      ),
  },
  {
    path: 'register',
    loadChildren: () =>
      import('./register/register.modulle').then(
        (m) => m.RegisterModule
      ),
  },
  
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./authentication/dashboard.module').then(
        (m) => m.DashboardModule
      ),
    
  },
  {
    path: '**',
    component: PagenotfoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
