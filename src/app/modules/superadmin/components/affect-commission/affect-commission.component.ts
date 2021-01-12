import { Component, OnInit, ViewChild, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { DataSource } from '@angular/cdk/table';
import { Observable } from 'rxjs/Observable';
import { UserService } from 'src/app/shared/services/user.service';
import { User } from 'src/app/shared/models/user';
import { Router } from '@angular/router';
import { SupplierService } from 'src/app/shared/services/supplier.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AddCommissionPercentModalComponent } from '../modals/add-commission-percent-modal/add-commission-percent-modal.component';
import { UpdateCommissionPercentModalComponent } from '../modals/update-commission-percent-modal/update-commission-percent-modal.component';
@Component({
  selector: 'app-affect-commission',
  templateUrl: './affect-commission.component.html',
  styleUrls: ['./affect-commission.component.scss']
})
export class AffectCommissionComponent implements OnInit, AfterViewInit {
  dataSource2 = new allusersDatasource(this.supplierService);
  public dataSource = new MatTableDataSource<User>();
  displayedColumns = ['id', 'first_name', 'last_name', 'email', 'commission_percent', 'actions'];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  user;
  sum_accounts = 0;
  sum_suppliers = 0;
  sum_salesmanagers = 0;
  sum_shop_owner = 0;
  constructor(
    public dialog: MatDialog,
    private userService: UserService,
    private supplierService: SupplierService,
    private router: Router,
    private changeDetectorRefs: ChangeDetectorRef
  ) {
  }
  openAddDialog(row: any): void {
    const dialogRef = this.dialog.open(AddCommissionPercentModalComponent, {
      width: '250px',
      data: { row }
    });
  }
  openUpdateDialog(row: any): void {
    const dialogRef = this.dialog.open(UpdateCommissionPercentModalComponent, {
      width: '250px',
      data: { row }
    });
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  ngOnInit() {
    this.supplierService.get_SupplierList().subscribe(res => {
      this.user = res;
      this.dataSource.data = res as User[];
      for (let supp of this.user) {
        this.sum_suppliers += 1;
      }
      //console.log(this.user)
    }, err => {
      console.log(err);;
    })
    this.dataSource.paginator = this.paginator;
  }
  ngAfterViewInit(): void {
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
  commissionExist(commission_percent?: number) {
    if (commission_percent != null) {
      if (commission_percent === 0) {
        return true
      } else {
        return false;
      }
    } else {
      return false;
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
  constructor(private supplierService: SupplierService) {
    super();
  }
  connect(): Observable<User[]> {
    return this.supplierService.get_SupplierList();
  }
  disconnect() { };
}
