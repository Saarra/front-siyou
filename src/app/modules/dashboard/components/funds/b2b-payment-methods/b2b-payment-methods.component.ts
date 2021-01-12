import { Component, OnInit, ViewChild, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { ChainService } from 'src/app/shared/services/chain.service';
import { FundsService } from 'src/app/shared/services/funds.service';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import {  MatSnackBar } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-b2b-payment-methods',
  templateUrl: './b2b-payment-methods.component.html',
  styleUrls: ['./b2b-payment-methods.component.scss']
})
export class B2bPaymentMethodsComponent implements OnInit,AfterViewInit {
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  chain;
  chainData;
  paymentData;
  paymentList;
  displayedColumns = ['name', 'days','actions'];
  dataSource = new MatTableDataSource();
  constructor(
    private chainService: ChainService,
    private fundsService: FundsService,
    private _snackBar: MatSnackBar,
    public translate: TranslateService


  ) { }

  ngOnInit() {
    this.onGetPaymentMeth()
    this.dataSource.paginator = this.paginator;

  }
  ngAfterViewInit(){
    this.dataSource.sort= this.sort;
  }

  onGetPaymentMeth() {
    return this.fundsService.getPaymentMethod().subscribe(
      res => {
        this.paymentList = res;
        this.paymentData = this.paymentList.data;
        //console.log(this.paymentData)
        this.displayedColumns = ['name', 'days','actions'];
        this.dataSource.data= this.paymentData;
      }, err => {
        console.log(err);;
      }
    );

  }

  onAddPayment(_name, _days) {
    if (!_name ||  !_days ) {
      alert('Please insert the required inputs')
    } else {
    var pay = {
      name: _name,
      days: _days,

    }
    return this.fundsService.addPaymentMethod(pay).subscribe(
      res => {
        this._snackBar.open(this.translate.currentLang === 'Chinese' ? "资金已成功添加":this.translate.currentLang === 'Italian' ? "Fondi aggiunti con successo":'Funds Successfully Added', '',{  
          duration: 1000,
        });
        this.onGetPaymentMeth();

      }, err => {
        console.log(err);;
      }
    );
  }}
  onDelete(id){
    return this.fundsService.deletePaymentMethod(id).subscribe(
      res => {

        this._snackBar.open(this.translate.currentLang === 'Chinese' ? "付款方式已成功删除":this.translate.currentLang === 'Italian' ? "Metodo di pagamento eliminato con successo":'Payment Method Successfully Deleted', '',{ 
                   duration: 1000,
        });

        this.onGetPaymentMeth();

      }, err => {
        console.log(err);;
      }
    );
  }
}

