import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { SupplierS2cService } from 'src/app/shared/services/supplier-s2c.service';
import { ChainService } from 'src/app/shared/services/chain.service';
import { OrderServiceService } from 'src/app/shared/services/order-service.service';
import { FundsS2cService } from 'src/app/shared/services/funds-s2c.service';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import {  MatSnackBar,MatDialogRef ,MatInput } from '@angular/material';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-shop-edit-fund',
  templateUrl: './shop-edit-fund.component.html',
  styleUrls: ['./shop-edit-fund.component.scss']
})
export class ShopEditFundComponent implements OnInit {
  @ViewChild('resultInput', { static: false }) resultInput: ElementRef;
  form: any;
  formData: any;
  currentId
  constructor(
    private supplierService: SupplierS2cService,
    private chainService: ChainService,
    private orderService : OrderServiceService,
    private router: Router,
    private fundsS2cService : FundsS2cService,
    private _snackBar: MatSnackBar,
    public datepipe: DatePipe,
    private formBuilder: FormBuilder,
    private routerAct: ActivatedRoute,
    public translate: TranslateService



  ) {
    this.formData = new FormData();
    routerAct.params.subscribe(
      params=>{
        this.currentId = params.id; 
      }
    )
  }

  ngOnInit() {
    this.onGetFundById(this.currentId);
    this.form = this.formBuilder.group({
      status:[""],
      amount:[""],
      start_date: [""],
      chain_id:[""],
      supplier_id:[""],
      payment_method_id:[""],
      fund_image: ["",Validators.required]
    })
    this.onGetSuppliersList();
    this.onGetChainList();
    this.onGetPaymentMeth()
  }

  toFormData<T>(formValue: T) {
    const formData = new FormData();
    for (const key of Object.keys(formValue)) {
      const value = formValue[key];
      formData.append(key, value);
    }

    return formData;
  }
  current
  currentFund
  onGetFundById(id){
    return this.fundsS2cService.getPurchasedFundById(this.currentId).subscribe(
      res=>{
         this.currentFund = res;
         this.current= this.currentFund.data
         console.log(this.current)
      }, err=>{
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
  chain;
  chainData;

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
      }, err => {
        console.log(err);;
      }
    );

  }


getFileChange(event) {
  const fileInputImg = this.resultInput.nativeElement as MatInput;
  if (event.target.files.length > 0) {
    const file = event.target.files[0];
    //console.log(file);
    fileInputImg.value = file.name;
    this.form.get('fund_image').setValue(file);
    this.formData.append('fund_image', this.form.get('fund_image').value);
    //console.log(this.formData)
  }
}

start:any;
onUpdateFunds(amount,supplier_id,chain_id,payment_method_id,start_date,status){
  this.form.get('amount').setValue(amount);
  this.form.get('supplier_id').setValue(supplier_id);
  this.form.get('chain_id').setValue(chain_id);
  this.form.get('payment_method_id').setValue(payment_method_id);
  this.start= this.datepipe.transform(start_date,"yyyy-MM-dd")
  this.form.get('start_date').setValue(this.start);
  this.form.get('status').setValue(status);
  this.formData = this.toFormData(this.form.value);
  //console.log(this.formData)
  //console.log(this.form.value)
    this.fundsS2cService.editPurchasedFund(this.formData,this.currentId).subscribe(res => {
      // this.redirectTo(`shop/purchased-funds`);
      this.router.navigate(['shop/purchased-funds']);

            this._snackBar.open(this.translate.currentLang === 'Chinese' ? "资金信息已成功更新":this.translate.currentLang === 'Italian' ? "Fondi aggiornati con successo":'Funds Successfully Updated', '',{
          duration: 1000,
        });
    }, err => {
      this._snackBar.open(this.translate.currentLang === 'Chinese' ? "您必须添加资金图片":this.translate.currentLang === 'Italian' ? "Devi aggiungere l'immagine del fondo":'You must add Fund Image', '',{

        duration: 3000,
        panelClass: ['loginSnackbar']
      });      
      console.log(err);;
    });
  }
redirectTo(uri:string){
  this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
  this.router.navigate([uri]));
}

}
