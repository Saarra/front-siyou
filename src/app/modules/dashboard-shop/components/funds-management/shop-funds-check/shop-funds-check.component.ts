import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { FundsS2cService } from 'src/app/shared/services/funds-s2c.service';
import { ChainService } from 'src/app/shared/services/chain.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-shop-funds-check',
  templateUrl: './shop-funds-check.component.html',
  styleUrls: ['./shop-funds-check.component.scss']
})
export class ShopFundsCheckComponent implements OnInit {
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
    this.ongetFundsCheck(this.chain_idInit, this.dateInit);
    this.onGetChainList();
    this.ongetFundsCheckStatistics(this.chain_idInit, this.dateInit);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ongetFundsCheck(_chain_id?, _date?){

    if(!_chain_id || _chain_id==0){
      _chain_id =''
    }
    if(!_date){
      _date =''
    }else{
      _date = this.datepipe.transform(_date, 'yyyy-MM-dd');
    }

    // var dateFilter =this.datepipe.transform(_date, 'yyyy-MM-dd');


    
    
     return this.fundsService.getFundsCheck(_chain_id,_date).subscribe(
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

   ongetFundsCheckStatistics(_chain_id?, _date?){

    if(!_chain_id || _chain_id==0){
      _chain_id =''
    }
    if(!_date){
      _date =''
    }else{
      _date = this.datepipe.transform(_date, 'yyyy-MM-dd');
    }
      
    return this.fundsService.getFundsCheckStatistics(_chain_id, _date).subscribe(
      res=>{
            this.fundsStats = res;
     
      }, err =>{
        console.log(err);;
      }
    )
   }


}
