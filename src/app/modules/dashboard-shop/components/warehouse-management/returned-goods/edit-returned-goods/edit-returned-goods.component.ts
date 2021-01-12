import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { ProductsS2cService } from 'src/app/shared/services/products-s2c.service';

@Component({
  selector: 'app-edit-returned-goods',
  templateUrl: './edit-returned-goods.component.html',
  styleUrls: ['./edit-returned-goods.component.scss']
})
export class EditReturnedGoodsComponent implements OnInit {
  currentId;
  prods;
  prodsData;
  constructor(    private activatedRouter: ActivatedRoute,
    private router: Router,
    private productService: ProductsS2cService,
    )  
      {    
        activatedRouter.params.subscribe((params) => {
       this.currentId = params.id;
     });
    }

  ngOnInit() {
    this.onGetProductById(this.currentId);
  }
  currentProduct;
  currentProd;
  chainId
  onGetProductById(id) {
    return this.productService.getProductById(this.currentId).subscribe(
      (res) => {
        this.currentProduct = res;
        this.currentProd = this.currentProduct.data[0];
        this.chainId = this.currentProduct.data[0].chain_id;
      },
      (err) => {
        console.log(err);;
      }
    );
  }
  onAddReturn(item_return,barcode){
    var return_pro = {
      chain_id : this.chainId,
      barcode: barcode,
      item_return:item_return
    }
    return this.productService.addReturnQuantity(return_pro).subscribe(
      res=> {
        
        this.router.navigate(['/shop/returned-goods']); 

      }, err => {
        console.log(err);;
      }
    );
 }
 redirectTo(uri: string) {
  this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
    this.router.navigate([uri]));
}

}
