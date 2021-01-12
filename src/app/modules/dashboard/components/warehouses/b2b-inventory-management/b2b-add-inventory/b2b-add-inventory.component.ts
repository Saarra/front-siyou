    
    import {B2bPreOrderComponent } from "../b2b-pre-order/b2b-pre-order.component";
import { Component, OnInit } from "@angular/core";
import { WarhouseService } from "src/app/shared/services/warhouse.service";
import { MatTableDataSource } from "@angular/material";
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from "@angular/animations";
import { SupplierService } from "src/app/shared/services/supplier.service";
import { OrderServiceService } from "src/app/shared/services/order-service.service";
import { MatSnackBar, MatDialog } from "@angular/material";
import { FormControl } from "@angular/forms";
import { Observable } from "rxjs/Observable";
import { map, startWith } from "rxjs/operators";
import { Router } from "@angular/router";
import { CategoriesService } from "src/app/shared/services/categories.service";
import { TranslateService } from '@ngx-translate/core';
export interface prod {
  product_description?:any
  arrived_quantity?: any;
  product_barcode?: any;
  product_quantity?: any;
  category_id?: any;
  product_status?: any;
  supplier_id?: any;
  product_name?: any;
  verified_quantity?:any;
}
@Component({
  selector: 'app-b2b-add-inventory',
  templateUrl: './b2b-add-inventory.component.html',
  styleUrls: ['./b2b-add-inventory.component.scss'],
  animations: [
    trigger("detailExpand", [
      state(
        "collapsed, void",
        style({ height: "0px", minHeight: "0", display: "none" })
      ),
      state("expanded", style({ height: "*" })),
      transition(
        "expanded <=> collapsed",
        animate("225ms cubic-bezier(0.4, 0.0, 0.2, 1)")
      ),
      transition(
        "expanded <=> void",
        animate("225ms cubic-bezier(0.4, 0.0, 0.2, 1)")
      ),
    ]),
  ],
})
export class B2bAddInventoryComponent implements OnInit {
  myControl = new FormControl();
  options: string[] = [];
  filteredOptions: Observable<string[]>;

  inventoriesList;
  inventoriesData;
  warehousesList;
  warehousesData;
 
  supp;
  suppList;
  statusList;
  status;
  batchList;
  batchN = "";
  batch;
  orderList;
  orderData;
  expandedElement: null;
  orderDisplayedColumns = [
    "product_name",
    "product_barcode",
    "product_description",
    "product_quantity",
    "arrived_quantity",
    "verified_quantity",
    "category_id",
  ];
  dataSource = new MatTableDataSource();
  constructor(
    private warehouseService: WarhouseService,
    private supplierService: SupplierService,
    private orderService: OrderServiceService,
    private snackbar: MatSnackBar,
    private router: Router,
    private dialog: MatDialog,
    private categoriesService: CategoriesService,
    public translate: TranslateService

  ) {}

  ngOnInit() {
    //this.onGetPreOrders();
    this.onGetWarehousesesList();
    this.onGetSuppliersList();
    this.onGetCategoryList();
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(""),
      map((value) => this._filter(value))
    );
  }
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(
      (option) => option.toLowerCase().indexOf(filterValue) === 0
    );
  }
  categoryList;
  categoryData;
  onGetCategoryList() {
    this.categoriesService.getCategoriesList().subscribe((res) => {
      this.categoryList = res;
    });
  }

  onGetWarehousesesList() {
    return this.warehouseService.GetWarehousesesListB2B().subscribe(
      (res) => {
        this.warehousesList = res;
        this.warehousesData = this.warehousesList.data;
      },
      (err) => {
        console.log(err);;
      }
    );
  }

  onGetSuppliersList() {
    return this.supplierService.getSupplierList().subscribe(
      (res) => {
        this.supp = res;
      },
      (err) => {
        console.log(err);;
      }
    );
  }

  onGetBatchNumber() {
    return this.warehouseService.GetBatchNumberB2B().subscribe(
      (res) => {
        this.batch = res;
        this.batchList = this.batch.data;
        this.batchN = this.batchList;
      },
      (err) => {
        console.log(err);;
      }
    );
  }


  _products: prod[] = [];
  //onAddInventory(_batch_number, _operator, _verifier, _warehouse_id, _supplier_id, _operator_status, _verifier_status, _products) {

  onAddInventory(_batch_number, _warehouse_id, _supplier_id) {
    if (!_batch_number || !_warehouse_id || !_supplier_id) {
      alert('Please insert the required inputs')
    } else { 
    var _inventory = {
      batch_number: _batch_number, 
      warehouse_id: _warehouse_id,
      supplier_id: _supplier_id,
      products: this._products
    };
    if (this._products.length == 0) {
      alert('Please Downlaod Products')
    } 
    else{  
       //console.log(_inventory);
    return this.warehouseService.addInventoryB2B(_inventory).subscribe(
      (res) => {
        // this.redirectTo(`/inventory-management`)
        this.router.navigate([`/inventory-management`]);

        this.snackbar.open(this.translate.currentLang === 'Chinese' ? "盘点已成功添加":this.translate.currentLang === 'Italian' ? "Inventario aggiunto con successo":"Inventory Added Successfully", "OK", {
          duration: 1000,
        });
        this._products.length == 0
      },
      (err) => {
        console.log(err);;
      }
    );
  }
}
}
CheckStat(_product_barcode){
  var _product_status;
  this._products.forEach(element => {
    if (element.product_barcode == _product_barcode) {
      if(element.product_quantity > element.arrived_quantity){
        _product_status= 2;
        }
        if(element.product_quantity == element.arrived_quantity) {
          _product_status= 3;
          }
      element.product_status=_product_status;
    }
  });

}
  changeQty(_product_description,_qty,_product_barcode,_product_quantity,_supplier_id,_product_name,_category_id) {
    var f = 0;
    if (this._products.length == 0) {
      var _prod = {
        product_description:_product_description,
         arrived_quantity: _qty,
         product_barcode:_product_barcode,
         product_quantity :_product_quantity,
         supplier_id:_supplier_id,
         product_name:_product_name,
         category_id:_category_id,
         product_status:2
      }
      this._products.push(_prod);
    } else {
      this._products.forEach(element => {
        if (element.product_barcode == _product_barcode) {
          f = 1;
          element.arrived_quantity = _qty;
        }
      });
      if (f == 0) {
        var __prod: prod = {
          product_description:_product_description,
          arrived_quantity: _qty,
          product_barcode:_product_barcode,
          product_quantity :_product_quantity,
          supplier_id:_supplier_id,
          product_name:_product_name,
          category_id:_category_id,
          product_status:2
        }
        this._products.push(__prod);
      }
    }

  }
changVer(_product_barcode,_verified_quantity){
  this._products.forEach(element => {
    if (element.product_barcode == _product_barcode) {
      element.verified_quantity=_verified_quantity
      }

})
}
  changeCat(_category_id,_product_barcode)
  {
      this._products.forEach(element => {
        if (element.product_barcode == _product_barcode) {
          element.category_id=_category_id
          }

    })
    //console.log(this._products)
  }

  redirectTo(uri: string) {
    this.router
      .navigateByUrl("/", { skipLocationChange: true })
      .then(() => this.router.navigate([uri]));
  }
  open() {
    let dialogRef = this.dialog.open(B2bPreOrderComponent);
    dialogRef.afterClosed().subscribe((res) => {
      this.orderData = [];
      this.dataSource.data = [];
      this.orderData = res.data;
      this.dataSource.data = this.orderData;
      //console.log(this.orderData)
      this.orderDisplayedColumns = [
        "product_name",
        "product_barcode",
        "product_description",
        "product_quantity",
        "arrived_quantity",
        "verified_quantity",
        "category_id",
      ];
    });
  }
}

