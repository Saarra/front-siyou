import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { UserService } from 'src/app/shared/services/user.service';
import { Router } from '@angular/router';
import { CommissionsService } from 'src/app/shared/services/commissions.service';
@Component({
  selector: 'app-superadmin-overview',
  templateUrl: './superadmin-overview.component.html',
  styleUrls: ['./superadmin-overview.component.scss']
})
export class SuperadminOverviewComponent implements OnInit {
  user;
  InvalidUsersList;
  userInvalidLast;
  sum_all_accounts = 0;
  sum_all_suppliers = 0;
  sum_all_salesmanagers = 0;
  sum_all_shop_owner = 0;
  sum_invalid_accounts = 0;
  sum_invalid_suppliers = 0;
  sum_invalid_salesmanagers = 0;
  sum_invalid_shop_owner = 0;
  commission;
  sum_com = 0;
  sum_com_order = 0;
  sum_order_price = 0;
  num_com = 0;
  sum_deposit = 0;
  sum_deposit_rest = 0;
  constructor(private userService: UserService,
    private changeDetectorRefs: ChangeDetectorRef,
    private router: Router,
    private commissionService: CommissionsService
  ) { }
  ngOnInit() {
    this.userService.getallusers().subscribe(res => {
      this.user = res;
      for (let us of this.user) {
        this.sum_all_accounts += 1;
        if (us.role.name === 'Supplier') {
          this.sum_all_suppliers += 1;
        } else if (us.role.name === 'SalesManager') {
          this.sum_all_salesmanagers += 1;
        } else if (us.role.name === 'Shop_Owner') {
          this.sum_all_shop_owner += 1;
        }
      }
      this.changeDetectorRefs.markForCheck();
      this.changeDetectorRefs.detectChanges();
    }, err => {
      console.log(err);;
    })
    this.userService.getallInvalidusersLast().subscribe(res => {
      this.userInvalidLast = res;
    }, err => {
      console.log(err);;
    })
    this.userService.getallInvalidusers().subscribe(res => {
      this.user = res;
      this.InvalidUsersList = res;
      for (let us of this.user) {
        this.sum_invalid_accounts += 1;
        if (us.role.name === 'Supplier') {
          this.sum_invalid_suppliers += 1;
        } else if (us.role.name === 'SalesManager') {
          this.sum_invalid_salesmanagers += 1;
        } else if (us.role.name === 'Shop_Owner') {
          this.sum_invalid_shop_owner += 1;
        }
      }
      this.changeDetectorRefs.markForCheck();
    }, err => {
      console.log(err);;
    })
    this.commissionService.getallCommissions().subscribe(res => {
      this.commission = res;
      for (let com of this.commission) {
        this.num_com += 1;
        this.sum_com += com.commission_amount;
        this.sum_deposit += com.Deposit;
        this.sum_deposit_rest += com.Deposit_rest;
        if (com.order != null) {
          if (com.order != null) {
            this.sum_com_order += com.order.commission;
            this.sum_order_price += com.order.order_price;
          }
        }
      }
      this.changeDetectorRefs.markForCheck();
    }, err => {
      console.log(err);;
    })
  }
  OnValidateUser(id: number) {
    if (confirm("Are you sure you want to validate this user?")) {
      return this.userService.validateUser(id).subscribe(
        res => {
          alert('This Account is Validated successfully');
          this.redirectTo('superadmin/overview');
          this.router.navigate(['superadmin/overview']);

        }, err => {
          console.log(err);;
        }
      )
    }
  }
  redirectTo(uri: string) {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      this.router.navigate([uri]));
  }
}
