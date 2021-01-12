import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardShopS2cComponent } from './pages/dashboard-shop-s2c/dashboard-shop-s2c.component';

import { ShopS2cOverviewComponent } from './components/shop-s2c-overview/shop-s2c-overview.component';


const routes: Routes = [

  {
    path: '',
    component: DashboardShopS2cComponent,
    children: [
      {
        path: '',
        redirectTo: 'shop-s2c-overview',
        pathMatch: 'full'
      },
      {
        path: 'shop-s2c-overview',
        component: ShopS2cOverviewComponent
      },
     
     
      
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardShopS2cRoutingModule { }
