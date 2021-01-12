import { AfterViewInit, Component, ViewChild, OnInit } from "@angular/core";
import {
  MatDialog,
  MatTableDataSource,
  MatPaginator,
  MatSort,
  MatSnackBar
} from "@angular/material";
import { Router } from '@angular/router';
import { PurchaseService } from 'src/app/shared/services/purchase.service';
import { ProductsS2cService } from "src/app/shared/services/products-s2c.service";
import { ChainService } from "src/app/shared/services/chain.service";
import { CategoriesService } from "src/app/shared/services/categories.service";
import * as XLSX from "xlsx";
import { ExcelService } from "src/app/shared/services/excel.service";
import { DataSource } from "@angular/cdk/table";
import { AddReturnedGoodsComponent } from "src/app/modules/dashboard-shop/components/warehouse-management/returned-goods/add-returned-goods/add-returned-goods.component";
import { SupplierS2cService } from "src/app/shared/services/supplier-s2c.service";
import { trigger, state, style, transition, animate } from '@angular/animations';
import { DatePipe } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
export interface purchasePro {
  barcode: any;
  purchased_quantity: any;
}
@Component({
  selector: 'app-quick-purchase',
  templateUrl: './quick-purchase.component.html',
  styleUrls: ['./quick-purchase.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed, void', style({ height: '0px', minHeight: '0', display: 'none' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
      transition('expanded <=> void', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)'))
    ])
  ],
})
export class QuickPurchaseComponent implements OnInit {
  chain;
  chainData;
  chainInit = "";
  prods;
  prodsData = [];
  catList;
  page: number = 1;
  expandedElement: null;
  displayedColumns = [
    "order_number",
    "status",
    "supplier",
    "total_price",
    "order_date",
    "products",
    "actions"
  ];
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
    private snackBar: MatSnackBar,
    private purchaseService: PurchaseService,
    public datepipe: DatePipe,
    private translate : TranslateService
  ) { }
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
  item_return: number = 0;
  onDelete(bar, id) {
    var return_pro = {
      barcode : []
    }
    return_pro.barcode.push(bar)
    return this.productService.deleteProductquick(return_pro, id).subscribe(
      res => {
        this.snackBar.open(this.translate.currentLang === 'Chinese' ? "删除产品":this.translate.currentLang === 'Italian' ? "Prodotto eliminato":'Product Deleted', '',{          duration: 1000,
        });
        this.onGetProdsListS2C();
      }, err => {
        console.log(err);;
      }
    );
  }
  orderDate;
  onGetProdsListS2C(chain_id?, supplier_id?, order_number?, date?, status?) {
    if (status == 0 || !status) {
      status = "";
    }
    if (date == 0 || !date) {
      date = "";
    }
    if (chain_id == 0 || !chain_id) {
      chain_id = "";
    }
    if (supplier_id == 0 || !supplier_id) {
      supplier_id = "";
    }
    if (order_number == 0 || !order_number) {
      order_number = "";
    }
    this.orderDate = this.datepipe.transform(date, "yyyy-MM-dd");
    return this.productService
      .getQuickPurProducts(chain_id, supplier_id, order_number, this.orderDate, status)
      .subscribe(
        (res) => {
          this.prods = res;
          this.prodsData = this.prods.data;
          this.dataSource.data = this.prodsData;
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
        this.suppliersList = res;
        this.suppliersData = this.suppliersList.data;
      },
      (err) => {
        console.log(err);;
      }
    );
  }
  catListData;
  onGetCategoriesList() {
    return this.categoryService.getCategories().subscribe(
      (res) => {
        this.catList = res;
        this.catListData = this.catList.data;

      },
      (err) => {
        console.log(err);;
      }
    );
  }
  onConfirm(id, chain, supplier) {
    return this.purchaseService.confirmPurchasedQuick(id).subscribe(
      (res) => {
        this.snackBar.open(this.translate.currentLang === 'Chinese' ? "快速采购已成功确认":this.translate.currentLang === 'Italian' ? "Acquisto rapido confermato con successo":'Quick Purchase Successfully Confirmed', '',{
          duration: 1000,
        });
        this.onGetProdsListS2C(chain, supplier);
      },
      (err) => {
        console.log(err);;
      }
    )
  }
  onAddtoStock(id) {
    return this.purchaseService.addpurchasetostock(id).subscribe(
      (res) => {
        //console.log("ok")
        this.snackBar.open('This order successfully added To STOCK', "OK", {
          duration: 1000,
        });
      },
      (err) => {
        console.log(err);;
      }
    )
  }
  onDeleteQuick(id, chain, supplier) {
    return this.purchaseService.deleteOderQuick(id).subscribe(
      res => {

        this.snackBar.open(this.translate.currentLang === 'Chinese' ? "快速采购已成功删除":this.translate.currentLang === 'Italian' ? "Acquisto rapido eliminato con successo":'Quick Purchase Successfully Deleted', '',{
                    duration: 1000,
        });
        this.onGetProdsListS2C(chain, supplier);
      }, err => {
        console.log(err);;
      }
    );
  }
  clicked: boolean = false;
  onEdit() {
    this.clicked = true;
  }
  onEditQuick(id, chain_id, supplier_id) {
    var editQ = {
      products: this.updatedQuantity
    }
    return this.purchaseService.editPurchasedQuick(id, editQ).subscribe(
      res => {

        this.snackBar.open(this.translate.currentLang === 'Chinese' ? "快速采购已成功更新":this.translate.currentLang === 'Italian' ? "Acquisto rapido aggiornato con successo":'Quick Purchase Successfully Updated', '',{          duration: 1000,
        });
        this.onGetProdsListS2C(chain_id, supplier_id);
      }, err => {
        console.log(err);;
      }
    );
  }
  updatedQuantity: purchasePro[] = [];
  changeQty(product_barcode, purchased_quantity) {
    var f = 0;
    if (this.updatedQuantity.length == 0) {
      var product = {
        barcode: product_barcode,
        purchased_quantity: purchased_quantity
      };
      this.updatedQuantity.push(product);
    }
    else {
      this.updatedQuantity.forEach((element) => {
        if (element.barcode == product_barcode) {
          f = 1;
          element.purchased_quantity = purchased_quantity;
        }
      });
      if (f == 0) {
        var __product = {
          barcode: product_barcode,
          purchased_quantity: purchased_quantity
        };
        this.updatedQuantity.push(__product);
      }
    }
    //console.log(this.updatedQuantity);
  }
}
