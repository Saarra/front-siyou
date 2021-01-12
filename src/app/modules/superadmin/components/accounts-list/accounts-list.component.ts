import { Component, OnInit, ViewChild, ChangeDetectorRef, AfterViewChecked, AfterViewInit } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { DataSource } from '@angular/cdk/table';
import { Observable } from 'rxjs/Observable';
import { UserService } from 'src/app/shared/services/user.service';
import { User } from 'src/app/shared/models/user';
import { Router } from '@angular/router';
@Component({
  selector: 'app-accounts-list',
  templateUrl: './accounts-list.component.html',
  styleUrls: ['./accounts-list.component.scss']
})
export class AccountsListComponent implements OnInit, AfterViewInit {
  dataSource2 = new allusersDatasource(this.userService);
  dataSource = new MatTableDataSource();
  displayedColumns = ['id', 'first_name', 'last_name', 'email', 'contact', 'actions'];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  user;
  sum_accounts = 0;
  sum_suppliers = 0;
  sum_salesmanagers = 0;
  sum_shop_owner = 0;
  shopowners;
  constructor(
    private userService: UserService,
    private router: Router,
    private changeDetectorRefs: ChangeDetectorRef
  ) {
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  ngOnInit() {
    this.userService.getShopOwners().subscribe(res => {
      this.user = res;
      this.shopowners = this.user.data;
console.log(this.shopowners)
      this.dataSource.data = this.shopowners;
      // for (let us of this.user) {
      //   this.sum_accounts += 1;
      //   if (us.role.name === 'Supplier') {
      //     this.sum_suppliers += 1;
      //   } else if (us.role.name === 'SalesManager') {
      //     this.sum_salesmanagers += 1;
      //   } else if (us.role.name === 'Shop_Owner') {
      //     this.sum_shop_owner += 1;
      //   }
      // }
      this.changeDetectorRefs.markForCheck();
    }, err => {
      console.log(err);;
    })
    this.dataSource.paginator = this.paginator;
  }
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }
  onBlockUser(id: number) {
    if (confirm("Are you sure you want to block this user?")) {
      return this.userService.BlockUser(id).subscribe(
        res => {
          alert('This Account is blocked successfully');
          // this.redirectTo('superadmin/accounts-list');
          this.router.navigate(['superadmin/accounts-list']);

        }, err => {
          console.log(err);;
        }
      )
    }
  }
  onDeleteUser(id: number) {
    if (confirm("Are you sure to delete this user?")) {
      return this.userService.DeleteUser(id).subscribe(
        res => {
          // this.redirectTo('superadmin/accounts-list');
          this.router.navigate(['superadmin/accounts-list']);

        }, err => {
          console.log(err);;
        }
      )
    }
  }
  OnValidateUser(id: number) {
    if (confirm("Are you sure you want to validate this user?")) {
      return this.userService.validateUser(id).subscribe(
        res => {
          alert('This Account is Validated successfully');
          // this.redirectTo('superadmin/accounts-list');
          this.router.navigate(['superadmin/accounts-list']);

        }, err => {
          console.log(err);;
        }
      )
    }
  }
  isBlocked(user: User) {
    if (user.validation === 1) {
      return true;
    } else {
      return false
    }
  }
  redirectTo(uri: string) {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      this.router.navigate([uri]));
  }
}
export class allusersDatasource extends DataSource<any>{
  paginator: MatPaginator;
  sort: MatSort;
  filter: string;
  constructor(private userService: UserService) {
    super();
  }
  connect(): Observable<User[]> {
    return this.userService.getallusers();
  }
  disconnect() { };
}
