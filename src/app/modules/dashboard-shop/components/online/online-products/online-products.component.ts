import { Component, OnInit, ViewChild } from "@angular/core";
import {
  MatPaginator,
  MatSort,
  MatTableDataSource,
  MatSnackBar,
} from "@angular/material";
import { SelectionModel } from "@angular/cdk/collections";
import { ProductsService } from "src/app/shared/services/products.service";
import { DiscountService } from "src/app/shared/services/discount.service";
import { DatePipe } from "@angular/common";
import { Router } from "@angular/router";
import { PeriodicElement } from "src/app/modules/superadmin/components/commission-list/commission-list.component";
import { ProductsS2cService } from "src/app/shared/services/products-s2c.service";
import { ChainService } from "src/app/shared/services/chain.service";
import { TranslateService } from "@ngx-translate/core";
import { OnlineService } from 'src/app/shared/services/online.service';
import { PagerService } from 'src/app/shared/services/pager.service'
import { CategoriesService } from 'src/app/shared/services/categories.service';
export interface onlineProd {
  barcode: any;
  name: any;
  price: any;
  slug: any;
  store: any;
  available?: boolean;
  qty?: any;
}
@Component({
  selector: "app-online-products",
  templateUrl: "./online-products.component.html",
  styleUrls: ["./online-products.component.scss"],
})
export class OnlineProductsComponent implements OnInit {
  date;
  selecteditems;
  productItemsList;
  data;
  discountTypes;
  discountData;
  chain;
  chainData;
  store_name;
  barcodeInit = "";
  keywordInit = "";
  pager: any = {};
  page;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  displayedColumns: string[] = [
   
  ];
  cost_price= localStorage.getItem('cost_price')
  dataSource = new MatTableDataSource<any>();
  selection = new SelectionModel<any>(true, []);
  displayedColumns1: string[] = [
    "product_name",
    "online_quantity"
  ];
  dataSource1;
  constructor(
    private productService: ProductsS2cService,
    private discountService: DiscountService,
    public datepipe: DatePipe,
    private snackbar: MatSnackBar,
    private router: Router,
    private chainService: ChainService,
    public translate: TranslateService,
    public onlineService: OnlineService,
    private pagerService: PagerService,
    private categoryService: CategoriesService,
    private snackBar: MatSnackBar,
  ) { }
  ngOnInit() {
    this.onGetChainList();
    this.onGetStoreId();
    this.setPage(1);
    this.onGetCategoriesList();
  }
  setPage(page: number) {
    if (page < 1 || page > this.pager.totalPages) {
      return;
    }
    this.pager = this.pagerService.getPager(this.last_page, page);
    this.page = page;
  }
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }
  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.data.forEach((row) => this.selection.select(row));
    this.selecteditems = this.selection.selected;
  }
  checkboxLabel(row?: PeriodicElement): string {
    if (!row) {
      return `${this.isAllSelected() ? "select" : "deselect"} all`;
    }
    return `${this.selection.isSelected(row) ? "deselect" : "select"} row ${row.position + 1
      }`;
  }
  getCheckeditems() {
    this.selecteditems = this.selection.selected;
  }
  catList;
  categoryData;
  onGetCategoriesList() {
    return this.categoryService.getCategories().subscribe(
      res => {
        this.catList = res;
        this.categoryData=this.catList.data;

      }, err => {
        console.log(err);;
      }
    );
  }
  store;
  storeId
  onGetStoreId() {
    var store_name = localStorage.getItem('store_name').replace(/['"]+/g, '');
    return this.onlineService.getStoreId(store_name).subscribe(
      (res) => {
        this.store = res;
        this.storeId = this.store.id
      }
    );
  }
  changeQty(_qty,
    _product_barcode,
    _product_name,
    _product_price) {
    var f = 0;
    if (this._online.length == 0) {
      var product = {
        barcode: _product_barcode,
        name: _product_name,
        price: _product_price,
        slug: _product_name.replace(/\W+/g, "-"),
        store: this.store.id,
        available: true,
        qty: _qty
      };
      this._online.push(product);
    }
    else {
      this._online.forEach((element) => {
        if (element.barcode == _product_barcode) {
          f = 1;
          element.qty = _qty;
        }
      });
      if (f == 0) {
        var __prod: onlineProd = {
          barcode: _product_barcode,
          name: _product_name,
          price: _product_price,
          slug: _product_name.replace(/\W+/g, "-"),
          store: this.store.id,
          available: true,
          qty: _qty
        };
        this._online.push(__prod);
      }
    }
    //console.log(this._online);
  }
  _online: onlineProd[] = [];
  onSubmit() {
    this._online.forEach((element) => {
      return this.onlineService.addOnlineProducts(element).subscribe(
        (res) => {
          this.snackBar.open('Products Successfully Added', "OK", {
            duration: 1000,
          });
        },
        (err) => {
          console.log(err);;
        }
      )
    });
  }
  prods;
  prodsData;
  last_page: number;
  onGetProdsListS2C(page, chain_id?, category_id?, barcode?, keyword?, range_id?) {
    if (chain_id == 0 || !chain_id) {
      chain_id = ''
    }
    if (category_id == 0 || !category_id) {
      category_id = ''
    }
    if (barcode == 0 || !barcode) {
      barcode = ''
    }
    if (keyword == 0 || !keyword) {
      keyword = ''
    }
    if (range_id == 0 || !range_id) {
      range_id = ''
    }
    return this.productService.getProdsListS2C(this.page, chain_id, category_id, barcode, keyword, range_id).subscribe(
      res => {
        this.prods = res;
        this.prodsData = this.prods.data;
        this.dataSource.data = this.prodsData;
        this.last_page = this.prods.last_page;
        this.displayedColumns = [
          "select",
          "product_image",
          "product_name",
          "product_barcode",
          "product_quantity",
          "cost_price"
        ];
        if(this.cost_price == '0'){
          this.displayedColumns = [
            "select",
            "product_image",
            "product_name",
            "product_barcode",
            "product_quantity",
            "cost_price"
          ];
        }
        if(this.cost_price == '1'){

          this.displayedColumns = [
            "select",
            "product_image",
            "product_name",
            "product_barcode",
            "product_quantity"
         
          ];
        }
        this.displayedColumns1 = [
          "product_name",
          "online_quantity"
        ];
        this.dataSource1 = this.selecteditems;
        //console.log(this.prods)
      }, err => {
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
  redirectTo(uri: string) {
    this.router
      .navigateByUrl("/", { skipLocationChange: true })
      .then(() => this.router.navigate([uri]));
  }
}
