import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { FundsService } from 'src/app/shared/services/funds.service';
import { Router } from '@angular/router';
import { CommissionsService } from 'src/app/shared/services/commissions.service';
@Component({
  selector: 'app-shop-commissions',
  templateUrl: './shop-commissions.component.html',
  styleUrls: ['./shop-commissions.component.scss']
})
export class ShopCommissionsComponent implements OnInit {
  commission;
  data;
  displayedColumns = ['created_at', 'commission_percent', 'shop_owner', 'email', 'sales_manager', 'email_sales'];
  dataSource = new MatTableDataSource<any>(this.commission);
  commissionLength = 0;
  sumAmount = 0;
  maxPercent;
  lastCommission;
  lastCommissionDate;
  minCommission;
  maxCommissionDate;
  minCommissionDate;
  lastCommissionPercent;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  constructor(
    private fundsService: FundsService,
    private commissionService: CommissionsService,
    private router: Router
  ) {
    this.dataSource = new MatTableDataSource(this.data);
  }
  ngOnInit() {
    this.onGetShopCommission();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  onGetShopCommission() {
    return this.commissionService.getCommissionShop().subscribe(
      res => {
        this.commission = res;
        this.displayedColumns = ['created_at', 'commission_percent', 'shop_owner', 'email', 'sales_manager', 'email_sales'];
        this.dataSource = new MatTableDataSource<any>(this.commission);
        for (var i = 0; i < this.commission.length; i++) {
          this.commissionLength += 1;
        }
        let max = 0;
        this.commission.forEach(oneData => {
          if (oneData.commission_percent > max) {
            max = oneData.commission_percent;
            this.maxPercent = oneData.commission_percent;
            this.maxCommissionDate = oneData.created_at
          }
        });
        let min = this.commission[0];
        let minValue = min.commission_percent;
        let minDate = min.created_at;
        this.commission.forEach(oneData => {
          if (oneData.commission_percent < minValue) {
            minValue = oneData.commission_percent;
            this.minCommission = oneData.commission_percent;
            this.minCommissionDate = oneData.created_at
          } else {
            this.minCommission = minValue;
            this.minCommissionDate = minDate;
          }
        });
        this.lastCommission = this.commission[this.commission.length - 1];
        this.lastCommissionDate = this.lastCommission.created_at;
        this.lastCommissionPercent = this.lastCommission.commission_percent;
      }, err => {
        console.log(err);;
      }
    );
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  openFundsFullDetails(id: number) {
    this.router.navigate([`dashboard/funds-details/${id}`]);
    // this.redirectTo(`dashboard/funds-details/${id}`);
  }
  redirectTo(uri: string) {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      this.router.navigate([uri]));
  }
}
