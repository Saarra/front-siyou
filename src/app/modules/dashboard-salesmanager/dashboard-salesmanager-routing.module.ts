import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductsComponent } from './components/products/products.component';
import { DashboardSalesmanagerComponent } from './pages/dashboard-salesmanager/dashboard-salesmanager.component';
import { OrdersComponent } from './components/orders/orders.component';


const routes: Routes = [
  {
      path: '',
      component: DashboardSalesmanagerComponent,
      children: [
          {
              path: '',
              redirectTo: 'products',
              pathMatch: 'full'
          },
          {
              path: 'products',
              component: ProductsComponent
          },
          {
              path: 'orders',
              component: OrdersComponent
          }
         
      ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardSalesmanagerRoutingModule { }
