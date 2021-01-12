import { Component, OnInit } from '@angular/core';
import { ProductsS2cService } from 'src/app/shared/services/products-s2c.service';
import {DatePipe, formatDate} from '@angular/common';
formatDate(new Date(), 'yyyy/MM/dd', 'en');
import { ChainService } from 'src/app/shared/services/chain.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-warehouses',
  templateUrl: './warehouses.component.html',
  styleUrls: ['./warehouses.component.scss']
})
export class WarehousesComponent implements OnInit {
  from;
  to;
  formData:any;
  formStock:any;
  situation;
  constructor( private productService : ProductsS2cService,
    private chainService: ChainService,
    private formBuilder: FormBuilder,
    public datepipe: DatePipe
    ) {
      this.formData=new FormData();
     }

  ngOnInit() {
    this.onGetChainsList()
    var first = new Date();
    var last = new Date(first.getFullYear(), first.getMonth() - 1, first.getDate());
    this.from= this.datepipe.transform(last, 'yyyy/MM/dd')
    this.situation = this.datepipe.transform(first, 'dd/MM/yyyy')
    this.to= this.datepipe.transform(first, 'yyyy/MM/dd')
    this.formStock=this.formBuilder.group({
      from:this.from,
      to:this.to,
      chain_id:['',Validators.required],    
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
  chainsList;
  chainData;
  chainLength: number = 0;
  onGetChainsList() {
    return this.chainService.getChainsList().subscribe(
      res => {
        this.chainsList = res;
        this.chainData = this.chainsList.data;
      }, err => {
        console.log(err);;
      }
    );
  }
  StockList;
  StockData;
  warning:number=0;
  remind:number=0;
  warProducts= [];
  remindProducts=[];
  onGetstatStock(){
  this.warProducts= [];
  this.remindProducts=[];
  this.warning=0;
  this.remind=0;
    this.formData = this.toFormData(this.formStock.value);
    this.productService.getstatStock(this.formData).subscribe(res => {
      this.StockList= res;
      this.StockData = this.StockList.data;
      for (let war in this.StockData.data.product_quantity) {
        if (this.StockData.data.product_quantity[war]< 5)
        {this.warning += 1;
          this.warProducts.push(this.StockData.label[war])}
        if ( (this.StockData.data.product_quantity[war]< 30) && (5 < this.StockData.data.product_quantity[war])){
        this.remind+=1;
       this.remindProducts=this.StockData.label[war];
        }
      }//}
    }, err => {
      console.log(err);;
    });
  }
}
