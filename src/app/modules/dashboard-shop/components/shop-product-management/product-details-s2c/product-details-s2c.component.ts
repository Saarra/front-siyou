import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/shared/services/products.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatSnackBar } from '@angular/material';
import { CartModalComponent } from '../../basket-management/cart-modal/cart-modal.component';

declare var $: any;

export interface basketElements {
  id: number,
  product_image_url: string,
  product_name: string,
  item_offline_price: any,
  item_quantity: any,
  item_discount_price: any,
  supplier_id: any,
  first_name: any,
  last_name: any,
  email: any,
  phone_num1: any

}

var basket: basketElements[] = [];

@Component({
  selector: 'app-product-details-s2c',
  templateUrl: './product-details-s2c.component.html',
  styleUrls: ['./product-details-s2c.component.scss']
})
export class ProductDetailsS2cComponent implements OnInit {

  basket: basketElements[] = [];

  OneProd: any;
  currentId;
  currentProduct: any;
  basketLength = 0;
  currentProd;
  totalPrice;
  quantity = 1;
  images;


  constructor(
    private productService: ProductsService,
    private router: ActivatedRoute,
    private route: Router,
    private dialog: MatDialog,
  ) {
    router.params.subscribe(params => {
      this.currentId = params.id;
    });
  }

  ngOnInit() {
    this.onGetProductItem(this.currentId);
  }

  onGetProductItem(currentId) {
    return this.productService.getProductItem(currentId).subscribe(
      res => {
        this.currentProduct = res;
      }, err => {
        console.log(err);;
      }
    );
  }

  CheckColor(Attr: any) {

    if (Attr === 'color') {
      return true;
    } else {
      return false;
    }

  }


  getColor(colorValue: any) {
  }

  setToMainImg(url: any) {

    $("#secondary-img div img").click(function () {
      const secimg = $(this).attr("src");
      $("#main-img").attr("src", secimg);
    });

  }

  redirectTo(uri: string) {
    this.route.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      this.route.navigate([uri]));
  }

  prodWeight = 0;
  weightFound = 0;


  openCartModal(_id: any, _product_name?, _item_offline_price?, _item_discount_price?, _item_quantity?, _image_url?, _supplier_id?, _first_name?, _last_name?, _email?, _phone_num1?, _logistic_service?, prod_item?) {
    if (prod_item) {
      for (let i = 0; i < prod_item.criteria_base.length; i++) {
        if (prod_item.criteria_base[i].name.toLowerCase() == 'weight') {
          this.prodWeight = prod_item.criteria_base[i].pivot.criteria_value;
          this.weightFound = 1;
        }
      }
      if (this.weightFound = 0) {
        this.prodWeight = 0;
      }

    }

    var item_image = this.currentProduct.images[0].image_url;
    this.OneProd = {
      id: _id,
      product_name: _product_name,
      item_offline_price: _item_offline_price,
      item_discount_price: _item_discount_price,
      item_quantity: _item_quantity,
      image_url: item_image,
      supplier_id: _supplier_id,
      first_name: _first_name,
      last_name: _last_name,
      email: _email,
      phone_num1: _phone_num1,
      logistic_service: _logistic_service,
      prodWeight: this.prodWeight

    }
    localStorage.setItem("log_ser", JSON.stringify(_logistic_service));
    localStorage.setItem("storedProd", JSON.stringify(this.OneProd));
    this.dialog.open(CartModalComponent);
  }




}

