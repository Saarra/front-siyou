import { Component, OnInit, ViewChild, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { ChainService } from 'src/app/shared/services/chain.service';
import { FundsS2cService } from 'src/app/shared/services/funds-s2c.service';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog, MatDialogRef } from '@angular/material';
import {  MatSnackBar } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';
import { AddPaymentMethodComponent } from './add-payment-method/add-payment-method.component';

@Component({
  selector: 'app-payment-methods',
  templateUrl: './payment-methods.component.html',
  styleUrls: ['./payment-methods.component.scss']
})
export class PaymentMethodsComponent implements OnInit,AfterViewInit {
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  chain;
  chainData;
  paymentData;
  paymentList;
  pageSize=5;
  displayedColumns = ['name', 'days','actions'];
  dataSource = new MatTableDataSource();
  constructor(
    private chainService: ChainService,
    private fundsS2cService: FundsS2cService,
    private _snackBar: MatSnackBar,
    public translate: TranslateService,
    private dialog: MatDialog,


  ) { }

  ngOnInit() {
    this.onGetChainList();
    this.onGetPaymentMeth();
    this.dataSource.paginator = this.paginator;

  }
  ngAfterViewInit(){
    this.dataSource.sort= this.sort;
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
  onGetPaymentMeth(chain_id?) {
    if (chain_id == 0 || !chain_id) {
      chain_id = "";
    }
    return this.fundsS2cService.getPaymentMethod(chain_id).subscribe(
      res => {
        this.paymentList = res;
        this.paymentData = this.paymentList.data;
        this.dataSource.data=this.paymentData;
        console.log(res)
       
      }, err => {
        console.log(err);;
      }
    );

  }
  
  onDelete(id){
    return this.fundsS2cService.deletePaymentMethod(id).subscribe(
      res => {
        this._snackBar.open(this.translate.currentLang === 'Chinese' ? "付款方式已成功删除":this.translate.currentLang === 'Italian' ? "Metodo di pagamento eliminato con successo":'Payment Method Successfully Deleted', '',{           duration: 1000,
        });

        this.onGetPaymentMeth();

      }, err => {
        console.log(err);;
      }
    );
  }

  openAddPaymentMethod() {
    // open modals methods
    let dialogRef = this.dialog.open(AddPaymentMethodComponent)
    dialogRef.afterClosed().subscribe(res => {
      this.onGetPaymentMeth()
    })

  }
}
