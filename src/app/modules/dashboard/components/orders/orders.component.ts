import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { SupplierService } from 'src/app/shared/services/supplier.service';
import { OrderService } from 'src/app/core/services/order.service';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { MatSnackBar } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class OrdersComponent implements OnInit {

  orderList: any;
  expandedElement: null;
  orderDisplayedColumns = ['order_date', 'order_price', 'shop_owner_name', 'order_statut', 'logistics', 'commission_percent', 'commission_value', 'products_number', 'actions'];
  constructor(private orderService: OrderService, private snackBar: MatSnackBar,
    public translate: TranslateService
    ) { }

  ngOnInit() {
    this.onGetInvalidOrders();
  }

  onGetInvalidOrders() {
    this.orderService.getInvalidOrders().subscribe(orderList => {
      this.orderList = orderList;
    })
  }

  changeOrderStatus(status: string, id: number) {
    const spinner = document.getElementById('spinner');
    spinner.style.display = 'unset';
    this.orderService.updateOrderStatus(status, id).subscribe(orderUpdated => {
      spinner.style.display = 'none';
      this.snackBar.open(this.translate.currentLang === 'Chinese' ? '订单已成功更新':this.translate.currentLang === 'Italian' ? "Ordine aggiornato con successo": 'Order Status Updated', '', {
        duration: 1500, 
        verticalPosition: 'bottom',
        horizontalPosition: 'right',
        panelClass: ['snackbar']
      }).afterDismissed().subscribe(values => {
        this.orderService.subscribeToOrderUpdate().subscribe(data => {
          this.onGetInvalidOrders();
        })
      })
    }, err => {
      spinner.style.display = 'none';
      this.snackBar.open( this.translate.currentLang === 'Chinese' ? '当更新订单状态出现错误':this.translate.currentLang === 'Italian' ? "Errore durante l'aggiornamento dello stato dell'ordine":'Error While updating Order Status', '', {
        duration: 1500,
        verticalPosition: 'bottom',
        horizontalPosition: 'right',
        panelClass: ['snackbar']
      })

    })
    
  }

}
