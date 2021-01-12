import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { ChainService } from 'src/app/shared/services/chain.service';
import { MatTableDataSource, MatPaginator, MatSort, MatSnackBar } from '@angular/material';
import { CategoriesService } from 'src/app/shared/services/categories.service';
import { DatePipe } from "@angular/common";
import { Router ,ActivatedRoute } from '@angular/router';
import { DiscountService } from 'src/app/shared/services/discount.service';
@Component({
  selector: 'app-history-discounts',
  templateUrl: './history-discounts.component.html',
  styleUrls: ['./history-discounts.component.scss']
})
export class HistoryDiscountsComponent implements OnInit, AfterViewInit  {
  displayedColumns = [];
  chain;
  chainData;
  prods;
  cost_price= localStorage.getItem('cost_price')
  page: number = 1;
  catList;
  prodsData;
  currentId;
  dataSource: any = new MatTableDataSource();
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  constructor(
    private chainService: ChainService,
    private categoryService: CategoriesService,
    private router: Router,
    private discountService: DiscountService,
    public datepipe: DatePipe,
    private activatedRouter: ActivatedRoute,


  ) {}

  ngOnInit() {
   
    this.onGetCategoriesList();
    this.onGetChainList();
    this.onGetHistoryDiscount();
    this.dataSource.paginator = this.paginator;

  }
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }
  onGetChainList() {

    return this.chainService.getChainList().subscribe(
      res => {
        this.chain = res;
        this.chainData = this.chain.data;
      }, err => {
        console.log(err);;
      }
    );

  }
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
  onGetHistoryDiscount(discount_id?,chain_id?,category_id?,barcode?,keyword?,start_date?,end_date?)
    {
   
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
    if(start_date ==0 ||!start_date){
      start_date = ''
    }
    if(end_date ==0 ||!end_date){
      end_date = ''
    }
    if(discount_id ==0 ||!discount_id){
      discount_id = ''
    }
    var strdate =this.datepipe.transform(start_date, 'yyyy-MM-dd');
    var endate =this.datepipe.transform(end_date, 'yyyy-MM-dd');
    return this.discountService.getHistoryProduct(discount_id,chain_id,category_id,barcode,keyword,strdate,endate).subscribe(
      res => {
        this.prods = res;
        this.prodsData=this.prods.data;
        this.dataSource.data = this.prodsData;
        if(this.cost_price == '0'){
          this.displayedColumns = ['product_name', 'product_barcode','unit_price', 'cost_price','discount_type',  'start_date','finish_date'];

        }
        if(this.cost_price == '1'){

          this.displayedColumns = ['product_name', 'product_barcode','unit_price','discount_type',  'start_date','finish_date'];

        }

      }, err => {
        console.log(err);;
      }
    );
  }




}
