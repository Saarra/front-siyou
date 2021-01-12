import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SuperadminModule } from './modules/superadmin/superadmin.module';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./modules/login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'siyou',
    loadChildren: () => import('./modules/homepage/homepage.module').then(m => m.HomepageModule)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./modules/dashboard/dashboard.module').then(m => m.DashboardModule)
  },
  {
    path: 'shop',
    loadChildren: () => import('./modules/dashboard-shop/dashboard-shop.module').then(m => m.DashboardShopModule)
  },
  {
    path: 'salesmanager',
    loadChildren: () => import('./modules/dashboard-salesmanager/dashboard-salesmanager.module').then(m => m.DashboardSalesmanagerModule)
  },
  {
    path: 'superadmin',
    loadChildren: () => import('./modules/superadmin/superadmin.module').then(m => m.SuperadminModule)
  },
  {
    path: 'shop-s2c',
    loadChildren: () => import('./s2c-modules/dashboard-shop-s2c/dashboard-shop-s2c.module').then(m => m.DashboardShopS2cModule)
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes, {
    onSameUrlNavigation: 'reload'
  })],
  providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy }],
  exports: [RouterModule]
})
export class AppRoutingModule { }
