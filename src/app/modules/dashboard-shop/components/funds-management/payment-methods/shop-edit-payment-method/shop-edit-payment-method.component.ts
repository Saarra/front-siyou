import { Component, OnInit } from '@angular/core';
import { ChainService } from 'src/app/shared/services/chain.service';
import { FundsS2cService } from 'src/app/shared/services/funds-s2c.service';
import { MatTableDataSource } from '@angular/material';
import {  MatSnackBar } from '@angular/material';
import { ActivatedRoute ,Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-shop-edit-payment-method',
  templateUrl: './shop-edit-payment-method.component.html',
  styleUrls: ['./shop-edit-payment-method.component.scss']
})
export class ShopEditPaymentMethodComponent implements OnInit {
  chain;
  form;
  formData;
  chainData;
  paymentData;
  paymentList;
  currentId;
  constructor(
    private chainService: ChainService,
    private fundsS2cService: FundsS2cService,
    private _snackBar: MatSnackBar,
    private routerAct: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router,
    public translate: TranslateService


  ) {

    routerAct.params.subscribe(
      params=>{
        this.currentId = params.id; 
        //console.log(this.currentId)
      }
    )
   }

  ngOnInit() {
    this.onGetChainList();
    this.onGetPaymentMeth();
    this.onGetPaymentById(this.currentId);
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
  currentPayment
  currentList
  onGetPaymentById(id){
    return this.fundsS2cService.getPaymentMethodById(this.currentId).subscribe(
      res=>{
         this.currentList = res;
         this.currentPayment= this.currentList.data
         //console.log(res)
      }, err=>{
        console.log(err);;
      }
    );
  }
  onGetPaymentMeth() {
    return this.fundsS2cService.getPaymentMethod().subscribe(
      res => {
        this.paymentList = res;
        this.paymentData = this.paymentList.data;
      }, err => {
        console.log(err);;
      }
    );

  }

  onUpdatePayment(_name,_days,_chain_id){
    var payment = {
      name:_name,
      days:_days,
      chain_id:_chain_id
    }
    return this.fundsS2cService.editPaymentMethod(payment,this.currentId).subscribe(res => {
        //console.log(payment);
        // this.redirectTo(`shop/payment-methods`);
        this.router.navigate(['shop/payment-methods']);

        this._snackBar.open(this.translate.currentLang === 'Chinese' ? "资金信息已成功更新":this.translate.currentLang === 'Italian' ? "Fondi aggiornati con successo":'Funds Successfully Updated', '',{
          duration: 1000,
          });
      }, err => {
        console.log(err);;
      });
    }
  redirectTo(uri:string){
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
    this.router.navigate([uri]));
  }
}
