import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { BasketService } from 'src/app/core/services/basket.service';
import { BasketItem } from 'src/app/shared/models/basket-item';

@Component({
  selector: 'app-basket-widget',
  templateUrl: './basket-widget.component.html',
  // encapsulation: ViewEncapsulation.None,
  styleUrls: ['./basket-widget.component.scss']
})
export class BasketWidgetComponent implements OnInit {

  basketItems: any
  constructor(private basketService: BasketService) { }

  ngOnInit() {
    this.getBasketItems();
    this.updateBasketItems();
  }

  getBasketItems() {
    this.basketItems = this.basketService.getBasketItems();
  }

  updateBasketItems() {
    this.basketService.getUpdateTrigger().subscribe((product: any) => {
      this.getBasketItems();
    })
  }

  removeQte(item: BasketItem, index: number) {
    if (item.quantity - (item.product.product_box ? item.product.product_box : 1) > 0) {
      item.quantity -= item.product.product_box ? item.product.product_box : 1;
      item.item_price -= (item.product.product_box ? item.product.product_box : 1) * item.product.product_price;
      this.basketService.updateBasketItems(item, index);
    }
    // //console.log(index);
  }

  addQte(item: BasketItem, index: number) {
    if (item.quantity + (item.product.product_box ? item.product.product_box : 1) <= item.product.quantity) {
      item.quantity += item.product.product_box ? item.product.product_box : 1;
      item.item_price = item.quantity * item.product.product_price;
      this.basketService.updateBasketItems(item, index);
    }
  }

  removeItem(index: number) {
    this.basketService.deleteFromBasket(index)
  }
  getPrice(item) {
    return item.item_price;
  }
  getQuantity(item: BasketItem) {
    return item.quantity;
  }

}
