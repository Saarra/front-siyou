import { Component, OnInit } from '@angular/core';
import { WarhouseService } from 'src/app/shared/services/warhouse.service';
import { MatTableDataSource } from '@angular/material';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { MatSnackBar } from '@angular/material';
import { Router ,ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
export interface prod {
  product_quantity?:any,
  product_barcode: any,
  added_quantity?: any,
  product_status?:any,
  verified_quantity?:any
}
@Component({
  selector: 'app-b2b-edit-inventory',
  templateUrl: './b2b-edit-inventory.component.html',
  styleUrls: ['./b2b-edit-inventory.component.scss']
})
export class B2bEditInventoryComponent implements OnInit {

  statusList;
  status;

  currentDataP;
  currentId;
  currentInventory;
  currentData;
  inventoryList;
  inventoryData;
  create;
update;
  displayedColumns = [ 'product_name','product_barcode','unit_price','product_quantity','warehouse_quantity','verified_quantity'];
  dataSource = new MatTableDataSource<any>(this.currentDataP);
  constructor(
    private warehouseService: WarhouseService,
    private snackbar: MatSnackBar,
    private activatedRouter: ActivatedRoute,
    private router: Router,
    public translate: TranslateService


  ) {
    activatedRouter.params.subscribe(params => {
      this.currentId = params.id;
    })
  }


  ngOnInit() {
    this.onGetStatusList();
    this.onGetInventoryById();

  }

  onGetInventoryById() {
    return this.warehouseService.getInventoryByIdB2B(this.currentId).subscribe(
      res => {
        this.currentInventory = res;
        this.currentData = this.currentInventory.data[0];
        this.create=this.currentData.created_at
        this.update=this.currentData.updated_at
        this.currentDataP =  this.currentData.products
        this.displayedColumns = [ 'product_name','product_barcode','unit_price','product_quantity','warehouse_quantity','verified_quantity'];
        this.dataSource = new MatTableDataSource<any>(this.currentDataP);
      },
      err => {
        console.log(err);;
      }
    );
  }

  onGetStatusList() {
    return this.warehouseService.GetStatusList().subscribe(
      res => {
        this.status = res;
        this.statusList = this.status.data;
      }, err => {
        console.log(err);;
      }
    );
  }
  
  
  _products: prod[] = [];

  onUpdateInventory() {
    var _inventory = {
      products: this._products
    }
    //console.log(_inventory)
    return this.warehouseService.updateInventoryB2B(this.currentId,_inventory).subscribe(
      res => {
        // this.redirectTo(`/inventory-management`)
        this.router.navigate([`/inventory-management`]);

        this.snackbar.open(this.translate.currentLang === 'Chinese' ? "盘点已成功添加":this.translate.currentLang === 'Italian' ? "Inventario aggiornato correttamente":"Inventory Updated Successfully", '' ,{
          
            duration: 1000
          });
      }, err => {
        console.log(err);;
      }
    );



  }
checkStatus(){
  var _product_status;
  this._products.forEach(element => {
    if(element.product_quantity > element.added_quantity){
      _product_status= 2;
      }
      if(element.product_quantity == element.added_quantity) {
        _product_status= 3;
        }
        element.product_status=_product_status;
      
      
      })
  }

  changeQty(_product_quantity,_product_barcode, _qty) {
    var f = 0;

    if (this._products.length == 0) {
      var _prod = {
        product_quantity:_product_quantity,
        product_barcode: _product_barcode,
        added_quantity: _qty
      }
      this._products.push(_prod);
    } else {
      this._products.forEach(element => {
        if (element.product_barcode == _product_barcode) {
          f = 1;
          element.added_quantity = _qty;
        }
      });
      if (f == 0) {
        var __prod: prod = {
          product_quantity:_product_quantity,
          product_barcode: _product_barcode,
          added_quantity: _qty
        }
        this._products.push(__prod);
      }



    }
  }
  changeVer(_product_quantity,_product_barcode,_qty,_verified_quantity) {
    var f = 0;

    if (this._products.length == 0) {
      var _prod = {
        product_quantity:_product_quantity,
        product_barcode: _product_barcode,
        verified_quantity:_verified_quantity,
        added_quantity:_qty
      }
      this._products.push(_prod);
    } else {
      this._products.forEach(element => {
        f = 1;
        if (element.product_barcode == _product_barcode) {
          element.verified_quantity = _verified_quantity
        }
      });
      if (f == 0) {
        var __prod: prod = {
          product_quantity:_product_quantity,
          product_barcode: _product_barcode,
          verified_quantity:_verified_quantity,
          added_quantity:_qty

        }
        this._products.push(__prod);
      }



    }
  }
  
 
  redirectTo(uri:string){
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
    this.router.navigate([uri]));
 }

}

