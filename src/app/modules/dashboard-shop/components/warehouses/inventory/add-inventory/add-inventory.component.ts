import { PreOrdersComponent } from "./../../../warehouse-management/pre-orders/pre-orders.component";
import { Component, OnInit } from "@angular/core";
import { WarhouseService } from "src/app/shared/services/warhouse.service";
import { MatTableDataSource } from "@angular/material";
import { ChainService } from "src/app/shared/services/chain.service";
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from "@angular/animations";
import { SupplierS2cService } from "src/app/shared/services/supplier-s2c.service";
import { OrderServiceService } from "src/app/shared/services/order-service.service";
import { MatSnackBar, MatDialog } from "@angular/material";
import { FormControl } from "@angular/forms";
import { Observable } from 'rxjs/Observable';
import { map, startWith } from "rxjs/operators";
import { Router } from "@angular/router";
import { CategoriesService } from "src/app/shared/services/categories.service";
import { TranslateService } from '@ngx-translate/core';
export interface prod {
  arrived_quantity?: any;
  product_barcode?: any;
  product_quantity?: any;
  category_id?: any;
  product_status?: any;
  supplier_id?: any;
  product_name?: any;
  verified_quantity?: any;
}
@Component({
  selector: "app-add-inventory",
  templateUrl: "./add-inventory.component.html",
  styleUrls: ["./add-inventory.component.scss"],
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
export class AddInventoryComponent implements OnInit {
  myControl = new FormControl();
  options: string[] = [];
  filteredOptions: Observable<string[]>;
  inventoriesList;
  inventoriesData;
  warehousesList;
  warehousesData;
  chain;
  chainData;
  supp;
  suppList;
  statusList;
  status;
  batchList;
  batchN = "";
  batch;
  orderList;
  _products;
  orderData;
  expandedElement: null;
  orderDisplayedColumns = [
    "product_name",
    "product_barcode",
    "product_quantity",
    "arrived_quantity",
    "verified_quantity",
    "tax_rate",
    "category_id",
  ];
  dataSource = new MatTableDataSource();
  constructor(
    private warehouseService: WarhouseService,
    private chainService: ChainService,
    private supplierService: SupplierS2cService,
    private orderService: OrderServiceService,
    private snackbar: MatSnackBar,
    private router: Router,
    private dialog: MatDialog,
    private categoriesService: CategoriesService,
    private translate : TranslateService
  ) { }
  ngOnInit() {
    this.onGetChainList();
    this.onGetSuppliersList();
    this.onGetStatusList();
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
    this.categoriesService.getCategories().subscribe((res) => {
      this.categoryList = res;
      this.categoryData = this.categoryList.data;
      //console.log(this.categoryList);
    });
  }
  onGetWarehousesesList(chain_id) {
    return this.warehouseService.GetWarehousesesList(chain_id).subscribe(
      (res) => {
        this.warehousesList = res;
        this.warehousesData = this.warehousesList.data;
      },
      (err) => {
        console.log(err);;
      }
    );
  }
  onGetChainList() {
    return this.chainService.getChainList().subscribe(
      (res) => {
        this.chain = res;
        this.chainData = this.chain.data;
      },
      (err) => {
        console.log(err);;
      }
    );
  }
  onGetSuppliersList() {
    return this.supplierService.GetSuppliersListS2C().subscribe(
      (res) => {
        this.supp = res;
        this.suppList = this.supp.data;
        //console.log(this.suppList);
      },
      (err) => {
        console.log(err);;
      }
    );
  }
  onGetStatusList() {
    return this.warehouseService.GetStatusList().subscribe(
      (res) => {
        this.status = res;
        this.statusList = this.status.data;
      },
      (err) => {
        console.log(err);;
      }
    );
  }
  onGetBatchNumber() {
    return this.warehouseService.GetBatchNumber().subscribe(
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
  open() {
    let dialogRef = this.dialog.open(PreOrdersComponent);
    dialogRef.afterClosed().subscribe((res) => {
      this.dataSource.data = [];
      this.orderData = res.data;
      //console.log(this.orderData);
      this.dataSource.data = this.orderData;
      this._products = this.orderData;
      this.orderDisplayedColumns = [
        "product_name",
        "product_barcode",
        "product_quantity",
        "arrived_quantity",
        "verified_quantity",
        "tax_rate",
        "category_id",
      ];
      //console.log(this.orderData)
    });
  }
  onAddInventory(_chain_id, _batch_number, _warehouse_id, _supplier_id) {
    //console.log(this._products);
    if (!_chain_id || !_batch_number || !_warehouse_id || !_supplier_id) {
      alert("Please insert the required inputs");
    } else {
      var _inventory = {
        batch_number: _batch_number,
        chain_id: _chain_id,
        warehouse_id: _warehouse_id,
        supplier_id: _supplier_id,
        products: this._products,
      };
      //console.log(_inventory);
      return this.warehouseService.addInventory(_inventory).subscribe(
        (res) => {
          // this.redirectTo(`/shop/inventory`);
          this.router.navigate([`/shop/inventory`]);

          this.snackbar.open(this.translate.currentLang === 'Chinese' ? "盘点已成功添加":this.translate.currentLang === 'Italian' ? "Inventario aggiunto con successo":"Inventory Added Successfully", "OK", {
            duration: 1000,
          });
        },
        (err) => {
          console.log(err);;
        }
      );
    }
  }
  CheckStat(_product_barcode) {
    var _product_status;
    this._products.forEach((element) => {
      if (element.product_barcode == _product_barcode) {
        if (element.product_quantity > element.arrived_quantity) {
          _product_status = 2;
        }
        if (element.product_quantity == element.arrived_quantity) {
          _product_status = 3;
        }
        element.product_status = _product_status;
      }
    });
  }
  changeQty(
    _qty,
    _product_barcode,
    _product_quantity,
    _supplier_id,
    _product_name,
    _category_id
  ) {
    var f = 0;
    if (this._products.length == 0) {
      var _prod = {
        arrived_quantity: _qty,
        product_barcode: _product_barcode,
        product_quantity: _product_quantity,
        supplier_id: _supplier_id,
        product_name: _product_name,
        category_id: _category_id,
        product_status: 2,
      };
      this._products.push(_prod);
    } else {
      this._products.forEach((element) => {
        if (element.product_barcode == _product_barcode) {
          f = 1;
          element.arrived_quantity = _qty;
        }
      });
      if (f == 0) {
        var __prod: prod = {
          arrived_quantity: _qty,
          product_barcode: _product_barcode,
          product_quantity: _product_quantity,
          supplier_id: _supplier_id,
          product_name: _product_name,
          category_id: _category_id,
          product_status: 2,
        };
        this._products.push(__prod);
      }
    }
    //console.log(this._products);
  }
  changVer(_product_barcode, _verified_quantity) {
    this._products.forEach((element) => {
      if (element.product_barcode == _product_barcode) {
        element.verified_quantity = _verified_quantity;
      }
    });
    //console.log(this._products);
  }
  changeCat(_category_id, _product_barcode) {
    this._products.forEach((element) => {
      if (element.product_barcode == _product_barcode) {
        element.category_id = _category_id;
      }
    });
    //console.log(this._products);
  }
  redirectTo(uri: string) {
    this.router
      .navigateByUrl("/", { skipLocationChange: true })
      .then(() => this.router.navigate([uri]));
  }
  chooseAllCat(categoryAll) {
    this._products.forEach((element) => {
      element.category_id = categoryAll
    });
    //console.log(this._products)
  }
  selectedVariable: any;
  onSelectionChange(opened: boolean) {
    if (!opened && this.selectedVariable) {
      //console.log(this.selectedVariable);
    }
  }
  selected = 'option2';
}
