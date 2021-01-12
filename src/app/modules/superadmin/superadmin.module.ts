import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SuperadminRoutingModule } from './superadmin-routing.module';
import { SuperadminPageComponent } from './pages/superadmin-page/superadmin-page.component';
import { SuperadminOverviewComponent } from './components/superadmin-overview/superadmin-overview.component';
import { SuperAdminComponent } from 'src/app/core/layouts/super-admin/super-admin.component';
import { MatSidenavModule, MatToolbarModule, MatListModule, MatCheckboxModule,
  MatExpansionModule, MatTableModule, MatPaginatorModule, MatButtonModule, MatFormFieldModule, MatInputModule,
  MatCardModule, MatIconModule, MatIconRegistry, MatSelectModule, MatOptionModule, MatTooltipModule, MatMenuModule, MatDialogModule, MatProgressSpinnerModule, MatSortModule, MatSnackBarModule, MatDatepickerModule} from '@angular/material';
import { SharedModule } from 'src/app/shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgxPopperModule } from 'ngx-popper';
import { ChartsModule } from 'ng2-charts';
import { MdcImageListModule } from '@angular-mdc/web';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { Ng5SliderModule } from 'ng5-slider';
import { NavService } from 'src/app/core/services/nav.service';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/compiler/src/core';
import { DomSanitizer } from '@angular/platform-browser';
import { AccountsListComponent } from './components/accounts-list/accounts-list.component';
import { VerifiedAccountsComponent } from './components/verified-accounts/verified-accounts.component';
import { CommissionListComponent } from './components/commission-list/commission-list.component';
import { DepositComponent } from './components/deposit/deposit.component';
import { CommissionsComponent } from './components/commissions/commissions.component';
import { InvalidAccountsComponent } from './components/invalid-accounts/invalid-accounts.component';

import { MatBadgeModule } from "@angular/material/badge";
import { AddSupplierComponent } from './components/add-supplier/add-supplier.component';
import { AddSalesmanagerComponent } from './components/add-salesmanager/add-salesmanager.component';
import { AddShopOwnerComponent } from './components/add-shop-owner/add-shop-owner.component';
import { ValidAccountsComponent } from './valid-accounts/valid-accounts.component';
import { AffectCommissionComponent } from './components/affect-commission/affect-commission.component';
import { AddCommissionPercentModalComponent } from './components/modals/add-commission-percent-modal/add-commission-percent-modal.component';
import { UpdateCommissionPercentModalComponent } from './components/modals/update-commission-percent-modal/update-commission-percent-modal.component';
import { BrandsManagementComponent } from './components/brands-management/brands-management.component';
import { CategoryManagementComponent } from './components/category-management/category-management.component';
import { ProductCriteriaManagementComponent } from './components/product-criteria-management/product-criteria-management.component';
import { AddBrandModalComponent } from './components/modals/add-brand-modal/add-brand-modal.component';
import { DeleteBrandModalComponent } from './components/modals/delete-brand-modal/delete-brand-modal.component';
import { EditBrandModalComponent } from './components/modals/edit-brand-modal/edit-brand-modal.component';
import { AddCategoryModalComponent } from './components/modals/category-modals/add-category-modal/add-category-modal.component';
import { EditCategoryModalComponent } from './components/modals/category-modals/edit-category-modal/edit-category-modal.component';
import { DeleteCategoryModalComponent } from './components/modals/category-modals/delete-category-modal/delete-category-modal.component';
import { CriteriaManagementComponent } from './components/criteria-management/criteria-management.component';
import { AddCriteriaComponent } from './components/modals/criteria-modals/add-criteria/add-criteria.component';
import { DeleteCriteriaComponent } from './components/modals/criteria-modals/delete-criteria/delete-criteria.component';
import { EditCriteriaComponent } from './components/modals/criteria-modals/edit-criteria/edit-criteria.component';
import { CriteriaToCategoryComponent } from './components/criteria-to-category/criteria-to-category.component';
import { AddUnitModalComponent } from './components/modals/unit-modals/add-unit-modal/add-unit-modal.component';
import { DeleteUnitModalComponent } from './components/modals/unit-modals/delete-unit-modal/delete-unit-modal.component';
import { EditUnitModalComponent } from './components/modals/unit-modals/edit-unit-modal/edit-unit-modal.component';
import { AddCriteriaToCategoryComponent } from './components/modals/category-criteria-modals/add-criteria-to-category/add-criteria-to-category.component';
import { RemoveCriteriaFromCategoryComponent } from './components/modals/category-criteria-modals/remove-criteria-from-category/remove-criteria-from-category.component';
import {MatRadioModule} from '@angular/material/radio';

import { AgmCoreModule } from '@agm/core';
import { SignupShopOwnerComponent } from './components/signup-shop-owner/signup-shop-owner.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';

import {MatTabsModule} from '@angular/material/tabs';
import { LicenseManagementComponent } from './components/license-management/license-management.component';
import { AdsComponent } from './components/ads/ads.component';
import { AdsImagesComponent } from './components/ads/ads-images/ads-images.component';
import { SuppliersManagementComponent } from './components/suppliers-management/suppliers-management.component';
import { ShopSuppliersComponent } from './components/suppliers-management/shop-suppliers/shop-suppliers.component';
import { AddSupplierSystemComponent } from './components/suppliers-management/add-supplier-system/add-supplier-system.component';
import { EditLicenceComponent } from './components/license-management/edit-licence/edit-licence.component';



@NgModule({
  declarations: [
    SuperAdminComponent,
    SuperadminPageComponent,
    SuperadminOverviewComponent,
    AccountsListComponent,
    VerifiedAccountsComponent,
    CommissionListComponent,
    DepositComponent,
    CommissionsComponent,
    InvalidAccountsComponent,
    AddSupplierComponent,
    AddSalesmanagerComponent,
    AddShopOwnerComponent,
    ValidAccountsComponent,
    AffectCommissionComponent,
    AddCommissionPercentModalComponent,
    UpdateCommissionPercentModalComponent,
    BrandsManagementComponent,
    CategoryManagementComponent,
    ProductCriteriaManagementComponent,
    AddBrandModalComponent,
    DeleteBrandModalComponent,
    EditBrandModalComponent,
    AddCategoryModalComponent,
    EditCategoryModalComponent,
    DeleteCategoryModalComponent,
    CriteriaManagementComponent,
    AddCriteriaComponent,
    DeleteCriteriaComponent,
    EditCriteriaComponent,
    CriteriaToCategoryComponent,
    AddUnitModalComponent,
    DeleteUnitModalComponent,
    EditUnitModalComponent,
    AddCriteriaToCategoryComponent,
    RemoveCriteriaFromCategoryComponent,
    SignupShopOwnerComponent,
    LicenseManagementComponent,
    AdsComponent,
    AdsImagesComponent,
    SuppliersManagementComponent,
    ShopSuppliersComponent,
    AddSupplierSystemComponent,
    EditLicenceComponent
  ],
  imports: [
    CommonModule,
    SuperadminRoutingModule,
    CommonModule,
    SharedModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPopperModule.forRoot(),
    MatButtonModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatTableModule,
    MatPaginatorModule,
    MatCheckboxModule,
    MatExpansionModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    FormsModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatSelectModule,
    MatOptionModule,
    ChartsModule,
    MatTooltipModule,
    MdcImageListModule,
    SlickCarouselModule,
    MatMenuModule,
    Ng5SliderModule,
    MatBadgeModule,
    MatSortModule,
    MatSnackBarModule,
    MatRadioModule,
    MatDatepickerModule,
    TranslateModule,

    MatTabsModule,

    // AgmCoreModule.forRoot({
    //   apiKey: 'AIzaSyBxVogDZDIrjbDsGfdj0pSbKjxMs4XZFUw'
    // })
    AgmCoreModule
  ],
  exports: [
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,

  ],
  providers:[
    NavService,


  ],
  schemas: [
    // CUSTOM_ELEMENTS_SCHEMA
  ],
  entryComponents:[
    AddCommissionPercentModalComponent,
    UpdateCommissionPercentModalComponent,
    AddBrandModalComponent,
    DeleteBrandModalComponent,
    EditBrandModalComponent,
    AddCategoryModalComponent,
    EditCategoryModalComponent,
    DeleteCategoryModalComponent,
    AddCriteriaComponent,
    EditCriteriaComponent,
    DeleteCriteriaComponent,
    AddUnitModalComponent,
    EditUnitModalComponent,
    DeleteUnitModalComponent,
    AddCriteriaToCategoryComponent,
    RemoveCriteriaFromCategoryComponent,   
    AdsImagesComponent
  ]
})
export class SuperadminModule { 

  constructor(matIconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    matIconRegistry.addSvgIcon('siyou', sanitizer.bypassSecurityTrustResourceUrl('assets/svgs/siyou.svg'));
    matIconRegistry.addSvgIcon('products', sanitizer.bypassSecurityTrustResourceUrl('assets/svgs/products.svg'));
    matIconRegistry.addSvgIcon('orders', sanitizer.bypassSecurityTrustResourceUrl('assets/svgs/orders.svg'));
    matIconRegistry.addSvgIcon('catalogs', sanitizer.bypassSecurityTrustResourceUrl('assets/svgs/catalogs.svg'));
    matIconRegistry.addSvgIcon('warehouses', sanitizer.bypassSecurityTrustResourceUrl('assets/svgs/warehouse.svg'));
    matIconRegistry.addSvgIcon('funds', sanitizer.bypassSecurityTrustResourceUrl('assets/svgs/funds.svg'));
    matIconRegistry.addSvgIcon('logo_supplier', sanitizer.bypassSecurityTrustResourceUrl('assets/svgs/logo_supplier_large.svg'));
    matIconRegistry.addSvgIcon('noData', sanitizer.bypassSecurityTrustResourceUrl('assets/svgs/no_data.svg'));
    matIconRegistry.addSvgIcon('under_construction', sanitizer.bypassSecurityTrustResourceUrl('assets/svgs/under_construction.svg'));
    matIconRegistry.addSvgIcon('superadmin2', sanitizer.bypassSecurityTrustResourceUrl('assets/svgs/superadmin2.svg'));
    matIconRegistry.addSvgIcon('gear', sanitizer.bypassSecurityTrustResourceUrl('assets/svgs/gear.svg'));
    matIconRegistry.addSvgIcon('category', sanitizer.bypassSecurityTrustResourceUrl('assets/svgs/category.svg'));
    matIconRegistry.addSvgIcon('style', sanitizer.bypassSecurityTrustResourceUrl('assets/svgs/style.svg'));
    matIconRegistry.addSvgIcon('post_add', sanitizer.bypassSecurityTrustResourceUrl('assets/svgs/post_add.svg'));
    matIconRegistry.addSvgIcon('storage', sanitizer.bypassSecurityTrustResourceUrl('assets/svgs/storage.svg'));
    matIconRegistry.addSvgIcon('vote', sanitizer.bypassSecurityTrustResourceUrl('assets/svgs/vote.svg'));
    matIconRegistry.addSvgIcon('valid', sanitizer.bypassSecurityTrustResourceUrl('assets/svgs/valid.svg'));
    matIconRegistry.addSvgIcon('accounts', sanitizer.bypassSecurityTrustResourceUrl('assets/svgs/accounts.svg'));
    matIconRegistry.addSvgIcon('invalid', sanitizer.bypassSecurityTrustResourceUrl('assets/svgs/invalid.svg'));
    matIconRegistry.addSvgIcon('commission', sanitizer.bypassSecurityTrustResourceUrl('assets/svgs/commission.svg'));
    matIconRegistry.addSvgIcon('monetization', sanitizer.bypassSecurityTrustResourceUrl('assets/svgs/monetization.svg'));
    matIconRegistry.addSvgIcon('balance', sanitizer.bypassSecurityTrustResourceUrl('assets/svgs/balance.svg'));
    matIconRegistry.addSvgIcon('account_list', sanitizer.bypassSecurityTrustResourceUrl('assets/svgs/account_list.svg'));
    matIconRegistry.addSvgIcon('dashboard2', sanitizer.bypassSecurityTrustResourceUrl('assets/svgs/dashboard2.svg'));
    matIconRegistry.addSvgIcon('github', sanitizer.bypassSecurityTrustResourceUrl('assets/svgs/github.svg'));
  }
  
}
