import { Component, OnInit } from '@angular/core';
import { PurchaseService } from 'src/app/shared/services/purchase.service';
import { MatTableDataSource } from '@angular/material';
import { OrderServiceService } from 'src/app/shared/services/order-service.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-shop-order-full-details',
  templateUrl: './shop-order-full-details.component.html',
  styleUrls: ['./shop-order-full-details.component.scss']
})
export class ShopOrderFullDetailsComponent implements OnInit {

  supplier;
  currentId;
  currentOrder;

  constructor(
    private orderService: OrderServiceService,
    private router: ActivatedRoute
  ) { 
    router.params.subscribe(params=>{
       this.currentId= params.id;
   
    })
  }

  ngOnInit() {
    
    this.onGetOrderById();
  }

  onGetOrderById(){
     return this.orderService.getOrderById(this.currentId).subscribe(
       res=>{
          this.currentOrder= res;
          console.log(res)
       }, err=>{
         console.log(err);;
       }
     );
  }



}
