import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { DiscountService } from 'src/app/shared/services/discount.service';

@Component({
  selector: 'app-shop-edit-discount',
  templateUrl: './shop-edit-discount.component.html',
  styleUrls: ['./shop-edit-discount.component.scss']
})
export class ShopEditDiscountComponent implements OnInit {
  currentId
  constructor( private discountService: DiscountService,
    public datepipe: DatePipe,
    private snackbar: MatSnackBar,
    private activatedRouter: ActivatedRoute,private router: Router,
    public translate: TranslateService) {
    activatedRouter.params.subscribe((params) => {
    this.currentId = params.id;


  }); }

  ngOnInit() {
    this.onDiscountById(this.currentId);

  }

  currentDis;
  currentDiscount;
  onDiscountById(id){
    return this.discountService.getDiscountById(this.currentId).subscribe(
      (res) => {
        this.currentDiscount=res;
        //console.log(this.currentDiscount)
        this.currentDis = this.currentDiscount.data;
        //console.log(this.currentDis)
      },
      (err) => {
        console.log(err);;
      }
    );
  }
  onUpdateDiscount(start_date,end_date) {
    var strdate =this.datepipe.transform(start_date, 'yyyy-MM-dd');
    var endate =this.datepipe.transform(end_date, 'yyyy-MM-dd');

    var disc = {
     start_date: strdate,
     finish_date: endate,
   }

      //console.log(disc);
      this.discountService.editDiscount(this.currentId,disc).subscribe(
        (res) => {
          //console.log(res)
          this.snackbar.open(this.translate.currentLang === 'Chinese' ? "折扣信息已成功更改":this.translate.currentLang === 'Italian' ? 'Sconto modificato con successo':"Discount Edited Successfully", '',{

            duration: 1000,
          });
          this.router.navigate(["/shop/offline-discounts-list"]);
        },
        (err) => {
          console.log(err);;
        }
      );
    
  }
}
