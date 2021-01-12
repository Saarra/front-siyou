import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/core/services/order.service';
import { MatSnackBar, MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { CommissionsService } from 'src/app/shared/services/commissions.service';
import { trigger, state, style, transition, animate } from '@angular/animations';
@Component({
  selector: 'app-products-commissions',
  templateUrl: './products-commissions.component.html',
  styleUrls: ['./products-commissions.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0', visibility: 'hidden' })),
      state('expanded', style({ height: '*', visibility: 'visible' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ProductsCommissionsComponent implements OnInit {
  commission: any;
  expandedElement: null;
  orderDisplayedColumns = ['created_at', 'commission_percent', 'sales_manager', 'email', 'actions'];
  comLength = 0;
  sumOrder = 0;
  maxComPercent;
  maxComDate;
  minComPercent;
  minComDate;
  lastCom;
  lastComPercent;
  lastComDate;
  constructor(
    private orderService: OrderService,
    private commissionService: CommissionsService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private router: Router) { }
  ngOnInit() {
    this.onGetProductsCommissions();
  }
  onGetProductsCommissions() {
    return this.commissionService.getCommissionProducts().subscribe(
      res => {
        this.commission = res;
        for (let el of this.commission) {
          this.comLength += 1;
        }
        let max = 0;
        this.commission.forEach(oneData => {
          if (oneData.commission_percent > max) {
            max = oneData.commission_percent;
            this.maxComPercent = oneData.commission_percent;
            this.maxComDate = oneData.created_at
          }
        });
        let min = this.commission[0];
        let minPrice = min.commission_percent;
        let minDate = min.created_at;
        this.commission.forEach(oneData => {
          if (oneData.commission_percent < minPrice) {
            minPrice = oneData.commission_percent;
            this.minComPercent = oneData.commission_percent;
            this.minComDate = oneData.created_at
          } else {
            this.minComPercent = minPrice;
            this.minComDate = minDate;
          }
        });
        this.lastCom = this.commission[this.commission.length - 1];
        this.lastComPercent = this.lastCom.commission_percent;
        this.lastComDate = this.lastCom.created_at;
      }
    )
  }
  openCommissionFullDetails(id: any) {
    // this.redirectTo(`dashboard/order-details/${id}`);
    this.router.navigate([`dashboard/order-details/${id}`]);

  }
  redirectTo(uri: string) {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      this.router.navigate([uri]));
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.commission.filter = filterValue.trim().toLowerCase();
    if (this.commission.paginator) {
      this.commission.paginator.firstPage();
    }
  }
}
