import { Component, OnInit, ViewChild, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { ShopAddFundComponent } from './shop-add-fund/shop-add-fund.component';
import { MatDialog ,MatDialogConfig} from '@angular/material';
import { FundsS2cService } from 'src/app/shared/services/funds-s2c.service';
import { ChainService } from 'src/app/shared/services/chain.service';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { DatePipe } from '@angular/common';
import { OrderServiceService } from 'src/app/shared/services/order-service.service';

import {  MatSnackBar } from '@angular/material';
import { SupplierS2cService } from 'src/app/shared/services/supplier-s2c.service';
import { TranslateService } from '@ngx-translate/core';
import { ExcelService } from 'src/app/shared/services/excel.service';

@Component({
  selector: 'app-purchased-funds',
  templateUrl: './purchased-funds.component.html',
  styleUrls: ['./purchased-funds.component.scss']
})
export class PurchasedFundsComponent implements OnInit ,AfterViewInit{
  pipe = new DatePipe('en-US');
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  constructor(private dialog: MatDialog,
    private supplierService: SupplierS2cService,
    private fundsS2cService: FundsS2cService,
    private chainService: ChainService,
    public datepipe: DatePipe,
    private orderService : OrderServiceService,
    private snackBar : MatSnackBar ,
    public translate: TranslateService,
    private excelService: ExcelService,

    ) { }

  ngOnInit() {
    this.onGetFunds();
    this.onGetChainList();
    this.onGetPaymentMeth()
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
  dataSource = new MatTableDataSource<any>(this.fundsData);
  onGetFunds() {
    return this.fundsS2cService.getPurchasedFund().subscribe(res => {
      this.fundsList = res;
      this.fundsData = this.fundsList.data;
      console.log(this.fundsData)
      this.dataSource.data =this.fundsData ;
      this.displayedColumns = [ 'fund_image','amount', 'status','company_name','start_date','finish_date' , 'actions'];
    }, err => {
      console.log(err);;
    }
    );
  }
  suppliersList;
  suppliersData;
  onGetSuppliersList(){
    return this.supplierService.GetSuppliersListS2C().subscribe(
      res=>{
         this.suppliersList = res;
         this.suppliersData = this.suppliersList.data;
      }, err=>{
        console.log(err);;
      }
    );
  }
  openAddFunds() {
    // open modals methods
    let dialogRef = this.dialog.open(ShopAddFundComponent)
    dialogRef.afterClosed().subscribe(res => {
      this.onGetFunds()
    })

  }
  onGetChainList() {
    return this.chainService.getChainList().subscribe(
      res => {
        this.chain = res;
        this.chainData = this.chain.data

      }, err => {
        console.log(err);;
      }
    );

  }
  onFiltrePurFunds(chain_id?,start_date?,payment_method_id?,end_date?,supplier_name?,status?){
    if(chain_id == 0 || !chain_id){
      chain_id = ''
    }
    if(start_date == 0 || !start_date){
      start_date = ''
    }
    if(payment_method_id == 0 || !payment_method_id){
      payment_method_id = ''
    }
     if(end_date == 0 || !end_date){
       end_date = ''
    }
    
   if(supplier_name == 0 || !supplier_name){
    supplier_name = ''
 }
 if(status == 0 || !status){
  status = ''
}
    var startdate = this.datepipe.transform(start_date, 'yyyy-MM-dd')
    var _finish_date = this.pipe.transform(end_date, 'yyyy-MM-dd')

    return this.fundsS2cService.getFiltredPurchasedFund(chain_id,startdate,payment_method_id,_finish_date,supplier_name,status).subscribe(res => {
      this.fundsList = res;
      this.fundsData = this.fundsList.data;
      this.displayedColumns = ['fund_image','amount', 'status','company_name','start_date','finish_date' , 'actions'];
      this.dataSource.data =this.fundsData ;
    }, err => {
      console.log(err);;
    }
    );
  }
  paymentList;
  paymentData;
  onGetPaymentMeth(chain_id?) {
    if (chain_id == 0 || !chain_id) {
      chain_id = "";
    }
    return this.fundsS2cService.getPaymentMethod(chain_id).subscribe(
      res => {
        this.paymentList = res;
        this.paymentData = this.paymentList.data;
        console.log(res)
       
      }, err => {
        console.log(err);;
      }
    );

  }
onDelete(id){
  return this.fundsS2cService.deletePurchasedFund(id).subscribe(
    res => {
      this.snackBar.open(this.translate.currentLang === 'Chinese' ? "资金已成功删除":this.translate.currentLang === 'Italian' ? 'Fondo eliminato con successo':'Fund Successfully Deleted', '',{
        duration: 1000,
        

      });
      this.onGetFunds();
    }, err => {
      console.log(err);;
    }
  );
}
onCancel(id){
  return this.fundsS2cService.cancelPurchasedFund(id).subscribe(
    res => {
      this.snackBar.open(this.translate.currentLang === 'Chinese' ? "资金已成功删除":this.translate.currentLang === 'Italian' ? 'Fondo eliminato con successo':'Fund Successfully Cancelled', 'OK',{
        duration: 1000,
        

      });
      this.onGetFunds();
    }, err => {
      console.log(err);;
    }
  );
}

fundExport;
fundData;
fundcurrent;
onexportAsExcelFile(id){
    this.fundExport = [];
    return this.fundsS2cService.getPurchasedFundById(id).subscribe(
      res => {
        this.fundData = res ; 
        this.fundcurrent = this.fundData.data
        console.log (this.fundcurrent)
          var fund ={Amount:'',Status:'' , Supplier: '', Start_Date:'' ,End_Date : '' };
          fund.Amount = this.fundcurrent.amount;
          fund.Status = this.fundcurrent.status;
          fund.Supplier=this.fundcurrent.supplier.supplier_name
          fund.Start_Date=this.fundcurrent.start_date
          fund.End_Date=this.fundcurrent.finish_date
       
          this.fundExport.push(fund);
          this.excelService.exportAsExcelFile(this.fundExport, 'Fund');

          })
      }
}
