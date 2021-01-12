import {AfterViewInit, Component, ViewChild,OnInit} from '@angular/core';
import { ChainService } from 'src/app/shared/services/chain.service';
import { DiscountService } from 'src/app/shared/services/discount.service';
import { MatTableDataSource, MatPaginator, MatSort, MatSnackBar } from '@angular/material';
import { DatePipe } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-shop-discounts-list',
  templateUrl: './shop-discounts-list.component.html',
  styleUrls: ['./shop-discounts-list.component.scss']
})
export class ShopDiscountsListComponent implements OnInit , AfterViewInit{

  add_discount;
  chain;
  chainInit='';
  chainData;
  discounts;
  discountsData;

  displayedColumns = ['product_name', 'product_barcode','unit_price', 'discount_price','discount_type',  'start_date','finish_date','actions'];
  dataSource = new MatTableDataSource<any>();

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(
    private chainService: ChainService,
    private discountService: DiscountService,
    public datepipe: DatePipe,
    private snackbar: MatSnackBar,
    public translate: TranslateService
  ) { }

  ngOnInit() {
    this.add_discount = localStorage.getItem('discount')

    this.onGetChainList();
    this.onGetShopDiscountedList();
    this.onGetShop()  
    this.dataSource.paginator = this.paginator;

  }
  ngAfterViewInit(){
   this.dataSource.sort = this.sort;
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
    return this.discountService.getDiscountListS2c().subscribe(
      res=> {
        this.discounts = res;
        // console.log(res)
        this.discountsData = this.discounts.data
        this.displayedColumns =  ['product_name', 'product_barcode', 'unit_price','discount_price','discount_type', 'start_date','finish_date','actions'];
        this.dataSource.data = this.discountsData;
        //console.log(this.discountsData)
      }
    )
  }



  onGetShopDiscountedList(chain_id?,start_date?, end_date?,discount?){
    if(!chain_id || chain_id ==0){
      chain_id =''
    }
    if(!start_date || start_date ==0){
      start_date =''
    }
    if(!end_date || end_date ==0){
      end_date =''
    }
    if(!discount || discount ==0){
      discount =''
    }
    
    var strdate =this.datepipe.transform(start_date, 'yyyy-MM-dd');
    var endate =this.datepipe.transform(end_date, 'yyyy-MM-dd');

    
    return this.discountService.getDiscountListS2c(chain_id,strdate,endate,discount).subscribe(
      res=> {
        // console.log(res)
        this.discounts = res;
        this.discountsData = this.discounts.data
        this.displayedColumns =  ['product_name', 'product_barcode','unit_price','discount_price','discount_type', 'start_date','finish_date','actions'];
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
