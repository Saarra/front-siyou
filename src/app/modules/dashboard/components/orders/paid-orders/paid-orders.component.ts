import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { OrderService } from 'src/app/core/services/order.service';
import { MatSnackBar, MatDialog } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-paid-orders',
  templateUrl: './paid-orders.component.html',
  styleUrls: ['./paid-orders.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0', visibility: 'hidden' })),
      state('expanded', style({ height: '*', visibility: 'visible' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class PaidOrdersComponent implements OnInit {
  orderList: any;
  expandedElement: null;
  orderDisplayedColumns = ['order_date', 'order_price', 'shop_owner', 'statut', 'actions'];

  
  orderLength=0;
  sumOrder=0;
  maxOrderPrice;
  maxOrderDate;
  minOrderPrice;
  minOrderDate;
  lastOrder;
  lastOrderPrice;
  lastOrderDate;
  // criteriaList: any;
  constructor(
     private orderService : OrderService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private router: Router) { }

  ngOnInit() {
    this.onGetPaidOrders();
  }
 

  onGetPaidOrders(){
    return this.orderService.getPaidOrders().subscribe(
      res =>{
        this.orderList = res;
        
        // Sum

        for (let el of this.orderList) {
          this.orderLength += 1;
          this.sumOrder += el.order_price;
        }

         // Max Order 

         let max = 0;
         this.orderList.forEach(oneData => {
           if (oneData.order_price > max) {
            max = oneData.order_price;

             this.maxOrderPrice = oneData.order_price;
             this.maxOrderDate = oneData.order_date
 
           }
         });

          // Min Order 

        let min = this.orderList[0];
        let minPrice= min.order_price;
        let minDate= min.order_date;
        this.orderList.forEach(oneData => {
          if (oneData.order_price < minPrice) {
            minPrice = oneData.order_price;
            this.minOrderPrice = oneData.order_price;
            this.minOrderDate = oneData.order_date

          }
          else{
            this.minOrderPrice = minPrice;
            this.minOrderDate= minDate;
          }
        });


        


        
        // last Fund

        this.lastOrder = this.orderList[this.orderList.length - 1];
        this.lastOrderPrice = this.lastOrder.order_price;
        this.lastOrderDate = this.lastOrder.order_date;
      }
    )
  }

  openOrderFullDetails(id: any){
   
    // this.redirectTo(`dashboard/order-details/${id}`);
    this.router.navigate([`dashboard/order-details/${id}`]);

    
  }

  redirectTo(uri:string){
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
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
