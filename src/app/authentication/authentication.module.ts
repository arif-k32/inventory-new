import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaginationPipe } from '../services/pagination.pipe';
import { AuthenticationRoutingModule } from './authentication-routing.module';
import { AddnewclientComponent } from './dashboard2/dashboard/clients/addnewclient/addnewclient.component';
import { ClientsComponent } from './dashboard2/dashboard/clients/clients.component';
import { Dashboard2Component } from './dashboard2/dashboard/dashboard2.component';
import { PaginationComponent } from './dashboard2/dashboard/pagination/pagination.component';
import { AddproductComponent } from './dashboard2/dashboard/products/addproduct/addproduct.component';
import { ProductsComponent } from './dashboard2/dashboard/products/products.component';
import { SalesComponent } from './dashboard2/dashboard/sales/sales.component';
import { SaleComponent } from './dashboard2/dashboard/sales/sale/sale.component';
import { NewSaleComponent } from './dashboard2/dashboard/sales/new-sale/new-sale.component';

@NgModule({
  declarations: [
    Dashboard2Component,
    ClientsComponent,
    PaginationComponent,
    PaginationPipe,
    AddproductComponent,
    ProductsComponent,
    AddnewclientComponent,
    SalesComponent,
    SaleComponent,
    NewSaleComponent,
  ],
  imports: [
    CommonModule,
    AuthenticationRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class AuthenticationModule {}