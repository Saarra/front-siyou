import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { CriteriaService } from 'src/app/shared/services/criteria.service';
import { MatSnackBar, MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { AddCriteriaComponent } from 'src/app/modules/superadmin/components/modals/criteria-modals/add-criteria/add-criteria.component';
import { AddUnitModalComponent } from 'src/app/modules/superadmin/components/modals/unit-modals/add-unit-modal/add-unit-modal.component';
import { EditCriteriaComponent } from 'src/app/modules/superadmin/components/modals/criteria-modals/edit-criteria/edit-criteria.component';
import { DeleteCriteriaComponent } from 'src/app/modules/superadmin/components/modals/criteria-modals/delete-criteria/delete-criteria.component';
import { EditUnitModalComponent } from 'src/app/modules/superadmin/components/modals/unit-modals/edit-unit-modal/edit-unit-modal.component';
import { DeleteUnitModalComponent } from 'src/app/modules/superadmin/components/modals/unit-modals/delete-unit-modal/delete-unit-modal.component';
import { OrderService } from 'src/app/core/services/order.service';
import { TranslateService } from '@ngx-translate/core';



@Component({
  selector: 'app-invalid-orders',
  templateUrl: './invalid-orders.component.html',
  styleUrls: ['./invalid-orders.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0', visibility: 'hidden' })),
      state('expanded', style({ height: '*', visibility: 'visible' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class InvalidOrdersComponent implements OnInit {
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
    private router: Router,
    public translate: TranslateService
    ) { }

  ngOnInit() {
    this.onGetInvalidOrders();
  }
  onGetInvalidOrders(){
    return this.orderService.getInvalidOrders().subscribe(
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

          }else{
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

  validateOrder(orderId: number){
    const status= {
      status: 'confirm'
    }
    if(confirm("Are you sure you want to validate this order?")) {
      return this.orderService.validateOrder(orderId, status).subscribe(
      res=>{
        this.router.navigate([`dashboard/invalid-orders`]);

      //this.redirectTo('dashboard/invalid-orders');
      this.snackBar.open(this.translate.currentLang === 'Chinese' ? '订单已成功更新':this.translate.currentLang === 'Italian' ? "Ordine aggiornato con successo": 'Order Successfully Updated', '', {
        duration: 2000
      });
      }, err=>{
        console.log(err);;
      }
    );}

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
