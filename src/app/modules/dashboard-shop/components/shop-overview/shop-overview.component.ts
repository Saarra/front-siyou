import { Component, OnInit, ViewChild } from "@angular/core";
//import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { DashboardService } from "src/app/shared/services/dashboard.service";
import { OrderServiceService } from "src/app/shared/services/order-service.service";
import { ShopmanagerService } from "src/app/shared/services/shopmanager.service";
import { MemberService } from "src/app/shared/services/member.service";
import { ChainService } from "src/app/shared/services/chain.service";
import { DatePipe } from "@angular/common";
import { CategoriesService } from "src/app/shared/services/categories.service";
import { ProductsS2cService } from "src/app/shared/services/products-s2c.service";
import { FundsS2cService } from "src/app/shared/services/funds-s2c.service";
import { ShopcachierService } from "src/app/shared/services/shopCachier.service";
import { ShopoperatorService } from 'src/app/shared/services/shopoperator.service';


@Component({
  selector: "app-shop-overview",
  templateUrl: "./shop-overview.component.html",
  styleUrls: ["./shop-overview.component.scss"],
})
export class ShopOverviewComponent implements OnInit {
 

  //public chartOptions: Partial<ChartOptions>;
  formData: any;
  form: any;
  formProd;
  formProdData;
  ordersList;
  price;
  ordersData;
  paid: number = 0;
  confirmed: number = 0;
  pended: number = 0;
  id = localStorage.getItem("store_id");
  constructor(
    private dashboardService: DashboardService,
    private orderService: OrderServiceService,
    private shopManagerService: ShopmanagerService,
    private chainService: ChainService,
    private membershipService: MemberService,
    public datepipe: DatePipe,
    private categoriesService: CategoriesService,
    private productService: ProductsS2cService,
    private ShopcachierService: ShopcachierService,
    private shopOperatorService: ShopoperatorService


  ) {
    this.formData = new FormData();
  }
  ngOnInit() {
    this.onGetProdsListS2C();
    this.getShopManagersList();
    this.onGetChainsList();
    this.ongetMemberList();
    this.getCategoriesList();
    this.onGetOrdersCashRegister();
    this.getShopcachiersList();
    this.getShopOperatorsList();
    this.onGetCategoryList();
    this.funds_stat = true;
    this.products_stat = false;
    this.promo_stat = false;
    this.sales_stat = false;
    this.orders_stat = true;
  }
  funds;
  fundsData;
  initialTime = new Date(2020, 1, 1);
  memberList;
  memberData;
  memberLength: number = 0;

  ongetMemberList() {
    return this.membershipService.getMember().subscribe(
      (res) => {
        this.memberList = res;
        this.memberLength = this.memberList.total;
      },
      (err) => {
        console.log(err);;
      }
    );
  }
  shopcachiersData;
  shopcachierssList;
  cashierLength;
  getShopcachiersList(){
    return this.ShopcachierService.getcachiersList().subscribe(
      res=>{
        this.shopcachierssList  = res;
        this.cashierLength=this.shopcachierssList.length    
      }, err => {
        console.log(err);;
      }
    );
  }
  chainsList;
  chainData;
  chainLength: number = 0;
  onGetChainsList() {
    return this.chainService.getChainsList().subscribe(
      (res) => {
        this.chainsList = res;
        this.chainData = this.chainsList.data;
        this.chainLength = this.chainData.length;
      },
      (err) => {
        console.log(err);;
      }
    );
  }
  categoryList;
  catLenght:number=0;
  categoryData;
  onGetCategoryList() {
    this.catLenght=0;
    this.categoriesService.getCategories().subscribe(categoryList => {
      this.categoryList = categoryList;
      this.categoryData=this.categoriesList.data;
      this.catLenght=this.categoryData.data.length
    })      
  }
  shopManagersList;
  managerLength: number = 0;
  getShopManagersList() {
    return this.shopManagerService.getShopmangerList().subscribe(
      (res) => {
        this.shopManagersList = res;
        this.managerLength = this.shopManagersList.data.length;
      },
      (err) => {
        console.log(err);;
      }
    );
  }
  orderList;
  orders;
  page: number = 1;
  orderLength: number = 0;
  onGetOrdersCashRegister() {
    return this.orderService
      .getOrdersCashRegister(this.page)
      .subscribe((res) => {
        this.orders = res;
        this.orderList = this.orders.data;
        this.orderLength = this.orders.total;
      });
  }
  categoriesList;
  getCategoriesList() {
    this.categoriesService.getCategories().subscribe((res) => {
      this.categoriesList = res;
    });
  }


  funds_stat = false;
  products_stat = false;
  promo_stat = false;
  sales_stat = false;
  orders_stat = false;
  productStat() {
    this.products_stat = true;
    this.promo_stat = false;
    this.sales_stat = false;
    this.funds_stat = false;
    this.orders_stat = false;

  }
  fundsStat() {
    this.funds_stat = true;
    this.products_stat = false;
    this.promo_stat = false;
    this.sales_stat = false;
    this.orders_stat = false;

  }
  promoStat() {
    this.funds_stat = false;
    this.products_stat = false;
    this.promo_stat = true;
    this.sales_stat = false;
    this.orders_stat = false;

  }
  salesStat() {
    this.funds_stat = false;
    this.products_stat = false;
    this.promo_stat = false;
    this.sales_stat = true;
    this.orders_stat = false;

  }
  ordersStat() {
    this.funds_stat = false;
    this.products_stat = false;
    this.promo_stat = false;
    this.sales_stat = false;
    this.orders_stat = true;

  }
  prods;
  returnGoods
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
          this.returnGoods=this.prods.data.length
        },
        (err) => {
          console.log(err);;
        }
      );
  }
  shopOperators;
  operatorsLength;
  getShopOperatorsList(){
    return this.shopOperatorService.getShopoperatorList().subscribe(
      res=>{
        this.shopOperators=res;
        this.operatorsLength=this.shopOperators.data.length
        
      }, err => {
        console.log(err);;
      }
    );
  }
}
