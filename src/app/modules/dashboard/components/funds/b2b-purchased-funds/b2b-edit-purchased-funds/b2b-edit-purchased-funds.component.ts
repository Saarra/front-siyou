import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { SupplierService } from 'src/app/shared/services/supplier.service';
import { OrderServiceService } from 'src/app/shared/services/order-service.service';
import { FundsService } from 'src/app/shared/services/funds.service';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import {  MatSnackBar,MatDialogRef ,MatInput } from '@angular/material';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-b2b-edit-purchased-funds',
  templateUrl: './b2b-edit-purchased-funds.component.html',
  styleUrls: ['./b2b-edit-purchased-funds.component.scss']
})
export class B2bEditPurchasedFundsComponent implements OnInit {
  @ViewChild('resultInput', { static: false }) resultInput: ElementRef;
  form: any;
  formData: any;
  currentId
  constructor(
    private supplierService: SupplierService,
    private orderService : OrderServiceService,
    private router: Router,
    private fundsService : FundsService,
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
      status:['', Validators.required],
      amount:['', Validators.required],
      start_date: ['', Validators.required],
      supplier_id:['', Validators.required],
      payment_method_id:['', Validators.required],
      fund_image: ['', Validators.required]
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
  currentFundData
  currentFund
  onGetFundById(id){
    return this.fundsService.getPurchasedFundById(this.currentId).subscribe(
      res=>{
         this.currentFund = res;
         this.currentFundData= this.currentFund.data
         //console.log(this.currentFund)
      }, err=>{
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
      }, err=>{
        console.log(err);;
      }
    );
  }
  ;


  
  paymentsList;
  payments;
onGetPaymentMethod(){
  return this.fundsService.getPaymentMethod().subscribe(
    res=>{
       this.paymentsList = res;
       this.payments = this.paymentsList.data;

       //console.log(res)
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
  }
}


onUpdateFunds(){
  this.formData = this.toFormData(this.form.value);
    this.fundsService.editPurchasedFund(this.formData,this.currentId).subscribe(res => {
      //this.redirectTo(`funds/purchased-funds`);
      this.router.navigate(["funds/purchased-funds"]);

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
