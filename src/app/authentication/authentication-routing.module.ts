import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientsComponent } from './dashboard2/dashboard/clients/clients.component';
import { Dashboard2Component } from './dashboard2/dashboard/dashboard2.component';
import { ProductsComponent } from './dashboard2/dashboard/products/products.component';
import { NewSaleComponent } from './dashboard2/dashboard/sales/new-sale/new-sale.component';
import { SaleComponent } from './dashboard2/dashboard/sales/sale/sale.component';
import { SalesComponent } from './dashboard2/dashboard/sales/sales.component';

const routes: Routes = [
  {
    path: '',
    component: Dashboard2Component,
    children: [
      {
        path: '',
        redirectTo: 'products',
        pathMatch: 'full',
      },

      {
        path: 'products',
        component: ProductsComponent,
      },
      {
        path: 'clients',
        component: ClientsComponent,
      },
      {
        path:'sales',
        component:SalesComponent,
      },
      {
        path:'sale/:id',
        component:SaleComponent
      },
      {
        path:'newsale',
        component:NewSaleComponent
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthenticationRoutingModule {}
