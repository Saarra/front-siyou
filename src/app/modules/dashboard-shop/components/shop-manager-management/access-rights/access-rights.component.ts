import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { MatDialogRef } from "@angular/material";

@Component({
  selector: "app-access-rights",
  templateUrl: "./access-rights.component.html",
  styleUrls: ["./access-rights.component.scss"],
})
export class AccessRightsComponent implements OnInit {
  checkedStat = true;
  formGroup: FormGroup;
  color = "#003366";
  //B2B
  checkedB2S = true;
  add_quick_purchase = true;
  purchase_order = true;
  b2s_products = false;
  b2s_order_management = false;
  //Warehouse
  checkedWare = true;
  inventory_management = true;
  warehouse_management = true;
  returned_goods = true;
  inventory_history = true;
  stock_management = true;

  //S2C
  hide_cost_price = true;
  checkedS2C = true;
  product_list = true;
  add_product = true;
  siyou_suppliers = true;
  my_suppliers = true;
  siyou_categories = true;
  my_category = true;
  promotion_history = true;
  promotion_list = true;
  discount_history = true;
  sales_funds = true;
  accounts_payable = true;
  payment_methods = true;
  shop_operators_list = true;
  add_shop_operator = true;
  shop_cashiers_list = true;
  add_shop_cashier = true;
  advertisement = true;
  member_list = true;
  level_list = true;
  discount_list = true;
  s2c_orders_list = true;

  constructor(
    private dialogRef: MatDialogRef<AccessRightsComponent>,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {}

  checkedPur;
  cancel() {
    this.dialogRef.close();
  }
  confirm() {
    if (this.hide_cost_price == false) {
      this.add_product == false;
    }

    //B2S
    if (this.checkedB2S == false) {
      this.add_quick_purchase = false;
      this.purchase_order = false;
      this.b2s_products = false;
      this.b2s_order_management = false;
    }
    if( this.add_quick_purchase == true ||
      this.purchase_order == true ||
      this.b2s_products == true ||
      this.b2s_order_management == true) {
        this.checkedB2S == true
      }

      //Warehouse
    if (this.checkedWare == false) {
      this.inventory_management = false;
      this.warehouse_management = false;
      this.returned_goods = false;
      this.inventory_history = false;
      this.stock_management = false;
    }
    if( this.inventory_management == true ||
      this.warehouse_management == true ||
      this.returned_goods == true ||
      this.inventory_history == true ||
      this.stock_management == true ){
        this.checkedWare == true
      }
    //S2C
    if (this.checkedS2C == false) {
      this.product_list = false;
      this.add_product = false;
      this.siyou_suppliers = false;
      this.my_suppliers = false;
      this.siyou_categories = false;
      this.my_category = false;
      this.promotion_history = false;
      this.promotion_list = false;
      this.discount_list = false;
      this.discount_history = false;
      this.sales_funds = false;
      this.accounts_payable = false;
      this.payment_methods = false;
      this.shop_operators_list = false;
      this.add_shop_operator = false;
      this.shop_cashiers_list = false;
      this.add_shop_cashier = false;
      this.advertisement = false;
      this.member_list = false;
      this.level_list = false;
      this.s2c_orders_list = false;
      this.hide_cost_price = false;
    }
    if (
      this.product_list == true ||
      this.add_product == true ||
      this.siyou_suppliers == true ||
      this.my_suppliers == true ||
      this.siyou_categories == true ||
      this.my_category == true ||
      this.promotion_history == true ||
      this.promotion_list == true ||
      this.discount_list == true ||
      this.discount_history == true ||
      this.sales_funds == true ||
      this.accounts_payable == true ||
      this.payment_methods == true ||
      this.shop_operators_list == true ||
      this.add_shop_operator == true ||
      this.shop_cashiers_list == true ||
      this.add_shop_cashier == true ||
      this.advertisement == true ||
      this.member_list == true ||
      this.level_list == true ||
      this.s2c_orders_list == true ||
      this.hide_cost_price == true
    ) {
      this.checkedS2C == true;
    }
    var acces = {
      B2S: this.checkedB2S,
      S2C: this.checkedS2C,
      statistics: this.checkedStat,
      warehouse: this.checkedWare,
      siyou_suppliers: this.siyou_suppliers,
      product_list: this.product_list,
      add_product: this.add_product,
      my_suppliers: this.my_suppliers,
      siyou_categories: this.siyou_categories,
      my_category: this.my_category,
      promotion_history: this.promotion_history,
      promotion_list: this.promotion_list,
      discount_list: this.discount_list,
      discount_history: this.discount_history,
      sales_funds: this.sales_funds,
      accounts_payable: this.accounts_payable,
      payment_methods: this.payment_methods,
      shop_operators_list: this.shop_operators_list,
      add_shop_operator: this.add_shop_operator,
      shop_cashiers_list: this.shop_cashiers_list,
      add_shop_cashier: this.add_shop_cashier,
      advertisement: this.advertisement,
      member_list: this.member_list,
      level_list: this.level_list,
      s2c_orders_list: this.s2c_orders_list,
      inventory_management: this.inventory_management,
      warehouse_management: this.warehouse_management,
      returned_goods: this.returned_goods,
      inventory_history: this.inventory_history,
      stock_management: this.stock_management,
      add_quick_purchase: this.add_quick_purchase,
      purchase_order: this.purchase_order,
      b2s_products: this.b2s_products,
      b2s_order_management: this.b2s_order_management,
      hide_cost_price: this.hide_cost_price,
    };
    this.dialogRef.close(acces);
  }
}
