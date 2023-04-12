import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaginationPipe } from '../services/pagination.pipe';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { AddnewclientComponent } from './dashboard2/dashboard/clients/addnewclient/addnewclient.component';
import { ClientsComponent } from './dashboard2/dashboard/clients/clients.component';
import { PaginationComponent } from './dashboard2/dashboard/pagination/pagination.component';
import { AddproductComponent } from './dashboard2/dashboard/products/addproduct/addproduct.component';
import { ProductsComponent } from './dashboard2/dashboard/products/products.component';
import { SalesComponent } from './dashboard2/dashboard/sales/sales.component';
import { SaleComponent } from './dashboard2/dashboard/sales/sale/sale.component';
import { NewSaleComponent } from './dashboard2/dashboard/sales/new-sale/new-sale.component';
import { OverviewComponent } from './dashboard2/dashboard/overview/overview.component';
import { QuicksaleComponent } from './dashboard2/dashboard/sales/quicksale/quicksale.component';
import { DetailsComponent } from './dashboard2/dashboard/sales/quicksale/details/details.component';
import { AllsalesComponent } from './dashboard2/dashboard/sales/allsales/allsales.component';
import { NewquicksaleComponent } from './dashboard2/dashboard/sales/newquicksale/newquicksale.component';
import { RootComponent } from './dashboard2/dashboard/root/root.component';

@NgModule({
  declarations: [
    ClientsComponent,
    PaginationComponent,
    PaginationPipe,
    AddproductComponent,
    ProductsComponent,
    AddnewclientComponent,
    SalesComponent,
    SaleComponent,
    NewSaleComponent,
    OverviewComponent,
    QuicksaleComponent,
    DetailsComponent,
    AllsalesComponent,
    NewquicksaleComponent,
    RootComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class DashboardModule {}
