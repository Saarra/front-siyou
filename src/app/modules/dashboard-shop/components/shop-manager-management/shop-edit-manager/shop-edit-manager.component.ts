import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ChainService } from 'src/app/shared/services/chain.service';
import { ShopmanagerService } from 'src/app/shared/services/shopmanager.service';
import { FormBuilder, Validators } from '@angular/forms';
import { ShopcachierService } from 'src/app/shared/services/shopCachier.service';
import { MatDialog, MatInput, MatSnackBar } from '@angular/material';
import { last } from 'lodash';
import { TranslateService } from '@ngx-translate/core';
import { ChainManagersListComponent } from '../../chain-management/chain-managers-list/chain-managers-list.component';
import { AccessRightsComponent } from '../access-rights/access-rights.component';
@Component({
  selector: 'app-shop-edit-manager',
  templateUrl: './shop-edit-manager.component.html',
  styleUrls: ['./shop-edit-manager.component.scss']
})
export class ShopEditManagerComponent implements OnInit {
  @ViewChild('resultInput', { static: false }) resultInput: ElementRef;
  currentId;
  form;
  formData;
  constructor(private chainService: ChainService,
    private shopmanagerService: ShopmanagerService,
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    private activatedRouter: ActivatedRoute,
    private router: Router,
    public translate: TranslateService,
    private dialog: MatDialog,

    ) {
    this.formData = new FormData();
    activatedRouter.params.subscribe((params) => {
      this.currentId = params.id;
    });
  }
  ngOnInit() {
    this.onManagerById(this.currentId);
    this.ongetChainList();
    this.form = this.formBuilder.group({
      store_id: localStorage.getItem('store_id'),
      first_name: [''],
      last_name: [''],
      contact: [''],
      email: [''],
      chain_id: [''],
      cachier_code: [''],
      manager_image: [''],
      password: [''],
      B2s: [""],
      s2c: [""],
      warehouse: [""],
      statistics: [""],
      siyou_suppliers: [""],
      product_list: [""],
      add_product: [""],
      my_suppliers: [""],
      siyou_categories: [""],
      my_category: [""],
      promotion_history: [""],
      promotion_list: [""],
      discount_list: [""],
      discount_history: [""],
      sales_funds: [""],
      accounts_payable: [""],
      payment_methods: [""],
      shop_operators_list: [""],
      add_shop_operator: [""],
      shop_cashiers_list: [""],
      add_shop_cashier: [""],
      advertisement: [""],
      member_list: [""],
      level_list: [""],
      s2c_orders_list: [""],
      inventory_management: [""],
      warehouse_management: [""],
      returned_goods: [""],
      inventory_history: [""],
      stock_management: [""],
      add_quick_purchase: [""],
      purchase_order: [""],
      b2s_products: [""],
      b2s_order_management: [""],
      hide_cost_price: [""],
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
  currentMana;
  currentManager;
  onManagerById(id) {
    return this.shopmanagerService.getShopmangerById(this.currentId).subscribe(
      (res) => {
        this.currentMana = res;
        this.currentManager = this.currentMana.data;
        console.log(this.currentManager)
      },
      (err) => {
        console.log(err);;
      }
    );
  }
  chainList;
  chainData
  ongetChainList() {
    return this.chainService.getChainList().subscribe(
      res => {
        this.chainList = res;
        this.chainData = this.chainList.data;
        //console.log(this.chainData)
      }, err => {
        console.log(err);
      }
    );
  }
  maxManager;
  max;
  managers;
  managersData;
  onUpdateShopManager(chain_id, first_name, last_name, contact,password) {
    //console.log(manager)
    this.form.get('first_name').setValue(first_name);
    this.form.get('last_name').setValue(last_name);
    this.form.get('email').setValue(this.currentManager.email);
    this.form.get('contact').setValue(contact);
    this.form.get('chain_id').setValue(chain_id);
    this.form.get('password').setValue(password);
    if (this.acces) {
      this.form.get("B2s").setValue(this.acces.B2S);
      this.form.get("s2c").setValue(this.acces.S2C);
      this.form.get("warehouse").setValue(this.acces.warehouse);
      this.form.get("statistics").setValue(this.acces.statistics);
      this.form.get("siyou_suppliers").setValue(this.acces.siyou_suppliers);
      this.form.get("product_list").setValue(this.acces.product_list);
      this.form.get("add_product").setValue(this.acces.add_product);
      this.form.get("my_suppliers").setValue(this.acces.my_suppliers);
      this.form.get("siyou_categories").setValue(this.acces.siyou_categories);
      this.form.get("my_category").setValue(this.acces.my_category);
      this.form.get("promotion_history").setValue(this.acces.promotion_history);
      this.form.get("promotion_list").setValue(this.acces.promotion_list);
      this.form.get("discount_list").setValue(this.acces.discount_list);
      this.form.get("discount_history").setValue(this.acces.discount_history);
      this.form.get("sales_funds").setValue(this.acces.sales_funds);
      this.form.get("accounts_payable").setValue(this.acces.accounts_payable);
      this.form.get("payment_methods").setValue(this.acces.payment_methods);
      this.form
        .get("shop_operators_list")
        .setValue(this.acces.shop_operators_list);
      this.form.get("add_shop_operator").setValue(this.acces.add_shop_operator);
      this.form
        .get("shop_cashiers_list")
        .setValue(this.acces.shop_cashiers_list);
      this.form.get("add_shop_cashier").setValue(this.acces.add_shop_cashier);
      this.form.get("advertisement").setValue(this.acces.advertisement);
      this.form.get("member_list").setValue(this.acces.member_list);
      this.form.get("level_list").setValue(this.acces.level_list);
      this.form.get("s2c_orders_list").setValue(this.acces.s2c_orders_list);
      this.form
        .get("inventory_management")
        .setValue(this.acces.inventory_management);
      this.form
        .get("warehouse_management")
        .setValue(this.acces.warehouse_management);
      this.form.get("returned_goods").setValue(this.acces.returned_goods);
      this.form.get("inventory_history").setValue(this.acces.inventory_history);
      this.form.get("stock_management").setValue(this.acces.stock_management);
      this.form
        .get("add_quick_purchase")
        .setValue(this.acces.add_quick_purchase);
      this.form.get("purchase_order").setValue(this.acces.purchase_order);
      this.form.get("b2s_products").setValue(this.acces.b2s_products);
      this.form
        .get("b2s_order_management")
        .setValue(this.acces.b2s_order_management);
      this.form.get("hide_cost_price").setValue(this.acces.hide_cost_price);
    }
    this.formData = this.toFormData(this.form.value);
    console.log(this.form.value);
    this.shopmanagerService.updateManager(this.currentId, this.formData).subscribe(
      res => {
        console.log(res)
        this.maxManager = res ;
        this.max = this.maxManager.msg;
        if(this.max == "max 3 managers for a chain") {
          this._snackBar.open(this.translate.currentLang === 'Chinese' ? "You have reached the maximum of managers for this chain. You need to deactivate a manager":this.translate.currentLang === 'Italian' ? "You have reached the maximum of managers for this chain. You need to deactivate a manager":'You have reached the maximum of managers for this chain. You need to deactivate a manager', '',{
            duration: 7000,
          }); 
          this.chainService.getChainById(chain_id).subscribe(
            res => {
              this.managers = res;
              this.managersData = this.managers.data
                const dialogRef = this.dialog.open(ChainManagersListComponent, {
                  data: { manager: this.managersData.manager, manager2: this.managersData.manager2, manager3: this.managersData.manager3 }
                });
               
              })
            }
            else {
              this._snackBar.open(this.translate.currentLang === 'Chinese' ? "店铺经理已成功更新":this.translate.currentLang === 'Italian' ? "Manager aggiornato con successo":'Manager Successfully Updated', '',{        
                duration: 1000,
             });
             this.router.navigate([`shop/shopmanagers-list`]);

            // this.redirectTo('shop/shopmanagers-list');
            }
            
    
      }, err => {
        console.log(err);;
      }
    );
  }
  redirectTo(uri: string) {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      this.router.navigate([uri]));
  }
  getFileChange(event) {
    const fileInputImg = this.resultInput.nativeElement as MatInput;
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      //console.log(file);
      fileInputImg.value = file.name;
      this.form.get('manager_image').setValue(file);
      this.formData.append('manager_image', this.form.get('manager_image').value);
    }
  }
  acces;
  openAccess() {
    let dialogRef = this.dialog.open(AccessRightsComponent,
      {width: '700px',
    });
    dialogRef.afterClosed().subscribe((res) => {
      this.acces = res;
    });
  }
}
