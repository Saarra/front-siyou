import { Component, OnInit, ViewChild, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { DataSource } from '@angular/cdk/table';
import { Observable} from 'rxjs/Observable';
import { UserService } from 'src/app/shared/services/user.service';
import { User } from 'src/app/shared/models/user';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
@Component({
  selector: 'app-valid-accounts',
  templateUrl: './valid-accounts.component.html',
  styleUrls: ['./valid-accounts.component.scss']
})
export class ValidAccountsComponent implements OnInit, AfterViewInit {
  dataSource2 = new allusersDatasource(this.userService);
  dataSource = new MatTableDataSource();
  displayedColumns = ['id', 'first_name', 'last_name', 'email', 'role', 'actions'];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  user;
  sum_accounts = 0;
  sum_suppliers = 0;
  sum_salesmanagers = 0;
  sum_shop_owner = 0;
  showError(message: string) {
    const config = new MatSnackBarConfig();
    config.panelClass = ['background-red'];
    config.duration = 5000;
    this._snackBar.open(message, null, config);
  }
  constructor(
    private userService: UserService,
    private changeDetectorRefs: ChangeDetectorRef,
    private router: Router, private location: Location,
    private _snackBar: MatSnackBar,
  ) {
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  ngOnInit() {
    this.userService.getValidUsers().subscribe(res => {
      this.user = res;
      this.dataSource.data = res;
      for (let us of this.user) {
        this.sum_accounts += 1;
        if (us.role.name === 'Supplier') {
          this.sum_suppliers += 1;
        } else if (us.role.name === 'SalesManager') {
          this.sum_salesmanagers += 1;
        } else if (us.role.name === 'Shop_Owner') {
          this.sum_shop_owner += 1;
        }
      }
      this.changeDetectorRefs.markForCheck();
    }, err => {
      console.log(err);;
    })
    this.dataSource.paginator = this.paginator;
  }
  ngAfterViewInit() {
    this.dataSource.sort = this.sort
  }
  onBlockUser(id: number) {
    if (confirm("Are you sure you want to block this user?")) {
      return this.userService.BlockUser(id).subscribe(
        res => {
          alert('This Account is blocked successfully');
          // this.redirectTo('superadmin/validated-accounts');
          this.router.navigate(['superadmin/validated-accounts']);

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
          // this.redirectTo('superadmin/validated-accounts');
          this.router.navigate(['superadmin/validated-accounts']);

        }, err => {
          console.log(err);;
        }
      )
    }
  }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }
  openSnackBar2(message: string, action?: string) {
    let config = new MatSnackBarConfig();
    config.panelClass = ['custom-class'];
    this._snackBar.open(message, action ? 'Action Label' : undefined, config);
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
    return this.userService.getValidUsers();
  }
  disconnect() { };
}
