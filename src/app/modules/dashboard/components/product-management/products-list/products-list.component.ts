import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/shared/services/products.service';
import { Router } from '@angular/router';
import { MatSnackBar, MatDialog } from '@angular/material';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { DeleteProductComponent } from '../modals/delete-product/delete-product.component';
import { DeleteProductItemComponent } from '../modals/delete-product-item/delete-product-item.component';
import { UpdateProductItemComponent } from '../update-product-item/update-product-item.component';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss'],
  animations: [                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0', visibility: 'hidden' })),
      state('expanded', style({ height: '*', visibility: 'visible' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ProductsListComponent implements OnInit {

  productList: any;
  data;
  expandedElement: null;
  orderDisplayedColumns = ['product_image_url', 'product_name', 'product_description', 'brand_name', 'category_name', 'actions'];


  
  prodLength=0;
  prodItemsLength=0;
  sumProd=0;
  maxProdPrice;
  maxProdDate;
  minProdPrice;
  minProdDate;
  lastProd;
  lastProdPrice;
  lastProdDate;

  keywordInit='' ;
  barcodeInit='';



  constructor(
    private productService: ProductsService,
    private router: Router,
    private snackbar : MatSnackBar,
    private dialog: MatDialog

  ) { }

  ngOnInit() {
    this.onGetFullProductList(this.keywordInit, this.barcodeInit);
  }

  onGetFullProductList(_keyword?, _barcode?){
    return this.productService.getFullProductList(_keyword, _barcode).subscribe(
      res =>{
        this.productList = res;
       this.data= this.productList.data ;

         // Sum

         for (let el of this.data) {
          this.prodLength += 1;
          // this.sumProd += el.order_price;
          for(let el_it of el.items){
            let a = parseInt(el_it.item_offline_price);
            this.sumProd += a;
            this.prodItemsLength +=1;
          }
        }


           // Max Order 

           let max = 0;
           this.data.forEach(oneData => {
             for (let el of oneData.items){
              if (el.item_offline_price > max) {
                max = el.item_offline_price;
                this.maxProdPrice = el.item_offline_price;
                this.maxProdDate = el.created_at
              } 
             }
            
           });
           



             // Min Order 

        let min = this.data[0];
        let minPriceItem= min.items[0];
        let minPrice= minPriceItem.item_offline_price;
        // let minDateItem= min.items[0];
        let minDate = minPriceItem.created_at;
        this.data.forEach(oneData => {

          for (let el of oneData.items){
            if (el.item_offline_price < minPrice) {
              minPrice= el.item_offline_price;
              this.minProdPrice = el.item_offline_price;
              this.minProdDate = el.created_at;
            }

           else{
            this.minProdPrice = minPrice;
            this.minProdDate= minDate;
          }
        }}
        );



         // last Fund

         this.lastProd = this.data[this.data.length - 1];
         this.lastProdDate = this.lastProd.created_at;



      }, err =>{
        console.log(err);;
      }
    );
  }

  redirectTo(uri:string){
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
    this.router.navigate([uri]));
 }

 checkImageNull(img?:any ){
    
  if (img == null){
    return true;
  }else {
    return false;
  }

 }
 openDeleteProductBase( data: any){

  this.dialog.open(DeleteProductComponent, {data});

 }

 openDeleteItemModalComponent(data: any){
   
  this.dialog.open(DeleteProductItemComponent, {data});
    
 }

 openUpdateProdItem(data: any){
   this.dialog.open(UpdateProductItemComponent, {data})
 }

 
 applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.data.filter = filterValue.trim().toLowerCase();

  if (this.data.paginator) {
    this.data.paginator.firstPage();
  }
}

}
