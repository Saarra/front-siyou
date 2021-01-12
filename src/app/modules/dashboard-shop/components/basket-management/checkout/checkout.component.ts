import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';
import { Router } from '@angular/router';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { OrderServiceService } from 'src/app/shared/services/order-service.service';
import { MatSnackBar, MatDialog } from '@angular/material';
import { PaymentService } from 'src/app/shared/services/payment.service';
import { ValidateOrderModalComponent } from '../../order-management/validate-order-modal/validate-order-modal.component';
import { TranslateService } from '@ngx-translate/core';
declare var $: any;
export interface orderElements {
  supplier_id: any,
  order_total_price: any,
  order_weight: any,
  logistic_company_id: any,
  logistic_tarif: any,
  payment_method_id: any,
  required_date: any,
  logistic_service: any,
  order_products_list: [{
    item_id: any,
    item_quantity: any
  }
  ],
}
var orders: orderElements[] = [];
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0', visibility: 'hidden' })),
      state('expanded', style({ height: '*', visibility: 'visible' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class CheckoutComponent implements OnInit {
  expandedElement: null;
  orderDisplayedColumns = ['supplier', 'email', 'phone_num1', 'order_total_price', 'actions'];
  currentProd;
  totalPrice;
  quantity = 1;
  index = 0;
  finalOrder;
  orders: orderElements[] = [];
  allOrdersCheckout;
  basketLoop
  allOrders: {
    supplier_id: any,
    order_total_price,
    order_products_list: [];
  }[] = [];
  payments;
  paymentList;
  basketLength;
  basket;
  orderTotal = 0;
  constructor(
    private router: Router,
    private orderService: OrderServiceService,
    private snackbar: MatSnackBar,
    private paymentService: PaymentService,
    private dialog: MatDialog,
    public translate: TranslateService
  ) { }
  ngOnInit() {
    this.getBasketLength();
    this.getBasketProducts();
    this.GroupBasketBySupplier();
    this.getOrdersCheckout();
    this.getPaymentTypes();
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
  redirectTo(uri: string) {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      this.router.navigate([uri]));
  }
  GroupBasketBySupplier() {
    var groupedOrder = _.mapValues(_.groupBy(this.basket, 'supplier_id'),
      clist => clist.map(order => _.omit(order, 'supplier_id')));
    var _orderCheckout = [];
    localStorage.setItem("groupedOrder", JSON.stringify(groupedOrder));
    var groupedBasket = new Array;
    Object.keys(groupedOrder).forEach(function (item) {
      const el = groupedOrder[item];
      const el0 = groupedOrder[item][0];
      const _email = el0.email;
      var _order_total_price = 0;
      var el2 = groupedOrder[item][0].totalProdWeight;
      var oneOrder = {
        supplier_id: item,
        order_total_price: _order_total_price,
        first_name: el0.first_name,
        last_name: el0.last_name,
        email: el0.email,
        phone_num1: el0.phone_num1,
        logistic_service: el0.logistic_service,
        order_weight: 0,
        order_products_list: [
        ],
      }
      var _order_weight = 0;
      el.forEach(element => {
        const prod = {
          item_id: element.id,
          item_quantity: element.item_quantity,
          product_image_url: element.product_image_url,
          product_name: element.product_name
        }
        _order_weight += element.totalProdWeight;
        oneOrder.order_weight = _order_weight;
        oneOrder.order_products_list.push(prod);
        _order_total_price += element.totalPrice;
        oneOrder.order_total_price = _order_total_price;
      });
      _orderCheckout.push(oneOrder);
      localStorage.setItem("orderCheckout", JSON.stringify(_orderCheckout));
      const key_email = Object.keys(el).find(key => el[0][key] === 'email');
      groupedBasket.push(groupedOrder[item]);
      localStorage.setItem("groupedBasket", JSON.stringify(groupedBasket));
    });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.allOrdersCheckout.filter = filterValue.trim().toLowerCase();
    if (this.allOrdersCheckout.paginator) {
      this.allOrdersCheckout.paginator.firstPage();
    }
  }
  getOrdersCheckout() {
    var storedOrders = JSON.parse(localStorage.getItem('orderCheckout'));
    this.allOrdersCheckout = storedOrders;
  }
  onValidatePurchaseOrder(order, index: number) {
    if (!this.paymentId) {
      this.paymentId = 1
    }
    order.payment_method_id = this.paymentId;
    var pay_type = (<HTMLInputElement>document.getElementsByClassName("payment")[index]);
    var val = pay_type.value;
    if (confirm("Are you sure you want to validate this order?")) {
      return this.orderService.validatePurchaseOrder(order).subscribe(
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
            if (oneData.supplier_id != order.supplier_id) {
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
          this.router.navigate(['shop/checkout']);

        }, err => {
          console.log(err);;
        }
      )
    }
  }
  openValidateOrderModal(data) {
    this.dialog.open(ValidateOrderModalComponent, { data });
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
}
