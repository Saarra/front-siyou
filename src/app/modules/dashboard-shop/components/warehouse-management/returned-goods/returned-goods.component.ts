import { AfterViewInit, Component, ViewChild, OnInit } from "@angular/core";
import {
  MatDialog,
  MatTableDataSource,
  MatPaginator,
  MatSort,
} from "@angular/material";
import { Router } from '@angular/router';

import { ProductsS2cService } from "src/app/shared/services/products-s2c.service";
import { ChainService } from "src/app/shared/services/chain.service";
import { CategoriesService } from "src/app/shared/services/categories.service";
import * as XLSX from "xlsx";
import { ExcelService } from "src/app/shared/services/excel.service";
import { DataSource } from "@angular/cdk/table";
import { AddReturnedGoodsComponent } from "src/app/modules/dashboard-shop/components/warehouse-management/returned-goods/add-returned-goods/add-returned-goods.component";
import { SupplierS2cService } from "src/app/shared/services/supplier-s2c.service";
@Component({
  selector: "app-returned-goods",
  templateUrl: "./returned-goods.component.html",
  styleUrls: ["./returned-goods.component.scss"],
})
export class ReturnedGoodsComponent implements OnInit {
  chain;
  chainData;
  chainInit = "";
  prods;
  prodsData = [];
  catList;
  page: number = 1;
  cost_price= localStorage.getItem('cost_price')

  displayedColumns = [];
  dataSource: any = new MatTableDataSource();

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  pager: any = {};
  pagedItems: any[];

  constructor(
    private productService: ProductsS2cService,
    private chainService: ChainService,
    private categoryService: CategoriesService,
    private excelService: ExcelService,
    private dialog: MatDialog,
    private supplierService: SupplierS2cService,
    private router: Router,

  ) {}

  ngOnInit() {
    this.onGetSuppliersList();
    this.onGetChainList();
    this.onGetProdsListS2C();
    this.onGetCategoriesList();
    this.dataSource.paginator = this.paginator;
  }
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
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
  last_page: number;

  onAddReturnProduct() {
    let dialogRef = this.dialog.open(AddReturnedGoodsComponent);
    dialogRef.afterClosed().subscribe((res) => {
      this.onGetProdsListS2C();
    });
  }
  item_return :number=0;
 onDelete(chain_id,barcode){
  var return_pro = {
    chain_id : chain_id,
    barcode: barcode,
    item_return : this.item_return
  }
  //console.log(return_pro)
  return this.productService.addReturnQuantity(return_pro).subscribe(
    res=> {
       this.onGetProdsListS2C();
    }, err => {
      console.log(err);;
    }
  );
 }
  onGetProdsListS2C(chain_id?, supplier_id?, barcode?) {
    if (barcode == 0 || !barcode) {
      barcode = "";
    }
    if (chain_id == 0 || !chain_id) {
      chain_id = "";
    }
    if (supplier_id == 0 || !supplier_id) {
      supplier_id = "";
    }
    return this.productService
      .getReturnedProducts(chain_id, supplier_id, barcode)
      .subscribe(
        (res) => {
          this.prods = res;
          console.log(res)
          this.last_page = this.prods.last_page;
          this.prodsData = this.prods.data;
          this.dataSource.data = this.prodsData;
          if(this.cost_price == '0'){
            this.displayedColumns = [
              "range_id",
              "product_image",
              "product_name",
              "product_barcode",
              "supplier",
              "cost_price",
              "unit_price",
              "product_quantity",
              "return_quantity",
              "actions"
            ];  
          }
          if(this.cost_price == '1'){
  
            this.displayedColumns = [
              "range_id",
              "product_image",
              "product_name",
              "product_barcode",
              "supplier",
             
              "unit_price",
              "product_quantity",
              "return_quantity",
              "actions"
            ];  
          }
         
        },
        (err) => {
          console.log(err);;
        }
      );
  }
  suppliersList;
  suppliersData;
  onGetSuppliersList() {
    return this.supplierService.GetSuppliersListS2C().subscribe(
      (res) => {
        console.log(res)
        this.suppliersList = res;
        this.suppliersData = this.suppliersList.data;
      },
      (err) => {
        console.log(err);;
      }
    );
  }

  _stockProd: {}[] = [];
  onexportAsExcelFile() {
    this._stockProd = [];
    for (let prod in this.prodsData) {
      var product = {
        Product_Name: "",
        Barcode: "",
        Description: "",
        Unit_Price: "",
        Quantity: "",
        Return_Quantity: "",
        Supplier: "",
      };
      product.Product_Name = this.prodsData[prod].product_name;
      product.Barcode = this.prodsData[prod].product_barcode;
      product.Unit_Price = this.prodsData[prod].unit_price;
      product.Quantity = this.prodsData[prod].product_quantity;
      product.Return_Quantity = this.prodsData[prod].item_return;
      product.Supplier = this.prodsData[prod].supplier.supplier_name;
      this._stockProd.push(product);
    }
    this.excelService.exportAsExcelFile(this._stockProd, "Stock");
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  catData;
  onGetCategoriesList() {
    return this.categoryService.getCategories().subscribe(
      (res) => {
        this.catList = res;
        this.catData = this.catList.data;

      },
      (err) => {
        console.log(err);;
      }
    );
  }
  fileName = "ExcelSheet.xlsx";

  exportexcel(): void {
    /* table id is passed over here */
    let element = document.getElementById("excel-table");
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

    /* save to file */
    XLSX.writeFile(wb, this.fileName,{compression:true});
  }

  exportAsXLSX(): void {
    this.excelService.exportAsExcelFile(this._stockProd, "Stock");
  }
}
