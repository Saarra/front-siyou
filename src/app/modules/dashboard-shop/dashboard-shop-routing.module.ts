import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardShopComponent } from './pages/dashboard-shop/dashboard-shop.component';
import { ShopOverviewComponent } from './components/shop-overview/shop-overview.component';
import { ProductsComponent } from './components/products/products.component';
import { BasketDetailsComponent } from './components/basket/basket-details/basket-details.component';
import { MembershipManagementComponent } from './components/membership-management/membership-management.component';
import { AddNewMemberComponent } from './components/add-new-member/add-new-member.component';
import { LevelManagementListComponent } from './components/level-management/level-management-list/level-management-list.component';
import { AddNewLevelComponent } from './components/level-management/add-new-level/add-new-level.component';
import { SuppliersListComponent } from './components/supplier-management/suppliers-list/suppliers-list.component';
import { SupplierFullDetailsComponent } from './components/supplier-management/supplier-full-details/supplier-full-details.component';
import { WishlistComponent } from './components/wishlist-management/wishlist/wishlist.component';
import { ProductDetailsS2cComponent } from './components/shop-product-management/product-details-s2c/product-details-s2c.component';
import { ShopProductListComponent } from './components/shop-product-management/shop-product-list/shop-product-list.component';
import { ShopPurshasedProductsComponent } from './components/shop-product-management/shop-purshased-products/shop-purshased-products.component';
import { ShopInvalidOrdersComponent } from './components/order-management/shop-invalid-orders/shop-invalid-orders.component';
import { ShopValidOrdersComponent } from './components/order-management/shop-valid-orders/shop-valid-orders.component';
import { ShopPaidOrdersComponent } from './components/order-management/shop-paid-orders/shop-paid-orders.component';
import { ShopOrderFullDetailsComponent } from './components/order-management/shop-order-full-details/shop-order-full-details.component';
import { ProductsListS2cComponent } from './components/shop-product-management/products-list-s2c/products-list-s2c.component';
import { CartPageComponent } from './components/basket-management/cart-page/cart-page.component';
import { CheckoutComponent } from './components/basket-management/checkout/checkout.component';
import { ShopAffectDiscountComponent } from './components/discounts-management/shop-affect-discount/shop-affect-discount.component';
import { InventoryComponent } from './components/warehouses/inventory/inventory.component';
import { UpdateInventoryComponent } from './components/warehouses/inventory/update-inventory/update-inventory.component';
import { AddInventoryComponent } from './components/warehouses/inventory/add-inventory/add-inventory.component';
import { InventoryFullDetailsComponent } from './components/warehouses/inventory/inventory-full-details/inventory-full-details.component';
import { PreOrdersComponent } from './components/warehouse-management/pre-orders/pre-orders.component';
import { AddShopManagerComponent } from './components/shop-manager-management/add-shop-manager/add-shop-manager.component';
import { AddChainComponent } from './components/chain-management/add-chain/add-chain.component';
import { ShopManagersListComponent } from './components/shop-manager-management/shop-managers-list/shop-managers-list.component';
import { ChainsListComponent } from './components/chain-management/chains-list/chains-list.component';
import { ShopDiscountsListComponent } from './components/discounts-management/shop-discounts-list/shop-discounts-list.component';
import { AddShopProductComponent } from './components/shop-product-management/add-shop-product/add-shop-product.component';
import { StockManagementComponent } from './components/warehouses/stock-management/stock-management.component';
import { InvalidMembersListComponent } from './components/membership-management/invalid-members-list/invalid-members-list.component';
import { MyAccountComponent } from './components/my-account-management/my-account/my-account.component';
import { ShopFundsCardComponent } from './components/funds-management/shop-funds-card/shop-funds-card.component';
import { ShopFundsCheckComponent } from './components/funds-management/shop-funds-check/shop-funds-check.component';
import { ShopFundsCashComponent } from './components/funds-management/shop-funds-cash/shop-funds-cash.component';
import { UseraccountComponent } from './components/my-account-management/useraccount/useraccount.component';
import { OrdersListCashRegisterComponent } from './components/order-management/orders-list-cash-register/orders-list-cash-register.component';
import {WarehouseComponent} from './components/warehouse-management/warehouse/warehouse.component' ;
import { AddSupplierComponent } from './components/supplier-management/add-supplier/add-supplier.component';
import {ShopEditProductComponent} from './components/shop-product-management/products-list-s2c/shop-edit-product/shop-edit-product.component'
import { EditWarehouseComponent } from './components/warehouse-management/warehouse/edit-warehouse/edit-warehouse.component';
import { AddWarehouseComponent } from './components/warehouse-management/warehouse/add-warehouse/add-warehouse.component';
import { AddShopcachierComponent } from './components/shop-cachier-management/add-shop-cachier/add-shop-cachier.component';
import { ShopcachiersListComponent } from './components/shop-cachier-management/shop-cachiers-list/shop-cachiers-list.component';
import {WarehousesComponent} from './components/warehouses/warehouses.component';
import { CategoriesComponent } from './components/shop-product-management/categories/categories.component';
import {ShopCategoriesListComponent} from './components/shop-product-management/categories/shop-categories-list/shop-categories-list.component'
import { PaymentMethodsComponent } from './components/funds-management/payment-methods/payment-methods.component';
import { PurchasedFundsComponent } from './components/funds-management/purchased-funds/purchased-funds.component';
import { ShopEditFundComponent } from './components/funds-management/purchased-funds/shop-edit-fund/shop-edit-fund.component';
import { ShopEditPaymentMethodComponent } from './components/funds-management/payment-methods/shop-edit-payment-method/shop-edit-payment-method.component';
import { ShopEditMemberComponent } from './components/membership-management/shop-edit-member/shop-edit-member.component';
import { ShopAffectPromotionComponent } from './components/discounts-management/shop-affect-promotion/shop-affect-promotion.component';
import { ShopEditDiscountComponent } from './components/discounts-management/shop-edit-discount/shop-edit-discount.component';
import { ShopEditManagerComponent } from './components/shop-manager-management/shop-edit-manager/shop-edit-manager.component';
import { EditShopCashierComponent } from './components/shop-cachier-management/edit-shop-cashier/edit-shop-cashier.component';
import { ShopPromotionsListComponent } from './components/discounts-management/shop-promotions-list/shop-promotions-list.component'
import { EditChainComponent } from './components/chain-management/edit-chain/edit-chain.component'
import { HistoryDiscountsComponent } from './components/discounts-management/history-discounts/history-discounts.component'
import { OnlineProductsComponent } from './components/online/online-products/online-products.component'
import { ReturnedGoodsComponent } from './components/warehouse-management/returned-goods/returned-goods.component'
import { AdvertisementComponent } from './components/advertisement/advertisement.component'
import { EditReturnedGoodsComponent } from './components/warehouse-management/returned-goods/edit-returned-goods/edit-returned-goods.component'
import { HistoryInventoryComponent } from './components/warehouses/inventory/history-inventory/history-inventory.component'
import { ExpiredProductsS2cComponent } from './components/shop-product-management/products-list-s2c/expired-products-s2c/expired-products-s2c.component'
import { WarningProductsS2cComponent } from './components/shop-product-management/products-list-s2c/warning-products-s2c/warning-products-s2c.component'
import { AddShopOperatorComponent } from './components/shop-operator-management/add-shop-operator/add-shop-operator/add-shop-operator.component';
import { ShopEditOperatorComponent } from './components/shop-operator-management/shop-edit-operator/shop-edit-operator.component';
import { ShopOperatorsListComponent } from './components/shop-operator-management/shop-operators-list/shop-operators-list.component';
import { EditSupplierComponent } from './components/supplier-management/suppliers-list/edit-supplier/edit-supplier.component';
import { AddCategoryComponent } from './components/shop-product-management/categories/add-category/add-category.component';
import { AddQuickPurchaseComponent } from './components/shop-product-management/quick-purchase/add-quick-purchase/add-quick-purchase.component';
import { QuickPurchaseComponent } from './components/shop-product-management/quick-purchase/quick-purchase.component';
import { MyCategoriesComponent } from './components/shop-product-management/categories/my-categories/my-categories.component';
import { DownloadQuickComponent } from './components/shop-product-management/quick-purchase/download-quick/download-quick.component';
import { EditMyCategoryComponent } from './components/shop-product-management/categories/edit-my-category/edit-my-category.component'
import { HistoryPromotionComponent } from './components/discounts-management/history-promotion/history-promotion.component'
import { MySuppliersComponent } from './components/supplier-management/my-suppliers/my-suppliers.component'

const routes: Routes = [

  {
    path: '',
    component: DashboardShopComponent,
    children: [
      {
        path: '',
        redirectTo: 'products-list',
        pathMatch: 'full'
      },
      
      {
        path: 'advertisement',
        component:AdvertisementComponent
      },
      {
        path: 'online-products',
        component:OnlineProductsComponent

      },
      {
        path: 'shopoverview',
        component: ShopOverviewComponent
      },
      {
        path: 'expired-products',
        component: ExpiredProductsS2cComponent
      },
    
      
      {
        path: 'warn-products',
        component: WarningProductsS2cComponent
      },
      {
        path: 'add-quick-purchase',
        component: AddQuickPurchaseComponent
      },
      {
        path: 'download-quick-purchase/:id',
        component: DownloadQuickComponent
      },

      
      {
        path: 'quick-purchase',
        component: QuickPurchaseComponent
      },
      
      

      {
        path: 'products',
        component: ProductsComponent
      },
      {
        path: 'purchase',
        component: BasketDetailsComponent
      },
      {
        path: 'membership-management',
        component: MembershipManagementComponent
      },
      {
        path: 'edit-member/:id',
        component: ShopEditMemberComponent
      },
      
      {
        path: 'add-new-member',
        component: AddNewMemberComponent
      },
      {
        path: 'level-membership-management',
        component: LevelManagementListComponent
      },
      {
        path: 'add-level-membership',
        component: AddNewLevelComponent
      },
      {
        path: 'suppliers-list',
        component: SuppliersListComponent
      },
      {
        path: 'my-suppliers',
        component: MySuppliersComponent
      },
      
      {
        path: 'edit-supplier/:id',
        component: EditSupplierComponent
      },
      
      {
        path: 'add-supplier',
        component: AddSupplierComponent
      },
      
      {
        path: 'supplier-full-details/:id',
        component: SupplierFullDetailsComponent
      },
      {
        path: 'my-wishlist',
        component: WishlistComponent
      },
      {
        path: 'shop-product-details/:id',
        component: ProductDetailsS2cComponent
      },
      {
        path: 'products-list',
        component: ShopProductListComponent
      },
      {
        path: 'purshased',
        component: ShopPurshasedProductsComponent
      },
      {
        path: 'invalid-orders',
        component: ShopInvalidOrdersComponent
      },
      {
        path: 'valid-orders',
        component: ShopValidOrdersComponent
      },
      {
        path: 'paid-orders',
        component: ShopPaidOrdersComponent
      },
      {
        path: 'order-full-details/:id',
        component: ShopOrderFullDetailsComponent
      },
      {
        path: 'products-list-s2c',
        component: ProductsListS2cComponent
      },
      {
        path: 'affect-categories',
        component: CategoriesComponent
      },
      {
        path: 'categories',
        component: ShopCategoriesListComponent
      },
      {
        path: 'my-categories',
        component: MyCategoriesComponent
      },
      {
        path: 'edit-category/:id/:direction',
        component: EditMyCategoryComponent
      },
      
      {
        path: 'categories/add',
        component: AddCategoryComponent
      },
      
      {
        path : 'edit-product/:barcode',
        component: ShopEditProductComponent
      },
      {
        path: 'cart',
        component: CartPageComponent
      },
      {
        path: 'checkout',
        component: CheckoutComponent
      },
      {
        path: 'affect-discount',
        component: ShopAffectDiscountComponent
      },
      {
        path: 'offline-promotions-list',
        component: ShopPromotionsListComponent
      },
      {
        path: 'discount-history',
        component: HistoryDiscountsComponent
      },
      {
        path: 'promotion-history',
        component: HistoryPromotionComponent
      },
      
      {
        path: 'edit-returned-goods/:id',
        component: EditReturnedGoodsComponent
      },
      
      
      {
        path: 'affect-promotion',
        component: ShopAffectPromotionComponent
      },
      {
        path: 'edit-discount/:id',
        component: ShopEditDiscountComponent
      },
      
      {
        path: 'inventory',
        component: InventoryComponent
      },
      {
        path: 'inventory/inventory-full-detail/:id',
        component: InventoryFullDetailsComponent
      },
      {
        path: 'inventory/new-inventory',
        component: AddInventoryComponent
      },
      {
        path: 'inventory/update-inventory/:id',
        component: UpdateInventoryComponent
      },
      {
        path: 'inventory-history',
        component: HistoryInventoryComponent
      },
      
      {
        path: 'pre-orders',
        component: PreOrdersComponent
      },
      {
        path: 'warehouse-management',
        component: WarehouseComponent
      },
      {
        path: 'warehouses/homepage',
        component: WarehousesComponent
      },
      {
        path: 'warehouses/edit-warehouse/:id',
        component: EditWarehouseComponent
      },
      {
        path: 'warehouses/add-warehouse/:id',
        component: AddWarehouseComponent
      },
      {
        path: 'returned-goods',
        component: ReturnedGoodsComponent
      },
      
      
      {
        path: 'add-shopmanager',
        component: AddShopManagerComponent
      },
      {
        path: 'edit-shopmanager/:id',
        component: ShopEditManagerComponent
      },

      {
        path: 'add-operator',
        component: AddShopOperatorComponent
      },
      {
        path: 'edit-operator/:id',
        component: ShopEditOperatorComponent
      },
      
      {
        path: 'add-chain',
        component: AddChainComponent
      },
      {
        path: 'edit-chain/:id',
        component: EditChainComponent
      },
      
      {
        path: 'shopmanagers-list',
        component: ShopManagersListComponent
      },
      {
        path: 'operators-list',
        component: ShopOperatorsListComponent
      },
      {
        path: 'chains-list',
        component: ChainsListComponent
      },
      {
        path: 'offline-discounts-list',
        component: ShopDiscountsListComponent
      },
      {
        path: 'add-product',
        component: AddShopProductComponent
      },

      {
        path: 'stock-management',
        component: StockManagementComponent
      },
      {
        path: 'invalid-members',
        component: InvalidMembersListComponent
      },
      {
        path: 'my-account',
        component: MyAccountComponent
      },
      {
        path: 'purchased-funds',
        component: PurchasedFundsComponent
      },
      {
        path: 'edit-fund/:id',
        component:ShopEditFundComponent

      },
      {
        path: 'payment-methods',
        component: PaymentMethodsComponent
      },
      {
        path: 'edit-payment-method/:id',
        component: ShopEditPaymentMethodComponent
      },
      
      {
        path: 'funds-card',
        component: ShopFundsCardComponent
      },

      {
        path: 'funds-check',
        component: ShopFundsCheckComponent
      },

      {
        path: 'funds-cash',
        component: ShopFundsCashComponent
      },
      {
        path: 'useraccount',
        component: UseraccountComponent
      },
      {
        path: 'orders-list',
        component: OrdersListCashRegisterComponent
      },

      {path: 'cashiers-list',
      component: ShopcachiersListComponent
      },
      {path: 'add-cashier',
      component: AddShopcachierComponent
    },
        {path: 'edit-cashier/:id',
    component: EditShopCashierComponent
  }
    

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardShopRoutingModule { }
