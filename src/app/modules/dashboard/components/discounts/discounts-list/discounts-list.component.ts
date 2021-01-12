import { Component, OnInit, ViewChild } from '@angular/core';
import { DiscountService } from 'src/app/shared/services/discount.service';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
@Component({
  selector: 'app-discounts-list',
  templateUrl: './discounts-list.component.html',
  styleUrls: ['./discounts-list.component.scss']
})
export class DiscountsListComponent implements OnInit {
  discountList;
  data;
  displayedColumns = ['image_url', 'product_name', 'item_offline_price', 'type', 'item_discount_price', 'start_date', 'finish_date', 'details'];
  dataSource = new MatTableDataSource<any>(this.data);
  discLength = 0;
  sumDisc = 0;
  maxDiscPrice;
  maxDiscDate;
  minDiscPrice;
  minDiscDate;
  lastDisc;
  lastDiscPrice;
  lastDiscDate;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  constructor(
    private discountService: DiscountService
  ) { }
  ngOnInit() {
    this.ongetDiscountList();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  ongetDiscountList(_keyword?, _barcode?) {
    if (!_keyword) {
      _keyword = '';
    }
    if (!_barcode) {
      _barcode = '';
    }
    return this.discountService.getDiscountList(_keyword, _barcode).subscribe(
      res => {
        this.discountList = res;
        this.data = this.discountList.data;
        for (let el of this.data) {
          this.discLength += 1;
          this.sumDisc += parseInt(el.item_discount_price);
        }
        let max = 0;
        this.data.forEach(oneData => {
          if (oneData.item_discount_price > max) {
            max = oneData.item_discount_price;
            this.maxDiscPrice = oneData.item_discount_price;
            this.maxDiscDate = oneData.created_at
          }
        });
        let min = this.data[0];
        let minPrice = min.item_discount_price;
        let minDate = min.created_at;
        this.data.forEach(oneData => {
          if (oneData.item_discount_price < minPrice) {
            minPrice = oneData.item_discount_price;
            this.minDiscPrice = oneData.order_price;
            this.minDiscDate = oneData.order_date
          } else {
            this.minDiscPrice = minPrice;
            this.minDiscDate = minDate;
          }
        });
        this.lastDisc = this.data[this.data.length - 1];
        this.lastDiscPrice = this.lastDisc.item_discount_price;
        this.lastDiscDate = this.lastDisc.created_at;
        this.displayedColumns = ['image_url', 'product_name', 'item_offline_price', 'type', 'item_discount_price', 'start_date', 'finish_date', 'details'];
        this.dataSource = new MatTableDataSource<any>(this.data);
      }, err => {
        console.log(err);;
      }
    );
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  filterDiscountList(_keyword?, _barcode?) {
    if (!_keyword) {
      _keyword = '';
    }
    if (!_barcode) {
      _barcode = '';
    }
    return this.discountService.filterDiscountList(_keyword, _barcode).subscribe(
      res => {
        this.discountList = res;
        this.data = this.discountList.data;
        for (let el of this.data) {
          this.discLength += 1;
          this.sumDisc += parseInt(el.item_discount_price);
        }
        let max = 0;
        this.data.forEach(oneData => {
          if (oneData.item_discount_price > max) {
            max = oneData.item_discount_price;
            this.maxDiscPrice = oneData.item_discount_price;
            this.maxDiscDate = oneData.created_at
          }
        });
        let min = this.data[0];
        let minPrice = min.item_discount_price;
        let minDate = min.created_at;
        this.data.forEach(oneData => {
          if (oneData.item_discount_price < minPrice) {
            minPrice = oneData.item_discount_price;
            this.minDiscPrice = oneData.order_price;
            this.minDiscDate = oneData.order_date
          } else {
            this.minDiscPrice = minPrice;
            this.minDiscDate = minDate;
          }
        });
        this.lastDisc = this.data[this.data.length - 1];
        this.lastDiscPrice = this.lastDisc.item_discount_price;
        this.lastDiscDate = this.lastDisc.created_at;
        this.displayedColumns = ['image_url', 'product_name', 'item_offline_price', 'type', 'item_discount_price', 'start_date', 'finish_date', 'details'];
        this.dataSource = new MatTableDataSource<any>(this.data);
      }, err => {
        console.log(err);;
      }
    );
  }
}
