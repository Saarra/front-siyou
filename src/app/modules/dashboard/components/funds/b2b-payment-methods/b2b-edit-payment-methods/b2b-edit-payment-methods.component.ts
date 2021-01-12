import { Component, OnInit } from '@angular/core';
import { ChainService } from 'src/app/shared/services/chain.service';
import { FundsService } from 'src/app/shared/services/funds.service';
import { MatTableDataSource } from '@angular/material';
import {  MatSnackBar } from '@angular/material';
import { ActivatedRoute ,Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-b2b-edit-payment-methods',
  templateUrl: './b2b-edit-payment-methods.component.html',
  styleUrls: ['./b2b-edit-payment-methods.component.scss']
})
export class B2bEditPaymentMethodsComponent implements OnInit {
  chain;
  form;
  formData;
  chainData;
  paymentData;
  paymentList;
  currentId;
  constructor(
    private chainService: ChainService,
    private fundsService: FundsService,
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
    this.onGetPaymentMeth();
    this.onGetPaymentById(this.currentId);
  }

  currentPayment
  currentList
  onGetPaymentById(id){
    return this.fundsService.getPaymentMethodById(this.currentId).subscribe(
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
    return this.fundsService.getPaymentMethod().subscribe(
      res => {
        this.paymentList = res;
        this.paymentData = this.paymentList.data;
      }, err => {
        console.log(err);;
      }
    );

  }

  onUpdatePayment(_name,_days){
    var payment = {
      name:_name,
      days:_days,
    }
    return this.fundsService.editPaymentMethod(payment,this.currentId).subscribe(res => {
        //console.log(payment);
        //this.redirectTo(`funds/payment-methods`);
        this.router.navigate(["funds/payment-methods"]);

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
