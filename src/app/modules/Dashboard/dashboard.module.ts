import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';


import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/Shared/shared.module';
import { AddnewclientComponent } from '@clients/components/add-new-client/add-new-client.component';
import { ClientsComponent } from '@clients/pages/clients/clients.component';
import { RootComponent } from 'src/app/modules/Dashboard/dashboard-navigation/components/dashboard-navigation.component';
import { OverviewComponent } from '@overview/pages/overview/overview.component';
import { AddproductComponent } from '@products/components/add-product/add-product.component';
import { ProductsComponent } from '@products/pages/products/products.component';
import { AllsalesComponent } from '@sales/all-sales/pages/all-sales/all-sales.component';
import { NewquicksaleComponent } from '@sales/new-quick-sale/pages/new-quick-sale/new-quick-sale.component';
import { NewSaleComponent } from '@sales/new-sale/pages/new-sale/new-sale.component';
import { DetailsComponent } from '@sales/quick-sale-details/pages/quick-sale-details/quick-sale-details.component';
import { QuicksaleComponent } from '@sales/quick-sale/pages/quick-sales/quick-sales.component';
import { SaleComponent } from '@sales/sales-details/pages/sales-details/sale-details.component';
import { SalesComponent } from '@sales/sales-navigation/components/sales-navigation/sales.component';
import { DashboardRoutingModule } from './dashboard-routing.module';

@NgModule({
  declarations: [
    ClientsComponent,
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
    SharedModule,
  ],
})
export class DashboardModule {}
