import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { SupplierService } from 'src/app/shared/services/supplier.service';
import { ChainService } from 'src/app/shared/services/chain.service';
import { OrderServiceService } from 'src/app/shared/services/order-service.service';
import { FundsService } from 'src/app/shared/services/funds.service';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import {  MatSnackBar,MatDialogRef ,MatInput } from '@angular/material';
import { FormBuilder, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-b2b-add-purchased-funds',
  templateUrl: './b2b-add-purchased-funds.component.html',
  styleUrls: ['./b2b-add-purchased-funds.component.scss']
})
export class B2bAddPurchasedFundsComponent implements OnInit {
  @ViewChild('resultInput', { static: false }) resultInput: ElementRef;
  form: any;
  formData: any;
  constructor(
    private supplierService: SupplierService,
    private chainService: ChainService,
    private orderService : OrderServiceService,
    private router: Router,
    private fundsService : FundsService,
    private _snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<B2bAddPurchasedFundsComponent>,
    public datepipe: DatePipe,
    private formBuilder: FormBuilder,
    public translate: TranslateService


  ) {     this.formData = new FormData();
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      status:[''],
      amount:[''],
      start_date: [''],
      supplier_id:[''],
      payment_method_id:[''],
      fund_image: ['']
    })
    this.onGetSuppliersList();
    this.onGetPaymentMethod()
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
  onGetSuppliersList(){
    return this.supplierService.getSupplierList().subscribe(
      res=>{
         this.suppliersList = res;
         //console.log(this.suppliersList)
      }, err=>{
        console.log(err);;
      }
    );
  }
 
  paymentsList;
  payments;
  onGetPaymentMethod(){
    return this.fundsService.getPaymentMethod().subscribe(
      res=>{
         this.paymentsList = res;
         this.payments=this.paymentsList.data
      }, err => {
        console.log(err);;
      }
    );
  
  }



onAddFunds(){
  this.formData = this.toFormData(this.form.value);
  //console.log(this.form.value)
    this.fundsService.addFundsPaymentMethod(this.formData).subscribe(res => {
      this.dialogRef.close()
      this._snackBar.open(this.translate.currentLang === 'Chinese' ? "资金已成功添加":this.translate.currentLang === 'Italian' ? "Fondi aggiunti con successo":'Funds Successfully Added', '',{  
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
