import { Component, OnInit, ViewChild, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { MatDialog ,MatDialogConfig} from '@angular/material';
import { FundsService } from 'src/app/shared/services/funds.service';
import { ChainService } from 'src/app/shared/services/chain.service';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { DatePipe } from '@angular/common';
import { OrderServiceService } from 'src/app/shared/services/order-service.service';
import {  MatSnackBar } from '@angular/material';
import { SupplierService } from 'src/app/shared/services/supplier.service';
import {B2bAddPurchasedFundsComponent } from 'src/app/modules/dashboard/components/funds/b2b-purchased-funds/b2b-add-purchased-funds/b2b-add-purchased-funds.component'
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-b2b-purchased-funds',
  templateUrl: './b2b-purchased-funds.component.html',
  styleUrls: ['./b2b-purchased-funds.component.scss']
})
export class B2bPurchasedFundsComponent implements OnInit ,AfterViewInit {

  pipe = new DatePipe('en-US');
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  constructor(private dialog: MatDialog,
    private supplierService: SupplierService,
    private fundsService: FundsService,
    private chainService: ChainService,
    public datepipe: DatePipe,
    private orderService : OrderServiceService,
    private snackBar : MatSnackBar ,
    public translate: TranslateService

    ) { }


  ngOnInit() {
    this.onGetFunds();
    this.onGetPaymentMethod();
    this.dataSource.paginator = this.paginator;
    this.onGetSuppliersList();
  }
  ngAfterViewInit(){
    this.dataSource.sort= this.sort;
  }

  fundsList;
  fundsData;
  chainData;
  chain;
  displayedColumns = ['amount', 'status','company_name','start_date','finish_date', 'actions'];
  dataSource = new MatTableDataSource<any>();
  onGetFunds() {
    return this.fundsService.getPurchasedFundB2B().subscribe(res => {
      this.fundsList = res;
      this.fundsData = this.fundsList.data;
      this.displayedColumns = [ 'fund_image','amount', 'status','company_name','start_date','finish_date' , 'actions'];
      this.dataSource.data =this.fundsData ;
    }, err => {
      console.log(err);;
    }
    );
  }
  suppliersList;
  suppliersData;
  onGetSuppliersList(){
    return this.supplierService.getSupplierList().subscribe(
      res=>{
         this.suppliersList = res;
         this.suppliersData = this.suppliersList.data;
      }, err=>{
        console.log(err);;
      }
    );
  }
  openAddFunds() {
    let dialogRef = this.dialog.open(B2bAddPurchasedFundsComponent)
    dialogRef.afterClosed().subscribe(res => {
      this.onGetFunds();
    })

  }

  
  onFiltrePurFunds(start_date?,payment_method_id?,end_date?){
    
    if(start_date == 0 || !start_date){
      start_date = ''
    }
    if(payment_method_id == 0 || !payment_method_id){
      payment_method_id = ''
    }
     if(end_date == 0 || !end_date){
       end_date = ''
    }
    
  
    var startdate = this.datepipe.transform(start_date, 'yyyy-MM-dd')
    var _finish_date = this.pipe.transform(end_date, 'yyyy-MM-dd')

    return this.fundsService.getFiltredPurchasedFundB2B(startdate,payment_method_id,_finish_date).subscribe(res => {
      this.fundsList = res;
      this.fundsData = this.fundsList.data;
      //console.log(this.fundsData)
      //this.displayedColumns = ['fund_image','amount', 'status','company_name','start_date','finish_date' , 'actions'];
      this.dataSource = new MatTableDataSource<any>(this.fundsData);
    }, err => {
      console.log(err);;
    }
    );
  }
  payments;
  payment;
onGetPaymentMethod(){
  return this.fundsService.getPaymentMethod().subscribe(
    res=>{
       this.payment = res;
       this.payments=this.payment.data
    }, err => {
      console.log(err);;
    }
  );

}
onDelete(id){
  return this.fundsService.deletePurchasedFund(id).subscribe(
    res => {
      this.snackBar.open(this.translate.currentLang === 'Chinese' ?  '资金已成功删除' :this.translate.currentLang === 'Italian' ? "Fondo eliminato con successo":'Fund Successfully Deleted', "OK", {
        duration: 1000,
      });
      this.onGetFunds();
    }, err => {
      console.log(err);;
    }
  );
}
}

