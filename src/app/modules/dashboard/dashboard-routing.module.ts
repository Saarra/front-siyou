import { NgModule, Component } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ProductsComponent } from "./components/products/products.component";
import { DashboardLayoutComponent } from "src/app/core/layouts/dashboard-layout/dashboard-layout.component";
import { OverviewComponent } from "./components/overview/overview.component";
import { SalesmanagerComponent } from "./components/salesmanager/salesmanager.component";
import { ProductManagementComponent } from "./components/product-management/product-management.component";
import { OrdersComponent } from "./components/orders/orders.component";
import { AddProductManagementComponent } from "./components/add-product-management/add-product-management.component";
import { SupplierAccountManagementComponent } from "./components/supplier-account-management/supplier-account-management.component";
import { ValidOrdersComponent } from "./components/orders/valid-orders/valid-orders.component";
import { InvalidOrdersComponent } from "./components/orders/invalid-orders/invalid-orders.component";
import { PaidOrdersComponent } from "./components/orders/paid-orders/paid-orders.component";
import { OrderFullDetailsComponent } from "./components/orders/order-full-details/order-full-details.component";
import { ProductsListComponent } from "./components/product-management/products-list/products-list.component";
import { ProductDetailsComponent } from "./components/product-management/product-details/product-details.component";
import { DiscountsComponent } from "./components/discounts/discounts.component";
import { DiscountsListComponent } from "./components/discounts/discounts-list/discounts-list.component";
import { ShopCommissionsComponent } from "./components/commissions/shop-commissions/shop-commissions.component";
import { ProductsCommissionsComponent } from "./components/commissions/products-commissions/products-commissions.component";
import { AddShopCommissionComponent } from "./components/commissions/add-shop-commission/add-shop-commission.component";
import { AddProductsCommissionComponent } from "./components/commissions/add-products-commission/add-products-commission.component";
import { UpdateProductItemComponent } from "./components/product-management/update-product-item/update-product-item.component";
import { B2bPurchasedFundsComponent } from "./components/funds/b2b-purchased-funds/b2b-purchased-funds.component";
import { B2bPaymentMethodsComponent } from "./components/funds/b2b-payment-methods/b2b-payment-methods.component";
import { B2bSalesFundsComponent } from "./components/funds/b2b-sales-funds/b2b-sales-funds.component";
import { B2bHomepageWarehouseComponent } from './components/warehouses/b2b-homepage-warehouse/b2b-homepage-warehouse.component';
import { B2bInventoryManagementComponent } from './components/warehouses/b2b-inventory-management/b2b-inventory-management.component';
import { B2bStockManagementComponent } from './components/warehouses/b2b-stock-management/b2b-stock-management.component';
import { B2bWarehouseManagementComponent } from './components/warehouses/b2b-warehouse-management/b2b-warehouse-management.component';
import { B2bEditPurchasedFundsComponent } from './components/funds/b2b-purchased-funds/b2b-edit-purchased-funds/b2b-edit-purchased-funds.component';
import { B2bEditPaymentMethodsComponent } from './components/funds/b2b-payment-methods/b2b-edit-payment-methods/b2b-edit-payment-methods.component';
import { B2bAddInventoryComponent } from './components/warehouses/b2b-inventory-management/b2b-add-inventory/b2b-add-inventory.component';
import { B2bAddWarehouseComponent } from './components/warehouses/b2b-warehouse-management/b2b-add-warehouse/b2b-add-warehouse.component';
import { B2bInventoryFullDetailsComponent } from './components/warehouses/b2b-inventory-management/b2b-inventory-full-details/b2b-inventory-full-details.component';
import { B2bEditWarehouseComponent } from './components/warehouses/b2b-warehouse-management/b2b-edit-warehouse/b2b-edit-warehouse.component';
import { B2bEditInventoryComponent } from './components/warehouses/b2b-inventory-management/b2b-edit-inventory/b2b-edit-inventory.component';
const routes: Routes = [
  {
    path: "",
    component: DashboardLayoutComponent,
    children: [
      {
        path: "",
        redirectTo: "products",
        pathMatch: "full",
      },
      {
        path: "products",
        component: ProductsComponent,
      },
      {
        path: "overview",
        component: OverviewComponent,
      },
      {
        path: "product-list",
        component: ProductManagementComponent,
      },
      {
        path: "add-product",
        component: AddProductManagementComponent,
      },
      {
        path: "salesmanager",
        component: SalesmanagerComponent,
      },
      {
        path: "orders",
        component: OrdersComponent,
      },
      {
        path: "add-product",
        component: AddProductManagementComponent,
      },
      {
        path: "supplier-account-management",
        component: SupplierAccountManagementComponent,
      },
      {
        path: "valid-orders",
        component: ValidOrdersComponent,
      },
      {
        path: "invalid-orders",
        component: InvalidOrdersComponent,
      },
      {
        path: "paid-orders",
        component: PaidOrdersComponent,
      },
      {
        path: "order-full-details",
        component: OrderFullDetailsComponent,
      },
      {
        path: "products-list",
        component: ProductsListComponent,
      },
      {
        path: "dashboard/product-details/:id",
        component: ProductDetailsComponent,
      },
      {
        path: "homepage-warehouse",
        component: B2bHomepageWarehouseComponent,
      },
      {
        path: "inventory-management",
        component: B2bInventoryManagementComponent,
      },
      {
        path: "inventory/add-inventory",
        component: B2bAddInventoryComponent,
      },
      {
        path: "inventory/edit-inventory/:id",
        component: B2bEditInventoryComponent,
      },
      {
        path: "inventory/:id",
        component: B2bInventoryFullDetailsComponent,
      },
      {
        path: "stock-management",
        component: B2bStockManagementComponent,
      },
      {
        path: "warehouse-management",
        component: B2bWarehouseManagementComponent,
      },
      {
        path: "edit-warehouse/:id",
        component: B2bEditWarehouseComponent,
      },
      {
        path: "add-warehouse",
        component: B2bAddWarehouseComponent,
      },
      {
        path: "funds/sales-funds",
        component: B2bSalesFundsComponent,
      },
      {
        path: "funds/purchased-funds",
        component: B2bPurchasedFundsComponent,
      },
      {
        path: "funds/edit-purchased-funds/:id",
        component: B2bEditPurchasedFundsComponent,
      },
      {
        path: "funds/payment-methods",
        component: B2bPaymentMethodsComponent,
      },
      {
        path: "funds/edit-payment-methods/:id",
        component: B2bEditPaymentMethodsComponent,
      },
      {
        path: "discounts",
        component: DiscountsComponent,
      },
      {
        path: "discounts-list",
        component: DiscountsListComponent,
      },
      {
        path: "dashboard/order-details/:id",
        component: OrderFullDetailsComponent,
      },
      {
        path: "shop-commission-list",
        component: ShopCommissionsComponent,
      },
      {
        path: "products-commission-list",
        component: ProductsCommissionsComponent,
      },
      {
        path: "add-shop-commission",
        component: AddShopCommissionComponent,
      },
      {
        path: "add-product-commission",
        component: AddProductsCommissionComponent,
      },
      {
        path: "update-product-item/:id",
        component: UpdateProductItemComponent,
      },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule { }
