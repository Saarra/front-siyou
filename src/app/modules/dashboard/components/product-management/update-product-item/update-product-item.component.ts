import { Component, OnInit, Inject } from '@angular/core';
import { ProductsService } from 'src/app/shared/services/products.service';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/shared/models/product.model';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-update-product-item',
  templateUrl: './update-product-item.component.html',
  styleUrls: ['./update-product-item.component.scss']
})
export class UpdateProductItemComponent implements OnInit {
  currentProd;
  currentId;

  constructor(
    private productService: ProductsService,
    private router: ActivatedRoute,
    private route: Router,
    private snackbar: MatSnackBar,
    public translate: TranslateService


    
  ) {
    router.params.subscribe(
      params=>{
        this.currentId = params.id;
      }
    );
   }

  ngOnInit() {
    this.ongetProductItem(this.currentId);
  }

  ongetProductItem(id: number){
    return this.productService.getProductItem(id).subscribe(
      res=>{
        this.currentProd = res;
      }
    )
  }

  redirectTo(uri:string){
    this.route.navigateByUrl('/', {skipLocationChange: true}).then(()=>
    this.route.navigate([uri]));
 }



  onUpdateProduct(_item_barcode, _item_online_price, _item_offline_price, _item_quantity, _item_warn_quantity, _item_package, _item_box){
   
    var parseOnline = parseFloat(_item_online_price);
    var parseOffline = parseFloat(_item_offline_price);
    var parseQty = parseInt(_item_quantity);
    var parseWarnQty = parseInt(_item_warn_quantity);
    var parseItemPack = parseInt(_item_package);
    var parseItemBox = parseInt(_item_box);

    
    var _prod : CurrentProduct = {
      item_barcode: _item_barcode,
      item_online_price: parseOnline,
      item_offline_price: parseOffline,
      item_quantity: parseQty,
      item_warn_quantity: parseWarnQty,
      item_package: parseItemPack,
      item_box: parseItemBox,
      criteria_list:[],
      item_images:[]
    
    }

    this.currentProd.criteria_base.forEach(element=>{
      var criteria: Criterias ={
        criteria_id : element.id,
        criteria_value : element.pivot.criteria_value,
        criteria_unit_id: element.pivot.criteria_unit_id
      }
      _prod.criteria_list.push(criteria);
      
    });

    this.currentProd.images.forEach(element=>{
      _prod.item_images.push(element.id);
    })


    return this.productService.editProductItem(this.currentId, _prod).subscribe(
      res=>{
        // this.redirectTo('/dashboard/products-list');
        this.route.navigate(['dashboard/products-list']);

        this.snackbar.open(this.translate.currentLang === 'Chinese' ?'产品已成功更新':this.translate.currentLang === 'Italian' ? "Prodotto aggiornato con successo":'Product Updated Successfully', 'OK', {
          duration: 2000
        });
      }, err=>{
        console.log(err);;
      }
    )
    
    
  }
}



export interface CurrentProduct{
  item_barcode: number,
  item_online_price: any,
  item_offline_price: any,
  item_quantity: number,
  item_warn_quantity: number,
  item_package: number,
  item_box: number,
  criteria_list: Criterias[],
  item_images: any[]

}

export interface Criterias {
  criteria_id: number,
  criteria_value: any,
  criteria_unit_id: any
}
