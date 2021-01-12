import { Component, OnInit, ViewChild } from '@angular/core';
import { FundsS2cService } from 'src/app/shared/services/funds-s2c.service';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { ChainService } from 'src/app/shared/services/chain.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-shop-funds-cash',
  templateUrl: './shop-funds-cash.component.html',
  styleUrls: ['./shop-funds-cash.component.scss']
})
export class ShopFundsCashComponent implements OnInit {

  chain_idInit='';
  dateInit='';
  funds;
  fundsData;
  fundsStats;

  chain;
  chainData;

  displayedColumns = ['created_at', 'price', 'member_price', 'payment_type', 'payment_date', 'full_name'];
  dataSource = new MatTableDataSource<any>(this.fundsData);

 

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private fundsService: FundsS2cService,
    private chainService: ChainService,
    public datepipe: DatePipe,

  ) { }

  ngOnInit() {
    this.ongetFundsCash(this.chain_idInit, this.dateInit);
    this.onGetChainList();
    this.ongetFundsCashStatistics(this.chain_idInit, this.dateInit);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ongetFundsCash(_chain_id?, _date?){

    if(!_chain_id || _chain_id==0){
      _chain_id =''
    }
    if(!_date){
      _date =''
    }else{
      _date = this.datepipe.transform(_date, 'yyyy-MM-dd');
    }

    // var dateFilter =this.datepipe.transform(_date, 'yyyy-MM-dd');


  
    
     return this.fundsService.getFundsCash(_chain_id,_date).subscribe(
       res=>{
            this.funds = res;
            this.fundsData = this.funds.data;
            
            this.displayedColumns = ['created_at', 'price', 'member_price', 'payment_type', 'payment_date', 'full_name'];
        this.dataSource = new MatTableDataSource<any>(this.fundsData);
       }, err => {
         console.log(err);;
       }
     )
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

   ongetFundsCashStatistics(_chain_id?, _date?){

    if(!_chain_id || _chain_id==0){
      _chain_id =''
    }
    if(!_date){
      _date =''
    }else{
      _date = this.datepipe.transform(_date, 'yyyy-MM-dd');
    }
      
    return this.fundsService.getFundsCashStatistics(_chain_id, _date).subscribe(
      res=>{
            this.fundsStats = res;
       
      }, err =>{
        console.log(err);;
      }
    )
   }


}
