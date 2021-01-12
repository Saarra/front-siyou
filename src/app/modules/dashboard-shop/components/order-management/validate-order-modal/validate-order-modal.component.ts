import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { OrderServiceService } from 'src/app/shared/services/order-service.service';
import { MatSnackBar, MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { PaymentService } from 'src/app/shared/services/payment.service';
import { DatePipe } from '@angular/common';
import { CompanyService } from 'src/app/shared/services/company.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-validate-order-modal',
  templateUrl: './validate-order-modal.component.html',
  styleUrls: ['./validate-order-modal.component.scss']
})
export class ValidateOrderModalComponent implements OnInit {

  basketLoop;
  currentOrder;

  payments;
  paymentList;



  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private router: Router,
    private orderService: OrderServiceService,
    private snackbar: MatSnackBar,
    private paymentService: PaymentService,
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<ValidateOrderModalComponent>,
    public datepipe: DatePipe,
    private companyService: CompanyService,
    private translate : TranslateService
    



  ) { }

  ngOnInit() {

    this.currentOrder = this.dialogRef.componentInstance.data;
    this.getPaymentTypes();
    this.onGetCompaniesList();
    


  }



  onValidatePurchaseOrder(_payment_method_id, _required_date) {

    var required_date = this.datepipe.transform(_required_date, 'yyyy-MM-dd');

    this.currentOrder.required_date = required_date;
    this.currentOrder.payment_method_id = _payment_method_id;


    // it will be updated

    delete this.currentOrder.logistic_service;
    delete this.currentOrder.email;
    delete this.currentOrder.last_name;
    delete this.currentOrder.first_name;







    return this.orderService.validatePurchaseOrder(this.currentOrder).subscribe(
      res => {
        this.snackbar.open(this.translate.currentLang === 'Chinese' ? "订单已成功确认":this.translate.currentLang === 'Italian' ? "Il tuo ordine è stato convalidato con successo":'Your order has been validated successfully', '', {
          duration: 2000
        });

        var _storedBasket = JSON.parse(localStorage.getItem('Basket'));
        this.basketLoop = _storedBasket;

        var _basketLoopLength = _storedBasket.length;


        let y = 0;
        var basketKeep = [];
        this.basketLoop.forEach(oneData => {

          if (oneData.supplier_id != this.currentOrder.supplier_id) {
            // this.basketLoop.splice(y,1);
            basketKeep.push(oneData);

          }
          y += 1;
        });

        localStorage.setItem("Basket", JSON.stringify(basketKeep));
        var checkBasket = JSON.parse(localStorage.getItem('Basket'));


        if (checkBasket.length == 0) {
          var emptyArray = []
          localStorage.setItem("orderCheckout", JSON.stringify(emptyArray));

        }





        // this.redirectTo(`shop/checkout`);
        this.router.navigate([`shop/checkout`]);


        this.dialog.closeAll();





      }, err => {
        console.log(err);;
      }
    )



  }


  redirectTo(uri: string) {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      this.router.navigate([uri]));
  }

  getPaymentTypes() {
    this.paymentService.getPaymentTypesList().subscribe(
      res => {
        this.payments = res;
        this.paymentList = this.payments.paymentList;
      }
    )
  }

  paymentId;
  getPaymentValue(id: number) {
    this.paymentId = id;
  }
  
  companiesList;
  onGetCompaniesList(){
    return this.companyService.getCompaniesList().subscribe(
      res=>{
        this.companiesList = res;
      }, err =>{
        console.log(err);;
      }
    )
  }

}
