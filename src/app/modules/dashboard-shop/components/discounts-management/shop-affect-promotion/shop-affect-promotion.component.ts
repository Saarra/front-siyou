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
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { PagerService } from "src/app/shared/services/pager.service";

@Component({
  selector: "app-shop-affect-promotion",
  templateUrl: "./shop-affect-promotion.component.html",
  styleUrls: ["./shop-affect-promotion.component.scss"],
})
export class ShopAffectPromotionComponent implements OnInit {
  date;
  selecteditems = [];
  productItemsList;
  data;
  discountTypes;
  discountData;
  allItems;
  prodLength;
  pager2: any = {};
  chainData;
  page  = 1;
  chaininit = localStorage.getItem("chainInit");
  chain;
  barcodeInit = "";
  keywordInit = "";
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  cost_price = localStorage.getItem("cost_price");

  displayedColumns: string[] = [];
  dataSource = new MatTableDataSource<any>();
  selection = new SelectionModel<any>(true, []);

  displayedColumns1: string[] = ["product_name", "unit_price"];
  dataSource1 = this.selecteditems;
  filtred = false;
  constructor(
    private productService: ProductsS2cService,
    private discountService: DiscountService,
    public datepipe: DatePipe,
    private snackbar: MatSnackBar,
    private router: Router,
    private chainService: ChainService,
    public translate: TranslateService,
    private http: HttpClient,
    private pagerService: PagerService
  ) {}

  ngOnInit() {
  
    this.onGetChainList();
    this.onGetProdsListS2C(this.page,this.chaininit);
    this.onGetDiscountTypes();
    this.http
    .get(`${environment.BaseUrlS2C}/promotion/products`, {
      params: {
        token: localStorage.getItem("token"),
        chain_id : this.chaininit,

      },
    })
    .subscribe((data) => {
      this.allItems = data;
      this.prodLength = this.allItems.total;
      this.pager2 = this.pagerService.getPager(this.prodLength, this.page);
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  /** Whether the number of selected elements matches the total number of rows. */
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
    console.log(this.selection);
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
    console.log(this.selection.selected);
    

  }
  prodsLength;
  onGetProdsListS2C(page, chain_id?, _keyword?, _barcode?) {
    this.filtred = true;

    if (!_keyword) {
      _keyword = "";
    }
    if (!_barcode) {
      _barcode = "";
    }
    return this.productService
      .getNotDiscountedProducts(page, chain_id, _keyword, _barcode)
      .subscribe(
        (res) => {
          this.productItemsList = res;
          this.prodsLength = this.productItemsList.total;
          this.data = this.productItemsList.data;
          if (this.cost_price == "0") {
            this.displayedColumns = [
              "select",
              "product_name",
              "product_barcode",
              "unit_price",
              "cost_price",
            ];
          }
          if (this.cost_price == "1") {
            this.displayedColumns = [
              "select",
              "product_name",
              "product_barcode",
              "unit_price",
            ];
          }
          this.dataSource.data = this.data;
          this.dataSource1 = this.selecteditems;
          this.displayedColumns1 = ["product_name", "unit_price"];
          this.pager2 = this.pagerService.getPager(this.prodsLength, page);
        },
        (err) => {
          console.log(err);
        }
      );
  }
  setPageFilter(page, chain_id?, _keyword?, barcode?) {
    this.filtred = true;
    this.page = page;
    this.onGetProdsListS2C(page, chain_id, _keyword, barcode);

  }
  onGetChainList() {
    return this.chainService.getChainList().subscribe(
      (res) => {
        this.chain = res;
        this.chainData = this.chain.data;
        //console.log('chains list', this.chainData);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  onGetDiscountTypes() {
    return this.discountService.getDiscountTypesS2c().subscribe(
      (res) => {
        this.discountTypes = res;
        this.discountData = this.discountTypes.data;
        //console.log(this.discountData)
      },
      (err) => {
        console.log(err);
      }
    );
  }

  getFormValues(val, val2, startdate, enddate) {
    var sel = this.selecteditems;
    var arr: number[] = [];

    for (var i = 0; i < sel.length; i++) {
      arr.push(sel[i].id);
    }

    //console.log(arr);
    var strdate = this.datepipe.transform(startdate, "yyyy-MM-dd");
    var endate = this.datepipe.transform(enddate, "yyyy-MM-dd");

    var el = {
      discount_id: 2,
      products_id: arr,
      value1: val,
      value2: val2,
      start_date: strdate,
      finish_date: endate,
    };

    //console.log(arr);

    //console.log(el);

    return this.discountService.addPromotionS2c(el).subscribe(
      (res) => {
        // this.redirectTo('/shop/offline-promotions-list');
        this.router.navigate(["/shop/offline-promotions-list"]);

        this.snackbar.open(
          this.translate.currentLang === "Chinese"
            ? "折扣信息已成功更改"
            : this.translate.currentLang === "Italian"
            ? "Sconto modificato con successo"
            : "Discount added successfully",
          "",
          {
            duration: 1000,
          }
        );
      },
      (err) => {
        console.log(err);
      }
    );
  }

  redirectTo(uri: string) {
    this.router
      .navigateByUrl("/", { skipLocationChange: true })
      .then(() => this.router.navigate([uri]));
  }
}
