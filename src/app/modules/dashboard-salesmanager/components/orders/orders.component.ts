import { Component, OnInit, ViewChild } from '@angular/core';
import { OrderService } from 'src/app/core/services/order.service';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  orderList: any = [];
  dataSource: MatTableDataSource<any>;
  orderDisplayedColumns = ['order_date', 'order_price', 'shop_owner_name', 'order_statut', 'commission_value', 'products_number', 'actions'];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  constructor(private ordersService: OrderService) { }

  ngOnInit() {
    this.getSalesmanagerOrders();
  }

  getSalesmanagerOrders() {
    this.ordersService.getSalesmanagerOrders().subscribe((orderList: any) => {
      this.orderList = orderList;
      this.dataSource = new MatTableDataSource(orderList);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

}
