import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { Router } from '@angular/router';
@Component({
  selector: 'app-dashboard-salesmanager-layout',
  templateUrl: './dashboard-salesmanager-layout.component.html',
  styleUrls: ['./dashboard-salesmanager-layout.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DashboardSalesmanagerLayoutComponent implements OnInit {
  mobileQuery: MediaQueryList;
  navItems: Array<any> = [
    {
      displayName: 'My Products',
      displayNameIT: 'My Products',
      displayNameCH: 'My Products',
      svgIcon: 'products',
      route: 'salesmanager/products'
    },
    {
      displayName: 'Orders',
      displayNameIT: 'My Products',
      displayNameCH: 'My Products',
      svgIcon: 'orders',
      route: 'salesmanager/orders'
    }
  ];
  constructor(media: MediaMatcher, private route: Router) {
    this.mobileQuery = media.matchMedia('(max-width: 1000px)');
  }
  ngOnInit() {
  }
  logoutUser() {
    localStorage.removeItem('token');
    this.route.navigate(['/login']);
  }
}
