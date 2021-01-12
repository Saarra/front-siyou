import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatSnackBar, MatDialogRef } from '@angular/material';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { parseInt } from 'lodash';
declare var $: any;
export interface basketElements {
  id: number,
  product_image_url: string,
  product_name: string,
  item_offline_price: any,
  item_quantity: any,
  item_discount_price: any,
  totalPrice: any
  supplier_id: any,
  first_name: any,
  last_name: any,
  email: any,
  phone_num1: any,
  totalProdWeight: any,
}
var basket: basketElements[] = [];
@Component({
  selector: 'app-cart-modal',
  templateUrl: './cart-modal.component.html',
  styleUrls: ['./cart-modal.component.scss']
})
export class CartModalComponent implements OnInit {
  currentProd;
  totalPrice;
  quantity = 1;
  totalProdWeight;
  basket: basketElements[] = [];
  currentProduct: any;
  basketLength = 0;
  constructor(
    private dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private router: Router,
    public translate: TranslateService,
    private dialogRef: MatDialogRef<CartModalComponent>,
  ) { }
  ngOnInit() {
    this.getProdInfos();
  }
  getProdInfos() {
    const _currentProd = JSON.parse(localStorage.getItem('storedProd'));
    this.currentProd = _currentProd;
    if (this.currentProd.item_discount_price != null) {
      this.totalPrice = parseInt(this.currentProd.item_discount_price);
    } else {
      this.totalPrice = parseInt(this.currentProd.item_offline_price);
    }
    this.totalProdWeight = this.currentProd.prodWeight;
  }
  redirectTo(uri: string) {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      this.router.navigate([uri]));
  };
  changeQuantity() {
    var inputValue = (<HTMLInputElement>document.getElementById("quant")).value;
    var quant = parseInt(inputValue);
    this.quantity = quant;
    if (this.currentProd.item_discount_price != null) {
      this.totalPrice = parseInt(this.currentProd.item_discount_price) * quant;
      this.totalProdWeight *= quant;
    } else {
      this.totalPrice = parseInt(this.currentProd.item_offline_price) * quant;
      this.totalProdWeight *= quant;
    }
  }
  addToBasket() {
    var storedProduct = JSON.parse(localStorage.getItem('storedProd'));
    var prod = {
      id: storedProduct.id,
      product_image_url: storedProduct.image_url,
      product_name: storedProduct.product_name,
      item_offline_price: storedProduct.item_offline_price,
      item_quantity: this.quantity,
      item_discount_price: storedProduct.item_discount_price,
      totalPrice: this.totalPrice,
      supplier_id: storedProduct.supplier_id,
      first_name: storedProduct.first_name,
      last_name: storedProduct.last_name,
      email: storedProduct.email,
      phone_num1: storedProduct.phone_num1,
      logistic_service: storedProduct.logistic_service,
      totalProdWeight: this.totalProdWeight
    }
    if (localStorage.getItem("Basket") != null) {
      var storedBasket = JSON.parse(localStorage.getItem('Basket'));
      this.basket = storedBasket;
      var found = 0;
      this.basket.forEach(oneData => {
        if (oneData.id == prod.id) {
          let singleWeight = oneData.totalProdWeight / oneData.item_quantity;
          oneData.item_quantity += prod.item_quantity;
          oneData.totalProdWeight = singleWeight * oneData.item_quantity;
          found = 1;
          localStorage.setItem("Basket", JSON.stringify(this.basket));
          this._snackBar.open('Quantity updated successfully for this product', 'OK', {
            duration: 2000
          });
          // this.redirectTo(`shop/products-list`);
          this.router.navigate(['shop/products-list']);

          this.dialog.closeAll();
        }
      });
      if (found == 0) {
        this.basket.push(prod);
        this.basketLength = this.basket.length;
        localStorage.setItem("Basket", JSON.stringify(this.basket));
        this._snackBar.open(this.translate.currentLang === 'Chinese' ? "产品已成功添加到购物车":this.translate.currentLang === 'Italian' ? "Prodotto aggiunto con successo al tuo carrello":'Product added to your cart successfully', '',{
          duration: 2000
        });
        // this.redirectTo(`shop/products-list`);
        this.dialog.closeAll();
        this.router.navigate(['shop/products-list']);
      }
    } else {
      this.basket.push(prod);
      this.basketLength = this.basket.length;
      localStorage.setItem("Basket", JSON.stringify(this.basket));
      this._snackBar.open(this.translate.currentLang === 'Chinese' ? "产品已成功添加到购物车":this.translate.currentLang === 'Italian' ? "Prodotto aggiunto con successo al tuo carrello":'Product added to your cart successfully', '',{
        duration: 2000
      });
      // this.redirectTo(`shop/products-list`);
      this.router.navigate(['shop/products-list']);

      this.dialog.closeAll();
    }
  }
}
