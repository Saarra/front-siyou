import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ShopAddFundComponent } from './components/funds-management/purchased-funds/shop-add-fund/shop-add-fund.component';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { DashboardShopRoutingModule } from './dashboard-shop-routing.module';
import { ShopOverviewComponent } from './components/shop-overview/shop-overview.component';
import { DashboardShopComponent } from './pages/dashboard-shop/dashboard-shop.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry, MatSlideToggleModule, MatToolbarModule, MatSidenavModule, MatListModule, MatIconModule, MatButtonModule, MatTableModule, MatPaginatorModule, MatCheckboxModule, MatExpansionModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatCardModule, MatProgressSpinnerModule, MatSelectModule, MatOptionModule, MatGridListModule, MatTooltipModule, MatMenuModule, MatSnackBarModule, MatBadgeModule, MatTabsModule, MatDatepickerModule } from '@angular/material';
import { DashboardShopLayoutComponent } from 'src/app/core/layouts/dashboard-shop-layout/dashboard-shop-layout.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPopperModule } from 'ngx-popper';
import { ChartsModule } from 'ng2-charts'
import { MatSortModule } from '@angular/material/sort';
import { MdcImageListModule } from '@angular-mdc/web';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { ShopmanagerModalsComponent } from './modals/shopmanager-modals/shopmanager-modals.component';
import { AddShopmanagerComponent } from './modals/shopmanager-modals/add-shopmanager/add-shopmanager.component';
import { ProductsComponent } from './components/products/products.component';
import { BasketService } from 'src/app/core/services/basket.service';
import { BasketDetailsComponent } from './components/basket/basket-details/basket-details.component';
import { BasketWidgetComponent } from './components/basket/basket-widget/basket-widget.component';
import { ScrollingModule } from '@angular/cdk/scrolling';
import {DragDropModule} from '@angular/cdk/drag-drop';

import { SharedModule } from 'src/app/shared/shared.module';
import { OrderService } from 'src/app/core/services/order.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CompaniesService } from 'src/app/shared/services/companies.service';
import { FilterProductsComponent } from './modals/products/filter-products/filter-products.component';
import { DashboardShopS2cLayoutComponent } from 'src/app/core/layouts/dashboard-shop-s2c-layout/dashboard-shop-s2c-layout.component';
import { MembershipManagementComponent } from './components/membership-management/membership-management.component';
import { AddNewMemberComponent } from './components/add-new-member/add-new-member.component';
import { LevelManagementListComponent } from './components/level-management/level-management-list/level-management-list.component';
import { AddNewLevelComponent } from './components/level-management/add-new-level/add-new-level.component';
import { EditLevelComponent } from './components/level-management/edit-level/edit-level.component';
import { DeleteLevelComponent } from './components/level-management/delete-level/delete-level.component';
import { ShopProductListComponent } from './components/shop-product-management/shop-product-list/shop-product-list.component';
import { SuppliersListComponent } from './components/supplier-management/suppliers-list/suppliers-list.component';
import { SupplierFullDetailsComponent } from './components/supplier-management/supplier-full-details/supplier-full-details.component';
import { WishlistComponent } from './components/wishlist-management/wishlist/wishlist.component';
import { ProductDetailsS2cComponent } from './components/shop-product-management/product-details-s2c/product-details-s2c.component';
import { ShopPurshasedProductsComponent } from './components/shop-product-management/shop-purshased-products/shop-purshased-products.component';
import { ShopInvalidOrdersComponent } from './components/order-management/shop-invalid-orders/shop-invalid-orders.component';
import { ShopValidOrdersComponent } from './components/order-management/shop-valid-orders/shop-valid-orders.component';
import { ShopPaidOrdersComponent } from './components/order-management/shop-paid-orders/shop-paid-orders.component';
import { ShopOrderFullDetailsComponent } from './components/order-management/shop-order-full-details/shop-order-full-details.component';
import { ProductsListS2cComponent } from './components/shop-product-management/products-list-s2c/products-list-s2c.component';
import { CartPageComponent } from './components/basket-management/cart-page/cart-page.component';
import { CartModalComponent } from './components/basket-management/cart-modal/cart-modal.component';
import { CheckoutComponent } from './components/basket-management/checkout/checkout.component';
import { ShopAffectDiscountComponent } from './components/discounts-management/shop-affect-discount/shop-affect-discount.component';
import { CommingSoonComponent } from './components/comming-soon/comming-soon.component';
import { PreOrdersComponent } from './components/warehouse-management/pre-orders/pre-orders.component';
import { InventoryComponent } from './components/warehouses/inventory/inventory.component';
import { AddChainComponent } from './components/chain-management/add-chain/add-chain.component';
import { AddShopManagerComponent } from './components/shop-manager-management/add-shop-manager/add-shop-manager.component';
import { ShopManagersListComponent } from './components/shop-manager-management/shop-managers-list/shop-managers-list.component';
import { ChainsListComponent } from './components/chain-management/chains-list/chains-list.component';
import { ShopDiscountsListComponent } from './components/discounts-management/shop-discounts-list/shop-discounts-list.component';
// import { SharedModule } from 'src/app/shared/shared.module';
import { InventoryFullDetailsComponent } from './components/warehouses/inventory/inventory-full-details/inventory-full-details.component';
import { AddInventoryComponent } from './components/warehouses/inventory/add-inventory/add-inventory.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { UpdateChainAssignManagerComponent } from './components/chain-management/update-chain-assign-manager/update-chain-assign-manager.component';
import { AddChainAssignManagerComponent } from './components/chain-management/add-chain-assign-manager/add-chain-assign-manager.component';
import { AddShopProductComponent } from './components/shop-product-management/add-shop-product/add-shop-product.component';
import { StockManagementComponent } from './components/warehouses/stock-management/stock-management.component';
import { ShopEditProductComponent } from './components/shop-product-management/products-list-s2c/shop-edit-product/shop-edit-product.component'
import { MatRadioModule } from '@angular/material/radio';
import { InvalidMembersListComponent } from './components/membership-management/invalid-members-list/invalid-members-list.component';
import { MyAccountComponent } from './components/my-account-management/my-account/my-account.component';
import { ShopFundsCheckComponent } from './components/funds-management/shop-funds-check/shop-funds-check.component';
import { ShopFundsCardComponent } from './components/funds-management/shop-funds-card/shop-funds-card.component';
import { ShopFundsCashComponent } from './components/funds-management/shop-funds-cash/shop-funds-cash.component';
import { GenerateExcelBarcodeModalComponent } from './components/membership-management/generate-excel-barcode-modal/generate-excel-barcode-modal.component';
import { UseraccountComponent } from './components/my-account-management/useraccount/useraccount.component';
import { ValidateOrderModalComponent } from './components/order-management/validate-order-modal/validate-order-modal.component';
import { UpdateInventoryComponent } from './components/warehouses/inventory/update-inventory/update-inventory.component';
import { OrdersListCashRegisterComponent } from './components/order-management/orders-list-cash-register/orders-list-cash-register.component';
import { MatChipsModule } from '@angular/material/chips';
import { WarehouseComponent } from './components/warehouse-management/warehouse/warehouse.component';
import { AddSupplierComponent } from './components/supplier-management/add-supplier/add-supplier.component';
import { AgmCoreModule } from '@agm/core';
import { EditWarehouseComponent } from './components/warehouse-management/warehouse/edit-warehouse/edit-warehouse.component';
import { AddWarehouseComponent } from './components/warehouse-management/warehouse/add-warehouse/add-warehouse.component';
import { AddShopcachierComponent } from './components/shop-cachier-management/add-shop-cachier/add-shop-cachier.component';
import { ShopcachiersListComponent } from './components/shop-cachier-management/shop-cachiers-list/shop-cachiers-list.component';
import { NgApexchartsModule } from "ng-apexcharts";
import { WarehousesComponent } from './components/warehouses/warehouses.component';
import { AddCategoryComponent } from './components/shop-product-management/categories/add-category/add-category.component';
import { CategoriesComponent } from './components/shop-product-management/categories/categories.component';
import { ShopCategoriesListComponent } from './components/shop-product-management/categories/shop-categories-list/shop-categories-list.component';
import { PaymentMethodsComponent } from './components/funds-management/payment-methods/payment-methods.component';
import { PurchasedFundsComponent } from './components/funds-management/purchased-funds/purchased-funds.component';
import { ChooseCategoryComponent } from './components/shop-product-management/add-shop-product/choose-category/choose-category.component';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { ShopChooseSuppliersComponent } from './components/supplier-management/suppliers-list/shop-choose-suppliers/shop-choose-suppliers.component';
import { ShopEditFundComponent } from './components/funds-management/purchased-funds/shop-edit-fund/shop-edit-fund.component';
import { ShopEditPaymentMethodComponent } from './components/funds-management/payment-methods/shop-edit-payment-method/shop-edit-payment-method.component';
import { ShopEditMemberComponent } from './components/membership-management/shop-edit-member/shop-edit-member.component';
import { ShopAffectPromotionComponent } from './components/discounts-management/shop-affect-promotion/shop-affect-promotion.component';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { ShopEditDiscountComponent } from './components/discounts-management/shop-edit-discount/shop-edit-discount.component';
import { ShopEditManagerComponent } from './components/shop-manager-management/shop-edit-manager/shop-edit-manager.component';
import { EditShopCashierComponent } from './components/shop-cachier-management/edit-shop-cashier/edit-shop-cashier.component';
import { PagerService } from 'src/app/shared/services/pager.service';
import { ShopPromotionsListComponent } from './components/discounts-management/shop-promotions-list/shop-promotions-list.component';
import { EditChainComponent } from './components/chain-management/edit-chain/edit-chain.component';
import { HistoryDiscountsComponent } from './components/discounts-management/history-discounts/history-discounts.component';
import { OnlineProductsComponent } from './components/online/online-products/online-products.component';
import { ReturnedGoodsComponent } from './components/warehouse-management/returned-goods/returned-goods.component';
import { AddReturnedGoodsComponent } from './components/warehouse-management/returned-goods/add-returned-goods/add-returned-goods.component';
import { AdvertisementComponent } from './components/advertisement/advertisement.component';
import { ShopProductsStatisticsComponent } from './components/shop-overview/shop-products-statistics/shop-products-statistics.component';
import { ShopOrdersStatisticsComponent } from './components/shop-overview/shop-orders-statistics/shop-orders-statistics.component';
import { ShopSalesStatisticsComponent } from './components/shop-overview/shop-sales-statistics/shop-sales-statistics.component';
import { EditReturnedGoodsComponent } from './components/warehouse-management/returned-goods/edit-returned-goods/edit-returned-goods.component';
import { HistoryInventoryComponent } from './components/warehouses/inventory/history-inventory/history-inventory.component';
import { ExpiredProductsS2cComponent } from './components/shop-product-management/products-list-s2c/expired-products-s2c/expired-products-s2c.component';
import { WarningProductsS2cComponent } from './components/shop-product-management/products-list-s2c/warning-products-s2c/warning-products-s2c.component';
import { AddShopOperatorComponent } from './components/shop-operator-management/add-shop-operator/add-shop-operator/add-shop-operator.component';
import { ShopEditOperatorComponent } from './components/shop-operator-management/shop-edit-operator/shop-edit-operator.component';
import { ShopOperatorsListComponent } from './components/shop-operator-management/shop-operators-list/shop-operators-list.component';
import { EditSupplierComponent } from './components/supplier-management/suppliers-list/edit-supplier/edit-supplier.component';
import { ShopDiscountStatisticsComponent } from './components/shop-overview/shop-discount-statistics/shop-discount-statistics.component';
import { ShopFundsStatisticsComponent } from './components/shop-overview/shop-funds-statistics/shop-funds-statistics.component';
import { QuickPurchaseComponent } from './components/shop-product-management/quick-purchase/quick-purchase.component';
import { AddQuickPurchaseComponent } from './components/shop-product-management/quick-purchase/add-quick-purchase/add-quick-purchase.component';
import { MyCategoriesComponent } from './components/shop-product-management/categories/my-categories/my-categories.component';
import { DownloadQuickComponent } from './components/shop-product-management/quick-purchase/download-quick/download-quick.component';
import { ResizeColumnDirective } from './components/shop-product-management/products-list-s2c/resize-column.directive';
import { EditMyCategoryComponent } from './components/shop-product-management/categories/edit-my-category/edit-my-category.component';
import { HistoryPromotionComponent } from './components/discounts-management/history-promotion/history-promotion.component';
import { MySuppliersComponent } from './components/supplier-management/my-suppliers/my-suppliers.component';
import { AddPaymentMethodComponent } from './components/funds-management/payment-methods/add-payment-method/add-payment-method.component';
import { AdvertisementImagesComponent } from './components/advertisement/advertisement-images/advertisement-images.component';
import { AccessRightsComponent } from './components/shop-manager-management/access-rights/access-rights.component';
import { ChainManagersListComponent } from './components/chain-management/chain-managers-list/chain-managers-list.component'
//import { AddShopOperatorComponent } from './components/shop-operator-management/add-shop-operator/add-shop-operator.component'

@NgModule({
  declarations: [
    ShopEditProductComponent,
    ShopOverviewComponent,
    DashboardShopComponent,
    DashboardShopLayoutComponent,
    ProductsComponent,
    BasketDetailsComponent,
    BasketWidgetComponent,
    ShopmanagerModalsComponent,
    AddShopmanagerComponent,
    FilterProductsComponent,
    MembershipManagementComponent,
    AddNewMemberComponent,
    LevelManagementListComponent,
    AddNewLevelComponent,
    EditLevelComponent,
    DeleteLevelComponent,
    ShopProductListComponent,

    SuppliersListComponent,
    SupplierFullDetailsComponent,
    WishlistComponent,
    ProductDetailsS2cComponent,
    ShopPurshasedProductsComponent,
    ShopInvalidOrdersComponent,
    ShopValidOrdersComponent,
    ShopPaidOrdersComponent,
    ShopOrderFullDetailsComponent,
    ProductsListS2cComponent,
    CartPageComponent,
    CartModalComponent,
    CheckoutComponent,
    ShopAffectDiscountComponent,
    CommingSoonComponent,
    PreOrdersComponent,
    InventoryComponent,
    AddChainComponent,
    AddShopManagerComponent,
    ShopManagersListComponent,
    ChainsListComponent,
    ShopDiscountsListComponent,
    UpdateChainAssignManagerComponent,
    AddChainAssignManagerComponent,
    AddShopProductComponent,
    StockManagementComponent,
    InventoryFullDetailsComponent,
    InvalidMembersListComponent,
    MyAccountComponent,
    ShopFundsCheckComponent,
    ShopFundsCardComponent,
    ShopFundsCashComponent,
    GenerateExcelBarcodeModalComponent,
    AddInventoryComponent,
    UseraccountComponent,
    ValidateOrderModalComponent,
    UpdateInventoryComponent,
    OrdersListCashRegisterComponent,
    WarehouseComponent,
    AddSupplierComponent,
    EditWarehouseComponent,
    AddWarehouseComponent,
    AddShopcachierComponent,
    ShopcachiersListComponent,
    WarehousesComponent,
    AddCategoryComponent,
    CategoriesComponent,
    ShopCategoriesListComponent,
    PaymentMethodsComponent,
    PurchasedFundsComponent,
    ChooseCategoryComponent,
    ShopAddFundComponent,
    ShopChooseSuppliersComponent,
    ShopEditFundComponent,
    ShopEditPaymentMethodComponent,
    ShopEditMemberComponent,
    ShopAffectPromotionComponent,
    ShopEditDiscountComponent,
    ShopEditManagerComponent,
    EditShopCashierComponent,
    ShopPromotionsListComponent,
    EditChainComponent,
    HistoryDiscountsComponent,
    OnlineProductsComponent,
    ReturnedGoodsComponent,
    AddReturnedGoodsComponent,
    AdvertisementComponent,
    ShopProductsStatisticsComponent,
    ShopOrdersStatisticsComponent,
    ShopSalesStatisticsComponent,
    EditReturnedGoodsComponent,
    HistoryInventoryComponent,
    ExpiredProductsS2cComponent,
    WarningProductsS2cComponent,
    AddShopOperatorComponent,
    ShopEditOperatorComponent,
    ShopOperatorsListComponent,
    EditSupplierComponent,
    ShopDiscountStatisticsComponent,
    ShopFundsStatisticsComponent,
    QuickPurchaseComponent,
    AddQuickPurchaseComponent,
    MyCategoriesComponent,
    DownloadQuickComponent,
    ResizeColumnDirective,
    EditMyCategoryComponent,
    HistoryPromotionComponent,
    MySuppliersComponent,
    AddPaymentMethodComponent,
    AdvertisementImagesComponent,
    AccessRightsComponent,
    ChainManagersListComponent
    //AddShopOperatorComponent
  ],
  imports: [
    MatMomentDateModule,
    CommonModule,
    SharedModule,
    DashboardShopRoutingModule,
    MatSidenavModule,
    MatListModule,
    DragDropModule,
    MatIconModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPopperModule.forRoot(),
    MatButtonModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatTableModule,
    MatSlideToggleModule,
    MatPaginatorModule,
    MatAutocompleteModule,
    MatCheckboxModule,
    MatExpansionModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    NgxMatSelectSearchModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatOptionModule,
    MatChipsModule,
    ChartsModule,
    MdcImageListModule,
    SlickCarouselModule,
    MatGridListModule,
    MatTableModule,
    MatTooltipModule,
    MatMenuModule,
    MatSnackBarModule,
    ScrollingModule,
    MatBadgeModule,
    MatTabsModule,
    MatDatepickerModule,
    // ExperimentalScrollModule
    TranslateModule,
    AgmCoreModule,
    MatRadioModule,
    NgApexchartsModule,
    MatSortModule

  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  entryComponents: [
    FilterProductsComponent,
    DeleteLevelComponent,
    EditLevelComponent,
    CartModalComponent,
    AddChainAssignManagerComponent,
    UpdateChainAssignManagerComponent,
    GenerateExcelBarcodeModalComponent,
    ValidateOrderModalComponent,
    AddCategoryComponent,
    ChooseCategoryComponent,
    ShopAddFundComponent,
    ShopChooseSuppliersComponent,
    AddReturnedGoodsComponent,
    AddPaymentMethodComponent,
    AdvertisementImagesComponent,
    AccessRightsComponent,
    ChainManagersListComponent
  ],
  providers: [
    BasketService,
    CompaniesService,
    OrderService,
    DatePipe,
    PagerService,
    { provide: MAT_DIALOG_DATA, useValue: {} },
    { provide: MatDialogRef, useValue: {} }
  ],

})
export class DashboardShopModule {

  constructor(matIconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {


    matIconRegistry.addSvgIcon('siyou', sanitizer.bypassSecurityTrustResourceUrl('assets/svgs/siyou.svg'));
    matIconRegistry.addSvgIcon('products', sanitizer.bypassSecurityTrustResourceUrl('assets/svgs/products.svg'));
    matIconRegistry.addSvgIcon('orders', sanitizer.bypassSecurityTrustResourceUrl('assets/svgs/orders.svg'));
    matIconRegistry.addSvgIcon('catalogs', sanitizer.bypassSecurityTrustResourceUrl('assets/svgs/catalogs.svg'));
    matIconRegistry.addSvgIcon('warehouses', sanitizer.bypassSecurityTrustResourceUrl('assets/svgs/warehouse.svg'));
    matIconRegistry.addSvgIcon('funds', sanitizer.bypassSecurityTrustResourceUrl('assets/svgs/funds.svg'));
    matIconRegistry.addSvgIcon('logo_store', sanitizer.bypassSecurityTrustResourceUrl('assets/svgs/logo_store.svg'));
    matIconRegistry.addSvgIcon('minus', sanitizer.bypassSecurityTrustResourceUrl('assets/svgs/minus.svg'));
    matIconRegistry.addSvgIcon('noData', sanitizer.bypassSecurityTrustResourceUrl('assets/svgs/no_data.svg'));
    matIconRegistry.addSvgIcon('under_construction', sanitizer.bypassSecurityTrustResourceUrl('assets/svgs/under_construction.svg'));

  }

}
