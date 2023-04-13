import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientsComponent } from '@clients/pages/clients/clients.component';
import { OverviewComponent } from 'src/app/modules/Dashboard/pages/overview/overview.component';
import { ProductsComponent } from '@products/products.component';
import { AllsalesComponent } from '@sales/all-sales/all-sales.component';
import { NewquicksaleComponent } from '@sales/new-quick-sale/new-quick-sale.component';
import { NewSaleComponent } from '@sales/new-sale/new-sale.component';
import { DetailsComponent } from '@sales/quick-sale/details/details.component';
import { QuicksaleComponent } from '@sales/quick-sale/quick-sale.component';
import { SaleComponent } from '@sales/sale/sale.component';
import { SalesComponent } from '@sales/sales.component';
import { DashboardGuard } from 'src/app/Core/Authentication/Guards/dashboard.guard';
import { RootComponent } from 'src/app/authentication/dashboard2/dashboard/root/root.component';

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
