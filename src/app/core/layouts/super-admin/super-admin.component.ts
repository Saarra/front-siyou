import { Component, OnInit, OnDestroy, ChangeDetectorRef, ViewEncapsulation } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { Router } from '@angular/router';
import { UserService } from 'src/app/shared/services/user.service';
@Component({
  selector: 'app-super-admin',
  templateUrl: './super-admin.component.html',
  styleUrls: ['./super-admin.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SuperAdminComponent implements OnInit {
  invalidUsers: any;
  invalidUsers_length: number;
  mobileQuery: MediaQueryList;
  navItems: Array<any> = [
    {
      displayName: 'Dashboard',
      displayNameIT: 'Dashboard',
      displayNameCH: 'Dashboard',
      can_view: 1,
      svgIcon: 'dashboard2',
      route: 'superadmin/overview'
    },
    {
      displayName: 'Manage Accounts',
      displayNameIT: 'Manage Accounts',
      displayNameCH: 'Manage Accounts',
      svgIcon: 'account_list',
      can_view: 1,
      children: [
        {
          displayName: 'License List',
          displayNameIT: 'License List',
          displayNameCH: 'License List',
          svgIcon: 'accounts',
          route: 'superadmin/license-list',
          can_view: 1,

        },
        {
          displayName: 'Accounts List',
          displayNameIT: 'Accounts List',
          displayNameCH: 'Accounts List',
          svgIcon: 'accounts',
          route: 'superadmin/accounts-list',
          can_view: 1,
        },
        {
          displayName: 'List of Validated accounts',
          displayNameIT: 'List of Validated accounts',
          displayNameCH: 'List of Validated accounts',
          svgIcon: 'valid',
          route: 'superadmin/validated-accounts',
          can_view: 1,
        },
        {
          displayName: 'List of invalid accounts',
          displayNameIT: 'List of invalid accounts',
          displayNameCH: 'List of invalid accounts',
          svgIcon: 'invalid',
          route: 'superadmin/invalid-accounts',
          can_view: 1,
        },
        {
          displayName: "Advertisement",
          displayNameIT: "Advertisement",
          displayNameCH: "Advertisement",
          displayNameFR: "Advertisement",
          svgIcon: 'accounts',
          route: 'superadmin/advertisement',
          can_view: 1,
        }
        
      ],
    },
    {
      displayName: 'Manage Commissions',
      displayNameIT: 'Manage Commissions',
      displayNameCH: 'Manage Commissions',
      svgIcon: 'balance',
      can_view: 1,
      children: [
        {
          displayName: 'Commissions',
          displayNameIT: 'Commissions',
          displayNameCH: 'Commissions',
          svgIcon: 'monetization',
          route: 'superadmin/commissions',
          can_view: 1,
        },
        {
          displayName: 'Affect Commission to Supplier',
          displayNameIT: 'Affect Commission to Supplier',
          displayNameCH: 'Affect Commission to Supplier',
          svgIcon: 'vote',
          route: 'superadmin/affect-commission',
          can_view: 1,
        }
      ]
    },
    {
      displayName: 'Product Management',
      displayNameIT: 'Product Management',
      displayNameCH: 'Product Management',
      can_view: 1,
      svgIcon: 'products',
      children: [
        {
          displayName: 'Manage Brands',
          displayNameIT: 'Manage Brands',
          displayNameCH: 'Manage Brands',
          svgIcon: 'storage',
          route: 'superadmin/brands',
          can_view: 1,
        },
        {
          displayName: 'Manage Categories',
          displayNameIT: 'Manage Categories',
          displayNameCH: 'Manage Categories',
          svgIcon: 'category',
          route: 'superadmin/categories',
          can_view: 1,
        },
        {
          displayName: 'Manage Criteria and Units',
          displayNameIT: 'Manage Criteria and Units',
          displayNameCH: 'Manage Criteria and Units',
          svgIcon: 'style',
          route: 'superadmin/criterias',
          can_view: 1,
        },
        {
          displayName: 'Criteria to Category',
          displayNameIT: 'Criteria to Category',
          displayNameCH: 'Criteria to Category',
          svgIcon: 'post_add',
          route: 'superadmin/criteria-to-categories',
          can_view: 1,
        },
        {
          displayName: 'Manage Suppliers',
          displayNameIT: 'Manage Suppliers',
          displayNameCH: 'Manage Suppliers',
          svgIcon: 'storage',
          can_view: 1,
          children: [
            {
              displayName: 'System Suppliers',
              displayNameIT: 'System Suppliers',
              displayNameCH: 'System Suppliers',
              svgIcon: 'post_add',
              route: 'superadmin/suppliers',
              can_view: 1,
            },
            {
              displayName: 'Shop Suppliers',
              displayNameIT: 'Shop Suppliers',
              displayNameCH: 'Shop Suppliers',
              svgIcon: 'post_add',
              route: 'superadmin/shop-suppliers',
              can_view: 1,
            }
          ]
        },
      ]
    },
  ];
  fillerNav = Array.from({ length: 50 }, (_, i) => `Nav Item ${i + 1}`);
  private mobileQueryListener: () => void;
  ChangeDetectorRef: any;
  constructor(
    private userService: UserService,
    changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private route: Router) {
    this.mobileQuery = media.matchMedia('(max-width: 1000px)');
    this.mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this.mobileQueryListener);
  }
  ngOnInit() {
    return this.userService.getallInvalidusersLast().subscribe(
      res => {
        this.invalidUsers = res;
        this.invalidUsers_length = res.length;
      }, err => {
        console.log(err);;
      }
    )
  }
  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this.mobileQueryListener);
  }
  logoutUser() {
    localStorage.removeItem('token');
    this.route.navigate(['/login']);
  }
  goToInvalidUsers() {
    this.route.navigate(['/superadmin/invalid-accounts']);
  }
}
