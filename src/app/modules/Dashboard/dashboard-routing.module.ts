import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientsComponent } from '@clients/pages/clients/clients.component';
import { OverviewComponent } from '@overview/pages/overview/overview.component';
import { ProductsComponent } from '@products/pages/products/products.component';
import { AllsalesComponent } from '@sales/all-sales/pages/all-sales/all-sales.component';
import { NewquicksaleComponent } from '@sales/new-quick-sale/pages/new-quick-sale/new-quick-sale.component';
import { NewSaleComponent } from '@sales/new-sale/pages/new-sale/new-sale.component';
import { DetailsComponent } from '@sales/quick-sale-details/pages/quick-sale-details/quick-sale-details.component';
import { QuicksaleComponent } from '@sales/quick-sale/pages/quick-sales/quick-sales.component';
import { SaleComponent } from '@sales/sales-details/pages/sales-details/sale-details.component';
import { SalesComponent } from '@sales/sales-navigation/components/sales-navigation/sales.component';
import { DashboardGuard } from 'src/app/Core/Authentication/Guards/dashboard.guard';
import { RootComponent } from 'src/app/modules/Dashboard/dashboard-navigation/components/dashboard-navigation.component';

const routes: Routes = [
  {
    path: '',
    component: RootComponent,
    canActivateChild:[DashboardGuard],
    children: [
      {
        path: '',
        redirectTo: 'overview',
        pathMatch: 'full',
      },
      {
        path:'overview',
        component:OverviewComponent,
        
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
        
        children:[
                    {
                        path:'',
                        redirectTo:'allsales',
                        pathMatch:'full'
                    },
                    {
                      path:'allsales',
                      component:AllsalesComponent
                    },
                    {
                      path:'quick-sales',
                      component:QuicksaleComponent
                    },
                    {
                      path:'newsale',
                      component:NewSaleComponent
                    },
                    {
                      path:'newquicksale',
                      component:NewquicksaleComponent
                    },
                    {
                      path:'allsales/:id',
                      component:SaleComponent
                    },
                    {
                      path:'quick-sales/:id',
                      component:DetailsComponent
                    }
                  ]
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers:[DashboardGuard]
})
export class DashboardRoutingModule {}
