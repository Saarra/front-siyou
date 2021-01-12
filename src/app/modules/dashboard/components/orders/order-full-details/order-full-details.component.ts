import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/core/services/order.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-order-full-details',
  templateUrl: './order-full-details.component.html',
  styleUrls: ['./order-full-details.component.scss']
})
export class OrderFullDetailsComponent implements OnInit {
  
  supplier;
  currentId;
  currentOrder;

  constructor(
    private orderService: OrderService,
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
