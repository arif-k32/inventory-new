import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardGuard } from '../services/dashboard.guard';
import { ClientsComponent } from './dashboard2/dashboard/clients/clients.component';
import { OverviewComponent } from './dashboard2/dashboard/overview/overview.component';
import { ProductsComponent } from './dashboard2/dashboard/products/products.component';
import { DetailsComponent } from './dashboard2/dashboard/sales/quicksale/details/details.component';
import { QuicksaleComponent } from './dashboard2/dashboard/sales/quicksale/quicksale.component';
import { RootComponent } from './dashboard2/dashboard/root/root.component';
import { AllsalesComponent } from './dashboard2/dashboard/sales/allsales/allsales.component';
import { NewSaleComponent } from './dashboard2/dashboard/sales/new-sale/new-sale.component';
import { NewquicksaleComponent } from './dashboard2/dashboard/sales/newquicksale/newquicksale.component';
import { SaleComponent } from './dashboard2/dashboard/sales/sale/sale.component';
import { SalesComponent } from './dashboard2/dashboard/sales/sales.component';

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
