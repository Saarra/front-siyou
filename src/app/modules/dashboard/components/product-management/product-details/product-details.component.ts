import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ProductsService } from 'src/app/shared/services/products.service';
import { Router, ActivatedRoute } from '@angular/router';

declare var $: any;

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
  // encapsulation: ViewEncapsulation.Native
})
export class ProductDetailsComponent implements OnInit {



 
  currentId;

  currentProduct:any;

  constructor(
    private productService: ProductsService,
    private router: ActivatedRoute
  ) 
  { 
     router.params.subscribe(params=>{
       this.currentId=params.id;
     }) ;

     
     

  }

  ngOnInit() {
    this.onGetProductItem(this.currentId);

  }

  onGetProductItem(currentId){
    return this.productService.getProductItem(currentId).subscribe(
      res=>{
        this.currentProduct= res;

        
      }, err=>{
        console.log(err);; 
      }
    );
  }

  CheckColor(Attr:any){

    if (Attr === 'color'){
      
      return true;
    }else{
      return false;
    }

  }


  getColor(colorValue: any){
  }

  setToMainImg(url: any){
    
    $("#secondary-img div img").click(function(){

      const secimg= $(this).attr("src");
      $("#main-img").attr("src", secimg);
    });
    
  }


}
