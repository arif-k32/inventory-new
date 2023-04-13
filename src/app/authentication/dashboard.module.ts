import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddnewclientComponent } from '@clients/addnewclient/addnewclient.component';
import { ClientsComponent } from '@clients/clients.component';
import { OverviewComponent } from '@overview/overview.component';
import { AddproductComponent } from '@products/addproduct/addproduct.component';
import { ProductsComponent } from '@products/products.component';
import { AllsalesComponent } from '@sales/allsales/allsales.component';
import { NewSaleComponent } from '@sales/new-sale/new-sale.component';
import { NewquicksaleComponent } from '@sales/newquicksale/newquicksale.component';
import { DetailsComponent } from '@sales/quicksale/details/details.component';
import { QuicksaleComponent } from '@sales/quicksale/quicksale.component';
import { SaleComponent } from '@sales/sale/sale.component';
import { SalesComponent } from '@sales/sales.component';
import { PaginationPipe } from '@services/pagination.pipe';
import { PaginationComponent } from 'src/app/authentication/dashboard2/dashboard/pagination/pagination.component';
import { RootComponent } from 'src/app/authentication/dashboard2/dashboard/root/root.component';
import { DashboardRoutingModule } from './dashboard-routing.module';

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
