import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as _ from 'lodash';
declare var $: any;
@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.scss']
})
export class CartPageComponent implements OnInit {
  currentProd;
  totalPrice;
  quantity = 1;
  index = 0;
  basketLength;
  basket;
  orderTotal = 0;
  constructor(
    private router: Router
  ) { }
  ngOnInit() {
    this.getBasketLength();
    this.getBasketProducts();
    this.GroupBasketBySupplier()
  }
  getBasketLength() {
    const _basket = JSON.parse(localStorage.getItem('Basket'));
    const _basketLength = _basket.length;
    const basketLength = 0;
    if (_basketLength) {
      this.basketLength = _basketLength
    } else {
      this.basketLength = 0;
    }
  }
  getBasketProducts() {
    var storedBasket = JSON.parse(localStorage.getItem('Basket'));
    this.basket = storedBasket;
    this.basket.forEach(oneData => {
      this.orderTotal += oneData.totalPrice;
    });
  }
  changeQuantity(_id, _index: number) {
    var elem = document.getElementsByClassName("quantity");
    var elem1 = document.getElementById("quant");
    var inputValue = (<HTMLInputElement>document.getElementById("quant")).value;
    var inputValue1 = (<HTMLInputElement>document.getElementsByClassName("quantity")[_index]).value;
    var quant = parseInt(inputValue1);
    this.quantity = quant;
    var singleWeight = 0;
    for (var i = 0; i < this.basket.length; i++) {
      if (this.basket[i].id === _id) {
        if (this.basket[i].item_discount_price) {
          this.basket[i].totalPrice = parseInt(this.basket[i].item_discount_price) * quant;
          singleWeight = this.basket[i].totalProdWeight / this.basket[i].item_quantity;
          this.basket[i].totalProdWeight = singleWeight * quant;
          this.basket[i].item_quantity = quant;
        } else {
          this.basket[i].totalPrice = parseInt(this.basket[i].item_offline_price) * quant;
          singleWeight = this.basket[i].totalProdWeight / this.basket[i].item_quantity;
          this.basket[i].totalProdWeight = singleWeight * quant;
          this.basket[i].item_quantity = quant;
        }
      }
    }
    localStorage.setItem("Basket", JSON.stringify(this.basket));
    // this.redirectTo('shop/cart');
    this.router.navigate(['shop/cart']);

  }
  removeProdFromCart(_id) {
    for (var x = 0; x < this.basket.length; x++) {
      if (this.basket[x].id === _id) {
        this.basket.splice(x, 1);
        localStorage.setItem("Basket", JSON.stringify(this.basket));
        // this.redirectTo('shop/cart');
        this.router.navigate(['shop/cart']);

      }
    }
  }
  redirectTo(uri: string) {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      this.router.navigate([uri]));
  }
  GroupBasketBySupplier() {
    var grouped = _.mapValues(_.groupBy(this.basket, 'supplier_id'),
      clist => clist.map(order => _.omit(order, 'supplier_id')));
  }
}
