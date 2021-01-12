import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { ProductsS2cService } from "src/app/shared/services/products-s2c.service";
import { ChainService } from "src/app/shared/services/chain.service";
import { MatTableDataSource, MatSelect } from "@angular/material";
import { CategoriesService } from "src/app/shared/services/categories.service";
import { PagerService } from "src/app/shared/services/pager.service";
import { DatePipe } from "@angular/common";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { SupplierS2cService } from "src/app/shared/services/supplier-s2c.service";
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-expired-products-s2c',
  templateUrl: './expired-products-s2c.component.html',
  styleUrls: ['./expired-products-s2c.component.scss']
})
export class ExpiredProductsS2cComponent implements OnInit {
  @ViewChild('supplier_id', { static: false }) supplier_id: MatSelect;
  chain;
  chainData;
  cost_price= localStorage.getItem('cost_price')
  prods;
  page: number = 1;
  prodsData;
  catList;
  firstDay;
  currentDay;
  day: number = 0;
  month = new Date().getMonth() + 1;
  year = new Date().getFullYear();
  chainInit = localStorage.getItem("chainInit");
  storeInit = localStorage.getItem("store_id");
  displayedColumns = [
  ];
  dataSource: any = new MatTableDataSource();
  allItems;
  pager: any = {};
  pager2: any = {};
  pagedItems: any[];
  filtred = false;
  prodLength;
  prodsLength;
  data;
  constructor(
    private productService: ProductsS2cService,
    private chainService: ChainService,
    private categoryService: CategoriesService,
    private pagerService: PagerService,
    public datepipe: DatePipe,
    private http: HttpClient,
    private supplierService: SupplierS2cService,
    public translate: TranslateService
  ) { }
  ngOnInit() {
    this.filtred = false;
    this.onGetProdsS2C(this.page);
    this.onGetChainList();
    this.onGetCategoriesList();
    this.onGetSuppliers();
    this.http
      .post(`${environment.BaseUrlS2C}/Product/expiration`, this.data, {
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
  applyFilter(searchValue: string): void {
    this.catList = this.catList.filter(cat => {
      return cat.category_name.toLowerCase().indexOf(searchValue.toLowerCase()) >= 0
    }
    )
    if (searchValue.length == 0) {
      this.onGetCategoriesList()
    }
  }
  onSearchChange(searchValue: string): void {
    //console.log(searchValue);
    this.suppliers = this.suppliers.filter(supplier => { return supplier.supplier_name.toLowerCase().indexOf(searchValue.toLowerCase()) >= 0 })
    if (searchValue.length == 0) {
      this.onGetSuppliers()
    }
    //console.log(this.suppliers);
  }
  onGetChainList() {
    return this.chainService.getChainList().subscribe(
      (res) => {
        this.chain = res;
        this.chainData = this.chain.data;
        this.chainInit = this.chainData[0].id;
        localStorage.setItem("chainInit", this.chainData[0].id);
      },
      (err) => {
        console.log(err);;
      }
    );
  }
  suppliersList;
  suppliers;
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
  onGetProdsListS2C(
    page,
    chain_id?,
    category_id?,
    barcode?,
    supplier_id?,
    range_id?
  ) {
    this.filtred = true;
    if (chain_id == 0 || !chain_id) {
      chain_id = "";
    }
    if (category_id == 0 || !category_id) {
      category_id = "";
    }
    if (barcode == 0 || !barcode) {
      barcode = "";
    }
    if (supplier_id == 0 || !supplier_id) {
      supplier_id = "";
    }
    if (range_id == 0 || !range_id) {
      range_id = "";
    }
    return this.productService
      .getExpiredProdsListS2C(
        this.page,
        chain_id,
        category_id,
        barcode,
        supplier_id,
        range_id
      )
      .subscribe(
        (res) => {
          this.prods = res;
          this.prodsLength = this.prods.total;
          this.prodsData = this.prods.data;
          this.dataSource.data = this.prodsData;
          if(this.cost_price == '0'){
            this.displayedColumns = [
              "range_id",
              "product_image",
              "product_name",
              "product_barcode",
              "supplier",
              "category",
              "cost_price",
              "unit_price",
              "warn_quantity",
              "product_quantity",
              "expired_date",
              "actions",
            ];
          }
          if(this.cost_price == '1'){
  
            this.displayedColumns = [
              "range_id",
              "product_image",
              "product_name",
              "product_barcode",
              "supplier",
              "category",
              "unit_price",
              "warn_quantity",
              "product_quantity",
              "expired_date",
              "actions",
            ];
          }
          this.pager2 = this.pagerService.getPager(this.prodsLength, page);
        },
        (err) => {
          console.log(err);;
        }
      );
  }
  categories;
  onGetCategoriesList() {
    return this.categoryService.getCategories().subscribe(
      (res) => {
        //console.log(res)
        this.categories = res
        this.catList = this.categories.data;
      },
      (err) => {
        console.log(err);;
      }
    );
  }
  onGetProdsS2C(page) {
    return this.productService.getExpiredProdsListS2C(this.page).subscribe(
      (res) => {
        this.prods = res;
        this.prodLength = this.prods.total;
        this.prodsData = this.prods.data;
        //console.log(this.prodsData);
        this.dataSource.data = this.prodsData;
        if(this.cost_price == '0'){
          this.displayedColumns = [
            "range_id",
            "product_image",
            "product_name",
            "product_barcode",
            "supplier",
            "category",
            "cost_price",
            "unit_price",
            "warn_quantity",
            "product_quantity",
            "expired_date",
            "actions",
          ];
        }
        if(this.cost_price == '1'){

          this.displayedColumns = [
            "range_id",
            "product_image",
            "product_name",
            "product_barcode",
            "supplier",
            "category",
            "unit_price",
            "warn_quantity",
            "product_quantity",
            "expired_date",
            "actions",
          ];
        }
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
    category_id?,
    barcode?,
    supplier_id?,
    range_id?
  ) {
    this.filtred = true;
    this.page = page;
    this.pager2 = this.pagerService.getPager(this.prodsLength, page);
    this.onGetProdsListS2C(
      page,
      chain_id,
      category_id,
      barcode,
      supplier_id,
      range_id
    );
  }
}
