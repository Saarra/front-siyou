import { Component, OnInit, ViewChild } from "@angular/core";
import {
  MatPaginator,
  MatSort,
  MatTableDataSource,
  MatSnackBar,
} from "@angular/material";
import { SelectionModel } from "@angular/cdk/collections";
import { DiscountService } from "src/app/shared/services/discount.service";
import { DatePipe } from "@angular/common";
import { Router } from "@angular/router";
import { PeriodicElement } from "src/app/modules/superadmin/components/commission-list/commission-list.component";
import { ProductsS2cService } from "src/app/shared/services/products-s2c.service";
import { ChainService } from "src/app/shared/services/chain.service";
import { TranslateService } from "@ngx-translate/core";
import { PagerService } from 'src/app/shared/services/pager.service'
import { CategoriesService } from 'src/app/shared/services/categories.service';
import { SupplierS2cService } from 'src/app/shared/services/supplier-s2c.service';
import { PurchaseService } from 'src/app/shared/services/purchase.service';
import { ExcelService } from "src/app/shared/services/excel.service";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
export interface purchaseProd {
  product_id: any;
  purchased_quantity: any;

}
export interface purchasePro{
  product_id: any;
  product_barcode : any
  purchased_quantity: any;
  supplier : any ; 
  product_name : any

}
@Component({
  selector: 'app-add-quick-purchase',
  templateUrl: './add-quick-purchase.component.html',
  styleUrls: ['./add-quick-purchase.component.scss']
})
export class AddQuickPurchaseComponent implements OnInit {
  date;
  selecteditems;
  cost_price= localStorage.getItem('cost_price')
  productItemsList;
  data;
  discountTypes;
  discountData;
  chain;
  chainData;
  store_name;
  barcodeInit = "";
  keywordInit = "";
  prodLength;
  allItems;
  pager: any = {};
  pager2: any = {};
  filtred = false;
 page :number = 1;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  displayedColumns: string[] = [
    "select",
    "product_image",
    "product_name",
    "product_barcode",
    "product_quantity",
    "cost_price"
  ];
  dataSource = new MatTableDataSource<any>();
  selection = new SelectionModel<any>(true, []);

  displayedColumns1: string[] = [
    "product_name",
    "product_barcode",
    "product_quantity",
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
    private pagerService: PagerService,
    private categoryService: CategoriesService,
    private snackBar: MatSnackBar,
    private supplierService : SupplierS2cService,
    private purchaseService :PurchaseService,
    private excelService: ExcelService,
    private http: HttpClient,


  ) {}

  ngOnInit() {
    this.onGetSuppliers();
    this.onGetChainList();

    this.onGetCategoriesList();
    this.onGetProdsS2C(this.page);

    this.http
      .get(`${environment.BaseUrlS2C}/Product/all`, {
        params: {
          token: localStorage.getItem("token"),
        },
      })
      .subscribe((data) => {
        this.allItems = data;
        this.prodLength = this.allItems.total;
        this.pager = this.pagerService.getPager(this.prodLength, 1);
      });
  
  }
  

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.data.forEach((row) => this.selection.select(row));
    this.selecteditems = this.selection.selected;
  }
  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: PeriodicElement): string {
    if (!row) {
      return `${this.isAllSelected() ? "select" : "deselect"} all`;
    }
    return `${this.selection.isSelected(row) ? "deselect" : "select"} row ${
      row.position + 1
    }`;
  }
  getCheckeditems() { 
    this.selecteditems = this.selection.selected;
}
  catList;
  catData;
  onGetCategoriesList() {
    return this.categoryService.getCategories().subscribe(
      res => {
        this.catList = res;
        this.catData = this.catList.data;

      }, err => {
        console.log(err);;
      }
    );
  }
  suppliersList;
  suppliers;
  onSearchChange(searchValue: string): void {  
    this.suppliers = this.suppliers.filter(supplier=>{return supplier.supplier_name.toLowerCase().indexOf(searchValue.toLowerCase())>=0})
    if(searchValue.length==0) {
      this.onGetSuppliers();
    }
  }
  filterSupplier(supp) {
    this.suppliers=this.suppliers.filter(supplier=> supplier.name.indexof(supp)>=0)
  }
  onGetSuppliers() {
    return this.supplierService.GetSuppliersListS2C().subscribe(
      (res) => {
        this.suppliersList = res;
        this.suppliers = this.suppliersList.data;
       
      },
      (err) => {
        console.log(err);;
      }
    );
  }
store;
storeId


rempli :boolean = false;
  changeQty(purchased_quantity,id){
    var f = 0;
    
      if (this._online.length == 0) {
     var product = {
      product_id : id ,
    purchased_quantity:purchased_quantity
    };
    this._online.push(product);

  }
  else {
    this._online.forEach((element) => {
      if (element.product_id == id) {
        f = 1;
        element.purchased_quantity = purchased_quantity;
      }
    });
    if (f == 0) {
      var __product = {
        product_id : id ,
        purchased_quantity:purchased_quantity
        };
      this._online.push(__product);
    }
  }
  if (this._online.length  === this.selecteditems.length){
    this.rempli  = true;
  }

}


exportPurchase : purchasePro[] = [];


changePurchase(purchased_quantity,id,product_barcode,supplier,product_name){
  var f = 0;
  if (this.exportPurchase.length == 0) {
 var product = {
  product_id: id,
  product_barcode : product_barcode,
  purchased_quantity: purchased_quantity,
  supplier : supplier ,
  product_name : product_name
};
this.exportPurchase.push(product);

}
else {
this.exportPurchase.forEach((element) => {
  if (element.product_id == id) {
    f = 1;
    element.purchased_quantity = purchased_quantity;
  }
});
if (f == 0) {
  var __product = {
    product_id: id,
    product_barcode : product_barcode,
    purchased_quantity: purchased_quantity,
    supplier : supplier ,
    product_name : product_name
    };
  this.exportPurchase.push(__product);
}
}
//console.log(this.exportPurchase);

}


  _online: purchaseProd[] = [];
  
  onSubmit(supplier_id,chain_id) {
    var pur = {
      supplier_id:supplier_id,
      chain_id:chain_id , 
      products : this._online
    }
   //console.log(pur)
      return this.purchaseService.addPurchasedQuick(pur).subscribe(
        (res) => {
          this.snackBar.open(this.translate.currentLang === 'Chinese' ? "快速采购已成功添加":this.translate.currentLang === 'Italian' ? "Acquisto rapido aggiunto con successo":'Quick Purchase Successfully Added', '',{
                        duration: 1000,
          }); 
          // this.redirectTo('shop/quick-purchase');
          this.router.navigate([`shop/quick-purchase`]);

         },
        (err) => {
          console.log(err);;
        }
      )
    
  }

  prods;
  prodsData;
  prodsLength;
  last_page: number;
  onGetProdsListS2C(
    page,
    chain_id?,
    supplier_id?,
    keyword?
  ) {
    this.filtred = true;
    if (chain_id == 0 || !chain_id) {
      chain_id = "";
    }
 
    if (supplier_id == 0 || !supplier_id) {
      supplier_id = "";
    }
    if (keyword == 0 || !keyword) {
      keyword = "";
    }
    return this.productService
      .getProdsListPurshS2C(
        this.page,
        chain_id,
        supplier_id,
        keyword
      )
      .subscribe(
        (res) => {
          this.prods = res;
          this.prodsLength = this.prods.total;
          this.prodsData = this.prods.data;
          this.dataSource.data = this.prodsData;
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
              "product_quantity",
            ];      
          }
       
        this.dataSource1 = this.selecteditems;
          this.pager2 = this.pagerService.getPager(this.prodsLength, page);
        },
        (err) => {
          console.log(err);;
        }
      );
  }
  onGetProdsS2C(page) {
    return this.productService.getProdsListS2C(this.page).subscribe(
      (res) => {
        this.prods = res;
        this.prodLength = this.prods.total;
        this.prodsData = this.prods.data;
        this.dataSource.data = this.prodsData;
        this.displayedColumns = [
          "select",
          "product_image",
          "product_name",
          "product_barcode",
          "product_quantity",
          "cost_price"
        ];
        this.dataSource1 = this.selecteditems;

      },
      (err) => {
        console.log(err);;
      }
    );
  }
  setPage(page: number) {
    this.pager = this.pagerService.getPager(this.prodLength, page);
    this.page = page;
    this.onGetProdsS2C(this.page);
  }
  setPageFilter(
    page,
    chain_id?,
    supplier_id?,
    keyword?
  ) {
    this.filtred = true;
    this.page = page;
    this.pager2 = this.pagerService.getPager(this.prodsLength, page);
    this.onGetProdsListS2C(
      page,
      chain_id,
      supplier_id,
      keyword
    )
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
  fileName = "ExcelSheet.xlsx";

  onexportAsExcelFile() {
  
    this.excelService.exportAsExcelFile(this.exportPurchase, "Quick Purchase");
  }
}

