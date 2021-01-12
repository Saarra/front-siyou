import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { SupplierS2cService } from 'src/app/shared/services/supplier-s2c.service';
import { ChainService } from 'src/app/shared/services/chain.service';
import { OrderServiceService } from 'src/app/shared/services/order-service.service';
import { FundsS2cService } from 'src/app/shared/services/funds-s2c.service';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import {  MatSnackBar,MatDialogRef ,MatInput } from '@angular/material';
import { FormBuilder, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-shop-add-fund',
  templateUrl: './shop-add-fund.component.html',
  styleUrls: ['./shop-add-fund.component.scss']
})
export class ShopAddFundComponent implements OnInit {
  @ViewChild('resultInput', { static: false }) resultInput: ElementRef;
  form: any;
  formData: any;

  constructor(
    private supplierService: SupplierS2cService,
    private chainService: ChainService,
    private orderService : OrderServiceService,
    private router: Router,
    private fundsS2cService : FundsS2cService,
    private _snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<ShopAddFundComponent>,
    public datepipe: DatePipe,
    private formBuilder: FormBuilder,
    public translate: TranslateService


  ) {
    this.formData = new FormData();
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      status:[''],
      amount:[''],
      start_date: [''],
      chain_id:[''],
      supplier_id:[''],
      payment_method_id:[''],
      fund_image: ['']
    })
    this.onGetSuppliersList();
    this.onGetChainList();
    this.onGetPaymentMeth()   ;
  }

  toFormData<T>(formValue: T) {
    const formData = new FormData();
    for (const key of Object.keys(formValue)) {
      const value = formValue[key];
      formData.append(key, value);
    }

    return formData;
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



onAddFunds(){
  this.formData = this.toFormData(this.form.value);
  //console.log(this.formData)
  //console.log(this.form.value)
    this.fundsS2cService.addFundsPaymentMethod(this.formData).subscribe(res => {
      this.dialogRef.close()
      this._snackBar.open(this.translate.currentLang === 'Chinese' ? "资金已成功添加":this.translate.currentLang === 'Italian' ? "Fondi aggiunti con successo":'Funds Successfully Added', '',{          duration: 1000,
        });
    }, err => {
      console.log(err);;
    });
  }
redirectTo(uri:string){
  this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
  this.router.navigate([uri]));
}

cancel(){
  this.dialogRef.close()
}
getFileChange(event) {
  const fileInputImg = this.resultInput.nativeElement as MatInput;
  if (event.target.files.length > 0) {
    const file = event.target.files[0];
    //console.log(file);
    fileInputImg.value = file.name;
    this.form.get('fund_image').setValue(file);
    this.formData.append('fund_image', this.form.get('fund_image').value);
  }
}

}