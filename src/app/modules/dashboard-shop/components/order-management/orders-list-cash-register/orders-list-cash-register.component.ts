import { AfterViewInit, Component, ViewChild, OnInit } from "@angular/core";
import { OrderServiceService } from "src/app/shared/services/order-service.service";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ShopcachierService } from 'src/app/shared/services/shopCachier.service';

import {
  MatTableDataSource,
  MatPaginator,
  MatSort,
  MatSnackBar,
  MatDialog,
} from "@angular/material";
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from "@angular/animations";
import { Router } from "@angular/router";
import { ChainService } from "src/app/shared/services/chain.service";
import { DatePipe } from "@angular/common";
import { PagerService } from "src/app/shared/services/pager.service";

@Component({
  selector: "app-orders-list-cash-register",
  templateUrl: "./orders-list-cash-register.component.html",
  styleUrls: ["./orders-list-cash-register.component.scss"],
  animations: [
    trigger("detailExpand", [
      state(
        "collapsed",
        style({ height: "0px", minHeight: "0", visibility: "hidden" })
      ),
      state("expanded", style({ height: "*", visibility: "visible" })),
      transition(
        "expanded <=> collapsed",
        animate("225ms cubic-bezier(0.4, 0.0, 0.2, 1)")
      ),
    ]),
  ],
})
export class OrdersListCashRegisterComponent implements OnInit {
  
  orders: any;
  orderList: any;
  expandedElement: null;
orderDisplayedColumns = [
    "created_at",
    "order_number",
    "payment_amount",
    "payment_method",
    "discount_amount",
    "vip_point",
    "invoice",
    "cashier",
    "actions",
  ];
  dataSource = new MatTableDataSource<any>();
  last_page: number;
  chain;
  chainData;
  pager: any = {};
  pager2: any = {};
  pagedItems: any[];
  page: number = 1;
  firstDay;
  currentDay;
  day;
  month = new Date().getMonth() + 1;
  year = new Date().getFullYear();
  chainInit = localStorage.getItem("chainInit");
  storeInit = localStorage.getItem("store_id");
  allItems;
  OrdersLenghth;

  // criteriaList: any;
  constructor(
    private orderService: OrderServiceService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private router: Router,
    private chainService: ChainService,
    public datepipe: DatePipe,
    private pagerService: PagerService,
    private http: HttpClient,
    private ShopcachierService: ShopcachierService,
  ) { }

  ngOnInit() {
    this.getShopcachiersList();
    var firstDay = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
    this.firstDay = this.datepipe.transform(firstDay, "yyyy-MM-dd");
    this.currentDay = this.datepipe.transform(new Date(), "yyyy-MM-dd");
    this.onGetOrders(this.page);
    this.onGetChainList();
    this.onGetPaymentMethod();
    this.onGetStatOrdQuant(
      this.chainInit,
      this.storeInit,
      this.currentDay,
      this.currentDay
    );
    this.onGetStatOrdQuantMon(
      this.chainInit,
      this.storeInit,
      this.firstDay,
      this.currentDay
    );


    this.http.get(`${environment.BaseUrlS2C}/orders/list1`, {
      params: {
        token: localStorage.getItem('token'),
      }
    }).subscribe(data => {
      // set items to json response
      this.allItems = data;
      this.OrdersLenghth= this.allItems.total;
      this.pager = this.pagerService.getPager(this.OrdersLenghth, 1);

    })
  }
 


  onGetChainList() {
    return this.chainService.getChainList().subscribe(
      (res) => {
        this.chain = res;
        this.chainData = this.chain.data;
        this.chainInit = this.chainData[0].id;
        localStorage.setItem('chainInit', this.chainData[0].id);
      },
      (err) => {
        console.log(err);;
      }
    );
  }
  payments;
  onGetPaymentMethod() {
    return this.orderService.getPaymentTypesList().subscribe(
      (res) => {
        this.payments = res;
      },
      (err) => {
        console.log(err);;
      }
    );
  }
  
  filtred = false;
  OrderLenghth;
  onGetOrdersFilter(page?, _chain_id?, _payment_method_id?, start_date?,cashier_id?) {
    this.filtred = true;
    if (_chain_id == 0 || !_chain_id) {
      _chain_id = "";
    }
    if (_payment_method_id == 0 || !_payment_method_id) {
      _payment_method_id = "";
    }
    if (start_date == 0 || !start_date) {
      start_date = "";
    }
    var startdate = this.datepipe.transform(start_date, "yyyy-MM-dd");
    console.log(startdate)
    return this.orderService
      .filtreOrders(this.page, _chain_id, _payment_method_id, startdate ,cashier_id)
      .subscribe(
        (res) => {
          this.orders = res;
          console.log(this.orders)
          this.OrderLenghth= this.orders.total;
          this.last_page = this.orders.last_page;
          this.orderList = this.orders.data;
          this.dataSource.data = this.orderList;
          this.orderDisplayedColumns = [
            "created_at",
            "order_number",
            "payment_amount",
            "payment_method",
            "discount_amount",
            "vip_point",
            "invoice",
            "cashier",
            "actions",
          ];
          this.pager2 = this.pagerService.getPager(this.OrderLenghth, page);

        },
        (err) => {
          console.log(err);;
        }
      );
  }
  shopcachierssList;
  shopcachiersData;
  getShopcachiersList(){
    return this.ShopcachierService.getcachiersList().subscribe(
      res=>{
        this.shopcachierssList  = res;
        this.shopcachiersData = this.shopcachierssList.data
        console.log(res)
      }, err => {
        console.log(err);;
      }
    );
  }
  onGetOrders(page) {
    return this.orderService
      .getOrdersCashRegister(this.page)
      .subscribe(
        (res) => {
          this.orders = res;
          this.OrdersLenghth = this.orders.total;
          this.orderList = this.orders.data;
          this.dataSource.data = this.orderList;
          this.orderDisplayedColumns = [
            "created_at",
            "order_number",
            "payment_amount",
            "payment_method",
            "discount_amount",
            "vip_point",
            "invoice",
            "cashier",
            "actions",
          ];
         
        },
        (err) => {
          console.log(err);;
        }
      );
  }
  setPage(page: number) {

    
    // get pager object from service
    this.pager = this.pagerService.getPager(this.OrdersLenghth, page);
    this.page = page;
    this.onGetOrders(this.page)
  }
  setPageFilter(page,_chain_id?,_payment_method_id?, start_date?,cashier_id?) {
    this.filtred = true;
    this.page = page;
    this.pager2 = this.pagerService.getPager(this.OrderLenghth, page);
    this.onGetOrdersFilter(page,_chain_id,_payment_method_id, start_date,cashier_id)
}
  statord;
  statordyear;
  statordmonth;

  onGetStatOrdQuant(chain_id, store_id?, start?, end?) {
    this.chainInit = chain_id
    var ordStat = {
      start: this.currentDay,
      end: this.currentDay,
      chain_id: this.chainInit,
      store_id: this.storeInit,
    };
    this.orderService.getStatOrdQuant(ordStat).subscribe(
      (res) => {
        this.statord = res;
        if (this.statord.data.days.length === 0) {
          this.day = 0;
        }
        else {
          this.day = this.statord.data.days[0].total;
        }
        if (this.statord.data.years.length === 0) {
          this.statordyear = 0;
        }
        else {
          this.statordyear = this.statord.data.years[0].total;
        }
        
      },
      (err) => {
        console.log(err);;
      }
    );
  }
  onGetStatOrdQuantMon(chain_id, store_id?, start?, end?) {
    this.chainInit = chain_id
    var ordStat = {
      start: this.firstDay,
      end: this.currentDay,
      chain_id: this.chainInit,
      store_id: this.storeInit,
    };
    return this.orderService.getStatOrdQuant(ordStat).subscribe(
      (res) => {
        this.statord = res;
        if (this.statord.data.total === 0 || this.statord.data.months.length === 0) {
          this.statordmonth = 0;
        }
        else {
          this.statordmonth = this.statord.data.months[0].total;
        }

      },
      (err) => {
        console.log(err);;
      }
    );
  }

}
