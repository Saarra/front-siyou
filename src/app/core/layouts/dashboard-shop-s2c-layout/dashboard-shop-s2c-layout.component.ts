import { Component, OnInit, OnDestroy, ChangeDetectorRef, ViewEncapsulation, ViewChild } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { Router } from '@angular/router';
import { PopperContent } from 'ngx-popper';
import { MatIcon } from '@angular/material';
@Component({
  selector: 'app-dashboard-shop-s2c-layout',
  templateUrl: './dashboard-shop-s2c-layout.component.html',
  styleUrls: ['./dashboard-shop-s2c-layout.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DashboardShopS2cLayoutComponent implements OnInit {
  mobileQuery: MediaQueryList;
  navItems: Array<any> = [
    {
      displayName: 'Dashboard',
      displayNameIT: 'Dashboard',
      displayNameCH: 'Dashboard',
      iconName: 'dashboard',
      route: 'shop/shopoverview'
    },
    {
      displayName: 'Products',
      displayNameIT: 'Dashboard',
      displayNameCH: 'Dashboard',
      svgIcon: 'products',
      route: 'shop/products'
    },
    {
      displayName: 'Orders',
      displayNameIT: 'Dashboard',
      displayNameCH: 'Dashboard',
      svgIcon: 'orders',
      children: [
        {
          displayName: 'Purchase',
          displayNameIT: 'Dashboard',
          displayNameCH: 'Dashboard',
          iconName: 'shopping_basket',
          route: 'shop/purchase'
        }
      ]
    },
    {
      displayName: 'Shop Managers',
      displayNameIT: 'Dashboard',
      displayNameCH: 'Dashboard',
      iconName: 'people',
      route: 'shop/shopmanager',
    },
    {
      displayName: 'Funds',
      displayNameIT: 'Dashboard',
      displayNameCH: 'Dashboard',
      svgIcon: 'funds',
    },
    {
      displayName: 'Warehouses',
      displayNameIT: 'Dashboard',
      displayNameCH: 'Dashboard',
      svgIcon: 'warehouses',
      route: 'warehouses'
    }
  ];
  fillerNav = Array.from({ length: 50 }, (_, i) => `Nav Item ${i + 1}`);
  private mobileQueryListener: () => void;
  @ViewChild('popperContent', { static: true }) popperContent: PopperContent;
  @ViewChild('shopping_basket', { static: false }) shoppingBasket: MatIcon;
  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private route: Router) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this.mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this.mobileQueryListener);
  }
  ngOnInit() {
  }
  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this.mobileQueryListener);
  }
  showPopperContent() {
    if (this.mobileQuery.matches) {
      this.route.navigate(['/shop/purchase']);
    } else {
      this.popperContent.show();
    }
  }
  logoutUser() {
    localStorage.removeItem('token');
    this.route.navigate(['/login']);
  }
}