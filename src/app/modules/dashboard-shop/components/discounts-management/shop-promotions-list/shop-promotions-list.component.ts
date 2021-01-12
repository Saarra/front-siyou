import {AfterViewInit, Component, ViewChild,OnInit} from '@angular/core';
import { ChainService } from 'src/app/shared/services/chain.service';
import { DiscountService } from 'src/app/shared/services/discount.service';
import { MatTableDataSource, MatPaginator, MatSort, MatSnackBar } from '@angular/material';
import { DatePipe } from '@angular/common';
import { CategoriesService } from 'src/app/shared/services/categories.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-shop-promotions-list',
  templateUrl: './shop-promotions-list.component.html',
  styleUrls: ['./shop-promotions-list.component.scss']
})
export class ShopPromotionsListComponent implements OnInit {
add_discount;
  chain;
  chainInit='';
  chainData;
  discounts;
  cost_price= localStorage.getItem('cost_price')
  discountsData;
  catList;
  displayedColumns = [];
  dataSource = new MatTableDataSource<any>();

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(
    private chainService: ChainService,
    private discountService: DiscountService,
    public datepipe: DatePipe,
    private categoryService: CategoriesService,
    private snackbar: MatSnackBar,
    public translate: TranslateService

  ) { }

  ngOnInit() {
    this.add_discount = localStorage.getItem('discount')
    this.onGetChainList();
    //this.onGetShopDiscountedList();
    this.onGetShop();
    this.onGetCategoriesList();
    this.dataSource.paginator = this.paginator;

  }
  ngAfterViewInit(){
   this.dataSource.sort = this.sort;
   }
   categoryData
   onGetCategoriesList(){
    return this.categoryService.getCategories().subscribe(
     res => {
        this.catList = res;
        this.categoryData=this.catList.data;

      }, err => {
        console.log(err);;
      }
    );
 }

  onGetChainList(){

    return this.chainService.getChainList().subscribe(
      res=>{
         this.chain = res;
         this.chainData = this.chain.data
     
      }, err => {
        console.log(err);;
      }
    );

  }

  onGetShop(){
    return this.discountService.getPromotedListS2c().subscribe(
      res=> {
        this.discounts = res;
        this.discountsData = this.discounts.data
        console.log(this.discounts)
        this.displayedColumns = ['product_name', 'product_barcode','unit_price','cost_price','buy', 'free','start_date','finish_date','quantity','actions'];
        this.dataSource.data = this.discountsData;
      }
    )
  }


  onGetShopPromotedList(chain_id,start_date?, end_date?,category_id?,barcode?,keyword?){
    if(!chain_id || chain_id ==0){
      chain_id =''
    }
    if(!start_date || start_date ==0){
      start_date =''
    }
    if(!end_date || end_date ==0){
      end_date =''
    }
    if(!category_id || category_id ==0){
      category_id =''
    }
    if(!barcode || barcode ==0){
      barcode =''
      }
    if(!keyword || keyword ==0){
        keyword ='' 
      }
    
    var strdate =this.datepipe.transform(start_date, 'yyyy-MM-dd');
    var endate =this.datepipe.transform(end_date, 'yyyy-MM-dd');

    
    return this.discountService.getPromotedListS2c(chain_id,strdate,endate,category_id,barcode,keyword).subscribe(
      res=> {
        this.discounts = res;
        this.discountsData = this.discounts.data
        if(this.cost_price == '0'){
          this.displayedColumns = ['product_name', 'product_barcode','unit_price','cost_price','buy', 'free','start_date','finish_date','quantity','actions'];

        }
        if(this.cost_price == '1'){

          this.displayedColumns = ['product_name', 'product_barcode','unit_price','buy', 'free','start_date','finish_date','quantity','actions'];

        }
        this.dataSource.data = this.discountsData;
      }
    )
  }
  onDeleteDiscount(id){

    return this.discountService.deleteDiscount(id).subscribe(
      res=> {
        this.snackbar.open(this.translate.currentLang === 'Chinese' ? "已删除":this.translate.currentLang === 'Italian' ? 'cancellato':"Deleted", '',{
          duration: 1000,
        });
        this.onGetShop();
      })



  }
}

