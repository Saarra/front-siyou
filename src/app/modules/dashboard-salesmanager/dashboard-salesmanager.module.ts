import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry, MatToolbarModule, MatSidenavModule, MatListModule, MatIconModule, MatButtonModule, MatTableModule, MatPaginatorModule, MatCheckboxModule, MatExpansionModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatCardModule, MatProgressSpinnerModule, MatSelectModule, MatOptionModule, MatGridListModule, MatTooltipModule, MatMenuModule, MatSnackBarModule, MatBadgeModule } from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPopperModule } from 'ngx-popper';
import { ChartsModule } from 'ng2-charts';
import { MdcImageListModule } from '@angular-mdc/web';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { BasketService } from 'src/app/core/services/basket.service';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MenuListItemComponent } from 'src/app/core/layouts/menu-list-item/menu-list-item.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { OrderService } from 'src/app/core/services/order.service';
import { ProductsComponent } from './components/products/products.component';
import { DashboardSalesmanagerRoutingModule } from './dashboard-salesmanager-routing.module';
import { DashboardSalesmanagerLayoutComponent } from 'src/app/core/layouts/dashboard-salesmanager-layout/dashboard-salesmanager-layout.component';
import { DashboardSalesmanagerComponent } from './pages/dashboard-salesmanager/dashboard-salesmanager.component';
import { OrdersComponent } from './components/orders/orders.component';


@NgModule({
  declarations: [
    DashboardSalesmanagerLayoutComponent,
    ProductsComponent,
    DashboardSalesmanagerComponent,
    OrdersComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    DashboardSalesmanagerRoutingModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
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
    MatPaginatorModule,
    MatCheckboxModule,
    MatExpansionModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatOptionModule,
    ChartsModule,
    MdcImageListModule,
    SlickCarouselModule,
    MatGridListModule,
    MatTableModule,
    MatTooltipModule,
    MatMenuModule,
    MatSnackBarModule,
    ScrollingModule,
    MatBadgeModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  providers: [
    BasketService,
    OrderService
  ]
})
export class DashboardSalesmanagerModule {

  constructor(matIconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    matIconRegistry.addSvgIcon('logo_salesM', sanitizer.bypassSecurityTrustResourceUrl('assets/svgs/logo_salesM.svg'));
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
