import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddnewclientComponent } from '@clients/components/add-new-client/add-new-client.component';
import { ClientsComponent } from '@clients/pages/clients/clients.component';
import { OverviewComponent } from 'src/app/modules/Dashboard/pages/overview/overview.component';
import { AddproductComponent } from '@products/add-product/add-product.component';
import { ProductsComponent } from '@products/products.component';
import { AllsalesComponent } from '@sales/all-sales/all-sales.component';
import { NewquicksaleComponent } from '@sales/new-quick-sale/new-quick-sale.component';
import { NewSaleComponent } from '@sales/new-sale/new-sale.component';
import { DetailsComponent } from '@sales/quick-sale/details/details.component';
import { QuicksaleComponent } from '@sales/quick-sale/quick-sale.component';
import { SaleComponent } from '@sales/sale/sale.component';
import { SalesComponent } from '@sales/sales.component';
import { PaginationPipe } from 'src/app/Shared/Pipes/pagination.pipe';
import { PaginationComponent } from 'src/app/Shared/Components/pagination/pagination.component';
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
