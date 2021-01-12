import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { DashboardLayoutComponent } from 'src/app/core/layouts/dashboard-layout/dashboard-layout.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import {
  MatSidenavModule, MatToolbarModule, MatListModule, MatCheckboxModule,
  MatExpansionModule, MatTableModule, MatPaginatorModule, MatButtonModule, MatFormFieldModule, MatInputModule,
  MatCardModule, MatIconModule, MatIconRegistry, MatSelectModule, MatOptionModule, MatTooltipModule, MatMenuModule, MatTabsModule
} from '@angular/material';
import { ProductsComponent } from './components/products/products.component';
import { MatDialogModule } from '@angular/material/dialog';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { NgxPopperModule } from 'ngx-popper';
import { ProductsService } from 'src/app/shared/services/products.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddProductComponent } from './modals/add-product/add-product.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { DomSanitizer } from '@angular/platform-browser';
import { OverviewComponent } from './components/overview/overview.component';
import { ChartsModule } from 'ng2-charts';
import { MdcImageListModule } from '@angular-mdc/web';
import { CategoriesService } from 'src/app/shared/services/categories.service';
import { CategoryDetailsComponent } from './modals/category-details/category-details.component';
import { NavService } from 'src/app/core/services/nav.service';
import { CatalogsComponent } from './components/catalogs/catalogs.component';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { SalesmanagerComponent } from './components/salesmanager/salesmanager.component';
import { AddSalesManagerComponent } from './modals/sales-manager/add-sales-manager/add-sales-manager.component';
import { SupplierService } from 'src/app/shared/services/supplier.service';
import { ProductManagementComponent } from './components/product-management/product-management.component';
import { Ng5SliderModule } from 'ng5-slider';
import { SharedModule } from 'src/app/shared/shared.module';
import { OrdersComponent } from './components/orders/orders.component';
import { AffectSalesManagerComponent } from './modals/sales-manager/affect-sales-manager/affect-sales-manager.component';
import { EditSalesManagerComponent } from './modals/sales-manager/edit-sales-manager/edit-sales-manager.component';
import { AddProductManagementComponent } from './components/add-product-management/add-product-management.component';
import { AddProductManagementModalComponent } from './modals/add-product-management-modal/add-product-management-modal.component';
import { BrandsService } from 'src/app/shared/services/brands.service';
import { ColorPickerModule } from 'ngx-color-picker';
import { DragDropDirective } from './directives/drag-drop.directive';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { NotificationComponent } from './components/notification/notification.component';
import { MatDividerModule } from '@angular/material/divider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ProductItemDetailsComponent } from './modals/product-item-details/product-item-details.component';
import { SupplierAccountManagementComponent } from './components/supplier-account-management/supplier-account-management.component';
import { InvalidOrdersComponent } from './components/orders/invalid-orders/invalid-orders.component';
import { ValidOrdersComponent } from './components/orders/valid-orders/valid-orders.component';
import { PaidOrdersComponent } from './components/orders/paid-orders/paid-orders.component';
import { OrderFullDetailsComponent } from './components/orders/order-full-details/order-full-details.component';
import { ProductsListComponent } from './components/product-management/products-list/products-list.component';
import { ProductDetailsComponent } from './components/product-management/product-details/product-details.component';
import { DeleteProductComponent } from './components/product-management/modals/delete-product/delete-product.component';
import { DeleteProductItemComponent } from './components/product-management/modals/delete-product-item/delete-product-item.component';
import { DiscountsComponent } from './components/discounts/discounts.component';
import { WarehousesComponent } from './components/warehouses/warehouses.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material';
import { DiscountsListComponent } from './components/discounts/discounts-list/discounts-list.component';
import { DatePipe } from '@angular/common';
import { ShopCommissionsComponent } from './components/commissions/shop-commissions/shop-commissions.component';
import { ProductsCommissionsComponent } from './components/commissions/products-commissions/products-commissions.component';
import { MatChipsModule } from '@angular/material/chips';
import { TranslateModule } from '@ngx-translate/core';
import { GoogleChartsModule } from 'angular-google-charts';
import { UpdateProductComponent } from './components/product-management/modals/update-product/update-product.component';
import { AddProductsCommissionComponent } from './components/commissions/add-products-commission/add-products-commission.component';
import { AddShopCommissionComponent } from './components/commissions/add-shop-commission/add-shop-commission.component';
import { UpdateProductItemComponent } from './components/product-management/update-product-item/update-product-item.component';
import { B2bPurchasedFundsComponent } from './components/funds/b2b-purchased-funds/b2b-purchased-funds.component';
import { B2bPaymentMethodsComponent } from './components/funds/b2b-payment-methods/b2b-payment-methods.component';
import { B2bSalesFundsComponent } from './components/funds/b2b-sales-funds/b2b-sales-funds.component';
import { B2bHomepageWarehouseComponent } from './components/warehouses/b2b-homepage-warehouse/b2b-homepage-warehouse.component';
import { B2bInventoryManagementComponent } from './components/warehouses/b2b-inventory-management/b2b-inventory-management.component';
import { B2bStockManagementComponent } from './components/warehouses/b2b-stock-management/b2b-stock-management.component';
import { B2bWarehouseManagementComponent } from './components/warehouses/b2b-warehouse-management/b2b-warehouse-management.component';
import { B2bAddPurchasedFundsComponent } from './components/funds/b2b-purchased-funds/b2b-add-purchased-funds/b2b-add-purchased-funds.component';
import { B2bEditPurchasedFundsComponent } from './components/funds/b2b-purchased-funds/b2b-edit-purchased-funds/b2b-edit-purchased-funds.component';
import { B2bEditPaymentMethodsComponent } from './components/funds/b2b-payment-methods/b2b-edit-payment-methods/b2b-edit-payment-methods.component';
import { B2bAddInventoryComponent } from './components/warehouses/b2b-inventory-management/b2b-add-inventory/b2b-add-inventory.component';
import { B2bPreOrderComponent } from './components/warehouses/b2b-inventory-management/b2b-pre-order/b2b-pre-order.component';
import { B2bAddWarehouseComponent } from './components/warehouses/b2b-warehouse-management/b2b-add-warehouse/b2b-add-warehouse.component';
import { AgmCoreModule } from '@agm/core';
import { B2bInventoryFullDetailsComponent } from './components/warehouses/b2b-inventory-management/b2b-inventory-full-details/b2b-inventory-full-details.component';
import { B2bEditWarehouseComponent } from './components/warehouses/b2b-warehouse-management/b2b-edit-warehouse/b2b-edit-warehouse.component';
import { B2bEditInventoryComponent } from './components/warehouses/b2b-inventory-management/b2b-edit-inventory/b2b-edit-inventory.component';
@NgModule({
  declarations: [
    DashboardLayoutComponent,
    DashboardComponent,
    ProductsComponent,
    AddProductComponent,
    OverviewComponent,
    CategoryDetailsComponent,
    CatalogsComponent,
    SalesmanagerComponent,
    AddSalesManagerComponent,
    ProductManagementComponent,
    OrdersComponent,
    AffectSalesManagerComponent,
    EditSalesManagerComponent,
    AddProductManagementComponent,
    AddProductManagementModalComponent,
    DragDropDirective,
    NotificationComponent,
    ProductItemDetailsComponent,
    SupplierAccountManagementComponent,
    InvalidOrdersComponent,
    ValidOrdersComponent,
    PaidOrdersComponent,
    OrderFullDetailsComponent,
    ProductsListComponent,
    ProductDetailsComponent,
    DeleteProductComponent,
    DeleteProductItemComponent,
    DiscountsComponent,
    WarehousesComponent,
    DiscountsListComponent,
    ShopCommissionsComponent,
    ProductsCommissionsComponent,
    UpdateProductComponent,
    AddProductsCommissionComponent,
    AddShopCommissionComponent,
    UpdateProductItemComponent,
    B2bPurchasedFundsComponent,
    B2bPaymentMethodsComponent,
    B2bSalesFundsComponent,
    B2bHomepageWarehouseComponent,
    B2bInventoryManagementComponent,
    B2bStockManagementComponent,
    B2bWarehouseManagementComponent,
    B2bAddPurchasedFundsComponent,
    B2bEditPurchasedFundsComponent,
    B2bEditPaymentMethodsComponent,
    B2bAddInventoryComponent,
    B2bPreOrderComponent,
    B2bAddWarehouseComponent,
    B2bInventoryFullDetailsComponent,
    B2bEditWarehouseComponent,
    B2bEditInventoryComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    DashboardRoutingModule,
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
    MatChipsModule,
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
    MatTabsModule,
    ColorPickerModule,
    NgxDropzoneModule,
    MatDividerModule,
    MatSlideToggleModule,
    ColorPickerModule,
    NgxDropzoneModule,
    MatDatepickerModule,
    MatNativeDateModule,
    TranslateModule,
    GoogleChartsModule.forRoot(),
    AgmCoreModule
  ],
  providers: [
    ProductsService,
    CategoriesService,
    NavService,
    SupplierService,
    BrandsService,
    DatePipe
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  entryComponents: [
    AddProductComponent,
    CategoryDetailsComponent,
    AddSalesManagerComponent,
    AffectSalesManagerComponent,
    EditSalesManagerComponent,
    AddProductManagementModalComponent,
    ProductItemDetailsComponent,
    DeleteProductComponent,
    DeleteProductItemComponent,
    B2bAddPurchasedFundsComponent,
    B2bPreOrderComponent
  ]
})
export class DashboardModule {
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
    matIconRegistry.addSvgIcon('assignement', sanitizer.bypassSecurityTrustResourceUrl('assets/svgs/assignement.svg'));
  }
}
