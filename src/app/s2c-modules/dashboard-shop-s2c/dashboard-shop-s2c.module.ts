import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardShopS2cRoutingModule } from './dashboard-shop-s2c-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatToolbarModule, MatSidenavModule, MatListModule, MatIconModule, MatButtonModule, MatTableModule, MatPaginatorModule, MatCheckboxModule, MatExpansionModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatCardModule, MatProgressSpinnerModule, MatSelectModule, MatOptionModule, MatGridListModule, MatTooltipModule, MatMenuModule, MatSnackBarModule, MatBadgeModule, MatTabsModule, MatIconRegistry } from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPopperModule } from 'ngx-popper';
import { ChartsModule } from 'ng2-charts';
import { MdcImageListModule } from '@angular-mdc/web';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { BasketService } from 'src/app/core/services/basket.service';
import { CompaniesService } from 'src/app/shared/services/companies.service';
import { OrderService } from 'src/app/core/services/order.service';
import { DomSanitizer } from '@angular/platform-browser';
import { DashboardShopS2cComponent } from './pages/dashboard-shop-s2c/dashboard-shop-s2c.component';
import { ShopS2cOverviewComponent } from './components/shop-s2c-overview/shop-s2c-overview.component';

import { DashboardShopS2cLayoutComponent } from 'src/app/core/layouts/dashboard-shop-s2c-layout/dashboard-shop-s2c-layout.component';
import { AddNewMemberComponent } from 'src/app/modules/dashboard-shop/components/add-new-member/add-new-member.component';


@NgModule({
  declarations: [

    DashboardShopS2cLayoutComponent,
    DashboardShopS2cComponent, 
    ShopS2cOverviewComponent,
    
     
      
    ],
  imports: [
    CommonModule,
    DashboardShopS2cRoutingModule,
    CommonModule,
    SharedModule,
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
    MatBadgeModule,
    MatTabsModule,
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  entryComponents: [
   
  ],
  providers: [
    BasketService,
    CompaniesService,
    OrderService
  ]
})
export class DashboardShopS2cModule { 
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
