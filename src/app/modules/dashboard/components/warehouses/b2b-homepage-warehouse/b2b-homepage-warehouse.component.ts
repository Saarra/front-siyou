import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/shared/services/products.service';
import { DatePipe, formatDate } from '@angular/common';
formatDate(new Date(), 'yyyy/MM/dd', 'en');
import { ChainService } from 'src/app/shared/services/chain.service';
import { FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-b2b-homepage-warehouse',
  templateUrl: './b2b-homepage-warehouse.component.html',
  styleUrls: ['./b2b-homepage-warehouse.component.scss']
})
export class B2bHomepageWarehouseComponent implements OnInit {
  from;
  to;
  formData: any;
  formStock: any;
  situation;
  constructor(private productService: ProductsService,
    private formBuilder: FormBuilder,
    public datepipe: DatePipe
  ) {
    this.formData = new FormData();
  }
  ngOnInit() {
    var first = new Date();
    var last = new Date(first.getFullYear(), first.getMonth() - 1, first.getDate());
    this.from = this.datepipe.transform(last, 'yyyy/MM/dd')
    this.situation = this.datepipe.transform(first, 'dd/MM/yyyy')
    this.to = this.datepipe.transform(first, 'yyyy/MM/dd')
    this.formStock = this.formBuilder.group({
      from: this.from,
      to: this.to,
      chain_id: ['', Validators.required],
    });
  }
  toFormData<T>(formValue: T) {
    const formData = new FormData();
    for (const key of Object.keys(formValue)) {
      const value = formValue[key];
      formData.append(key, value);
    }
    return formData;
  }
  StockList;
  StockData;
  warning: number = 0;
  remind: number = 0;
  warProducts = [];
  remindProducts = [];
}
