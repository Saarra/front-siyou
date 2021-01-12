import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SuperadminPageComponent } from './pages/superadmin-page/superadmin-page.component';
import { SuperadminOverviewComponent } from './components/superadmin-overview/superadmin-overview.component';
import { CommissionListComponent } from './components/commission-list/commission-list.component';
import { DepositComponent } from './components/deposit/deposit.component';
import { VerifiedAccountsComponent } from './components/verified-accounts/verified-accounts.component';
import { AccountsListComponent } from './components/accounts-list/accounts-list.component';
import { CommissionsComponent } from './components/commissions/commissions.component';
import { InvalidAccountsComponent } from './components/invalid-accounts/invalid-accounts.component';
import { AddSupplierComponent } from './components/add-supplier/add-supplier.component';
// import { AddSalesManagerComponent } from '../dashboard/modals/sales-manager/add-sales-manager/add-sales-manager.component';
import { AddShopOwnerComponent } from './components/add-shop-owner/add-shop-owner.component';
import { AddSalesmanagerComponent } from './components/add-salesmanager/add-salesmanager.component';
import { ValidAccountsComponent } from './valid-accounts/valid-accounts.component';
import { AffectCommissionComponent } from './components/affect-commission/affect-commission.component';
import { BrandsManagementComponent } from './components/brands-management/brands-management.component';
import { CategoryManagementComponent } from './components/category-management/category-management.component';
import { ProductCriteriaManagementComponent } from './components/product-criteria-management/product-criteria-management.component';
import { CriteriaManagementComponent } from './components/criteria-management/criteria-management.component';
import { CriteriaToCategoryComponent } from './components/criteria-to-category/criteria-to-category.component';
import { SignupShopOwnerComponent } from './components/signup-shop-owner/signup-shop-owner.component';
import { LicenseManagementComponent } from './components/license-management/license-management.component';
import { AdsComponent } from './components/ads/ads.component';
import { SuppliersManagementComponent } from './components/suppliers-management/suppliers-management.component';
import { ShopSuppliersComponent } from './components/suppliers-management/shop-suppliers/shop-suppliers.component';
import { AddSupplierSystemComponent } from './components/suppliers-management/add-supplier-system/add-supplier-system.component';
import { EditLicenceComponent } from './components/license-management/edit-licence/edit-licence.component';


const routes: Routes = [
  {
    path: '',
    component: SuperadminPageComponent,
    children: [
      {
        path: '',
        redirectTo: 'overview',
        pathMatch: 'full'
      },
      {
        path: 'overview',
        component: SuperadminOverviewComponent
      },
      {
        path: 'commissions-list',
        component: CommissionListComponent
      },
      {
        path: 'deposit',
        component: DepositComponent
      },
      {
        path: 'verified-accounts',
        component: VerifiedAccountsComponent
      },
      {
        path: 'accounts-list',
        component: AccountsListComponent
      },
      {
        path:'commissions',
        component: CommissionsComponent
      },
      {
        path:'invalid-accounts',
        component: InvalidAccountsComponent
      },
      {
        path:'add-supplier',
        component: AddSupplierComponent
      },
      {
        path:'add-salesmanager',
        component: AddSalesmanagerComponent
      },
      {
        path:'add-shop-owner',
        component: AddShopOwnerComponent
      },
      {
        path:'overview',
        component: SuperadminOverviewComponent
      },
      {
        path:'validated-accounts',
        component: ValidAccountsComponent
      },
      {
        path:'affect-commission',
        component: AffectCommissionComponent
      },
      {
        path:'advertisement',
        component: AdsComponent
      },
      
      {
        path:'brands',
        component: BrandsManagementComponent
      },
      {
        path: 'categories',
        component: CategoryManagementComponent
      },
      {
        path:'product-criteria',
        component: ProductCriteriaManagementComponent
      },
      {
        path:'criterias',
        component: CriteriaManagementComponent
      },
      {
        path:'criteria-to-categories',
        component: CriteriaToCategoryComponent
      },

      {
        path: 'signup-shop-owner',
        component: SignupShopOwnerComponent
      },
      {
        path: 'license-list',
        component: LicenseManagementComponent
      },
      {
        path: 'edit-license/:id',
        component: EditLicenceComponent
      },
      {
        path: 'suppliers',
        component: SuppliersManagementComponent
      },
      {
        path: 'shop-suppliers',
        component: ShopSuppliersComponent
      },
      {
        path: 'add-supplier-system',
        component: AddSupplierSystemComponent
      },
      
      
      
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SuperadminRoutingModule { }
