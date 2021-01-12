import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import { BehaviorSubject } from 'rxjs';
import { BasketItem } from 'src/app/shared/models/basket-item';

@Injectable({
  providedIn: 'root'
})
export class BasketService {
  private basketKey: string;
  private updateBasket = new BehaviorSubject(null);
  private basketItems: Array<any> = [];
  constructor() {
    this.basketKey = `basket@${localStorage.getItem('userEmail').split('@')[0]}`;
  }

  addToBasket(product: any): Promise<any> {
    const basketItem: BasketItem = new BasketItem();
    basketItem.quantity = product.product_box ? product.product_box : 1;
    basketItem.item_price = basketItem.quantity * product.product_price;
    basketItem.product = product;
    // product.quantity = 1;
    return new Promise((resolve, reject) => {
      try {
        if (localStorage.getItem(this.basketKey)) {
          this.basketItems = this.getBasketItems();
        }
        this.basketItems.push(basketItem);
        localStorage.setItem(this.basketKey, JSON.stringify(this.basketItems));
        resolve('added');
      } catch (error) {
        reject(error)
      }
    })
  }

  deleteFromBasket(index) {
    let basketItems = this.getBasketItems();
    basketItems.splice(index, 1);
    localStorage.setItem(this.basketKey, JSON.stringify(basketItems));
  }

  getBasketItems() {
    return localStorage.getItem(this.basketKey) ? JSON.parse(localStorage.getItem(this.basketKey)) as Array<any> : [];
  }

  transformBasketData(): Promise<any> {
    return new Promise((resolve, reject) => {
      try {
        const basketItems = this.getBasketItems();
        let supplierList = [];
        basketItems.forEach(element => {
          if (!this.checkSupplierList(supplierList, element.product.supplier_id).length) {
            supplierList.push(element.product.supplier);
            return true;
          }
          return false;
        })
        const groupedValues = _.mapValues(
          _.groupBy(basketItems, 'product.supplier_id'), data =>
          data.map(item => _.omit(item, 'product.supplier')));
        const transformedBasketValues = supplierList.map(element => {
          element.products = groupedValues[element.id];
          return element;
        });
        resolve(transformedBasketValues);

      } catch (error) {
        reject(error);
      }
    })
  }

  private checkSupplierList(supplierList: any, supplierId: any) {
    if (!supplierList.length) {
      return true;
    }
    return supplierList.filter((element: any) => element.id === supplierId);
  }

  

  triggerUpdateBasket(product: any) {
    this.updateBasket.next(product);
  }

  getUpdateTrigger(): BehaviorSubject<any> {
    return this.updateBasket;
  }


  getBasketPrice() {

  }

  defineBasket() {

  }

  getItemIndexByProductId(product_id) {
    const basketIndex = this.getBasketItems().filter((element, index) => {
      return element.product.id === product_id ? index : false;
    })
    return basketIndex;
  }
  updateBasketProductList(orderProdList: any): Promise<any> {
    const initialBasketItems = this.getBasketItems().length;
    return new Promise((resolve, reject) => {
      const productIdsList = orderProdList.map(element => {
        return element.product_id;
      })
      productIdsList.forEach(element => {
        const basketItems = this.getBasketItems();
        basketItems.forEach((item, index) => {
          if (element === item.product.id) {
            this.deleteFromBasket(index);
          }
        })
      })

      if ((initialBasketItems - this.getBasketItems().length) === orderProdList.length) {
        resolve()
      } else {
        reject()
      }
    })
  }
  updateBasketItems(item: BasketItem, index: number) {
    const basketItems = this.getBasketItems();
    basketItems[index] = item;
    localStorage.setItem(this.basketKey, JSON.stringify(basketItems));
  }

  resetBasket() { }
}
