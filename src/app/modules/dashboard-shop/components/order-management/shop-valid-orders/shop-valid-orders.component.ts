import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/core/services/order.service';
import { MatSnackBar, MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { OrderServiceService } from 'src/app/shared/services/order-service.service';
import { trigger, state, style, transition, animate } from '@angular/animations';
@Component({
  selector: 'app-shop-valid-orders',
  templateUrl: './shop-valid-orders.component.html',
  styleUrls: ['./shop-valid-orders.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0', visibility: 'hidden' })),
      state('expanded', style({ height: '*', visibility: 'visible' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ShopValidOrdersComponent implements OnInit {
  orderList: any;
  expandedElement: null;
  orderDisplayedColumns = ['order_date', 'order_price', 'shop_owner', 'statut', 'actions'];
  orderLength = 0;
  sumOrder = 0;
  maxOrderPrice;
  maxOrderDate;
  minOrderPrice;
  minOrderDate;
  lastOrder;
  lastOrderPrice;
  lastOrderDate;
  constructor(
    private orderService: OrderServiceService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private router: Router) { }
  ngOnInit() {
    this.onGetValidOrders();
  }
  onGetValidOrders() {
    return this.orderService.getShopValidOrders().subscribe(
      res => {
        this.orderList = res;
        for (let el of this.orderList) {
          this.orderLength += 1;
          this.sumOrder += el.order_price;
        }
        let max = 0;
        this.orderList.forEach(oneData => {
          if (oneData.order_price > max) {
            max = oneData.order_price;
            this.maxOrderPrice = oneData.order_price;
            this.maxOrderDate = oneData.order_date
          }
        });
        let min = this.orderList[0];
        let minPrice = min.order_price;
        let minDate = min.order_date;
        this.orderList.forEach(oneData => {
          if (oneData.order_price < minPrice) {
            minPrice = oneData.order_price;
            this.minOrderPrice = oneData.order_price;
            this.minOrderDate = oneData.order_date
          } else {
            this.minOrderPrice = minPrice;
            this.minOrderDate = minDate;
          }
        });
        this.lastOrder = this.orderList[this.orderList.length - 1];
        this.lastOrderPrice = this.lastOrder.order_price;
        this.lastOrderDate = this.lastOrder.order_date;
      }
    )
  }
  openOrderFullDetails(id: any) {
    // this.redirectTo(`shop/order-full-details/${id}`);
    this.router.navigate([`shop/order-full-details/${id}`]);

  }
  redirectTo(uri: string) {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      this.router.navigate([uri]));
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.orderList.filter = filterValue.trim().toLowerCase();
    if (this.orderList.paginator) {
      this.orderList.paginator.firstPage();
    }
  }
}
