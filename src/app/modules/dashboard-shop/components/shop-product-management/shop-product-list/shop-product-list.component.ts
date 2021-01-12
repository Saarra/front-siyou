import { Component, OnInit } from '@angular/core';
import { ProductsS2cService } from 'src/app/shared/services/products-s2c.service';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { BrandsService } from 'src/app/shared/services/brands.service';
import { CategoriesService } from 'src/app/shared/services/categories.service';
import { SupplierS2cService } from 'src/app/shared/services/supplier-s2c.service';
import { MatSnackBar, MatDialog } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { CartModalComponent } from '../../basket-management/cart-modal/cart-modal.component';
import { TranslateService } from '@ngx-translate/core';

declare var $: any;

@Component({
  selector: 'app-shop-product-list',
  templateUrl: './shop-product-list.component.html',
  styleUrls: ['./shop-product-list.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0', visibility: 'hidden' })),
      state('expanded', style({ height: '*', visibility: 'visible' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ShopProductListComponent implements OnInit {

  prods;
  OneProd: any;
  prodsData;
  storedProd;

  brandList;
  catList;
  supp;
  suppList;
  currentLink;
  url;
  expandedElement: null;
  orderDisplayedColumns = ['product_image_url', 'product_name', 'product_description', 'brand_name', 'actions'];


  constructor(
    private productService: ProductsS2cService,
    private brandService: BrandsService,
    private categoryService: CategoriesService,
    private supplierService: SupplierS2cService,
    private snackbar: MatSnackBar,
    private router: Router,
    private translate : TranslateService,
    private dialog: MatDialog
  ) {
  
  }

  ngOnInit() {

    this.onGetAllProds();
    this.onGetBrandsList();
    this.onGetCategoriesList();
    this.onGetSuppliersList();
  }

  onGetAllProds() {
    return this.productService.getAllSuppProdsWithItems().subscribe(
      res => {
        this.prods = res;
        this.prodsData = this.prods.data;
      }, err => {
        console.log(err);;
      }
    );

  }

  checkImageNull(img?: any) {

    if (img == null) {
      return true;
    } else {
      return false;
    }

  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.prodsData.filter = filterValue.trim().toLowerCase();

    if (this.prodsData.paginator) {
      this.prodsData.paginator.firstPage();
    }
  }

  onGetBrandsList() {
    return this.brandService.GetBrands().subscribe(
      res => {
        this.brandList = res;
      }, err => {
        console.log(err);;
      }
    );
  }
  catData;
  onGetCategoriesList() {
    return this.categoryService.getCategories().subscribe(
      res => {
        this.catList = res;
        this.catData = this.catList.data;

      }, err => {
        console.log(err);;
      }
    );
  }

  onGetSuppliersList() {
    return this.supplierService.GetSuppliersList().subscribe(
      res => {

        this.supp = res;
        this.suppList = this.supp.suppliers;

      }, err => {
        console.log(err);;
      }
    );
  }

  onFilterProdsList(category?, brand?, supplier?, barcode?) {


    if (category == 0 || !category) {
      category = '';
    }

    if (brand == 0 || !brand) {
      brand = '';
    }

    if (supplier == 0 || !supplier) {
      supplier = '';
    }
    if (barcode == 0 || !barcode) {
      barcode = '';
    }


    return this.productService.filterProductsList(category, brand, supplier, barcode).subscribe(
      res => {
        this.prods = res;
        this.prodsData = this.prods.data;
      }, err => {
        console.log(err);;
      }
    );
  }

  addProductToWishlist(product_id) {
    const el = { product_id };
    return this.productService.addProductToWhishlist(el).subscribe(
      res => {
        // this.redirectTo('shop/products-list');
        this.router.navigate([`shop/products-list`]);

        this.snackbar.open(this.translate.currentLang === 'Chinese' ? "产品已成功添加到愿望单":this.translate.currentLang === 'Italian' ? "Prodotto aggiunto con successo alla tua lista dei desideri":'Product added successfully to your wishlist', '',{          duration: 2000
        });

      }, err => {
        console.log(err);;
      }
    );
  }


  deleteProductFromWishlist(product_id) {
    const el = { product_id };
    return this.productService.addProductToWhishlist(el).subscribe(
      res => {

        // this.redirectTo('shop/products-list');
        this.router.navigate([`shop/products-list`]);

        this.snackbar.open(this.translate.currentLang === 'Chinese' ? "产品已成功删除":this.translate.currentLang === 'Italian' ? "Prodotto eliminato correttamente dalla tua lista dei desideri":'Product deleted successfully from your wishlist', '',{
          duration: 2000
        });

      }, err => {
        console.log(err);;
      }
    );
  }



  redirectTo(uri: string) {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      this.router.navigate([uri]));
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
    this.OneProd = {
      id: _id,
      product_name: _product_name,
      item_offline_price: _item_offline_price,
      item_discount_price: _item_discount_price,
      item_quantity: _item_quantity,
      image_url: _image_url,
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
  prod_Weight;
  isItWeight(name: string, value: any) {
    if (name.toLowerCase() == 'weight') {

      this.prod_Weight = value;
      return true;
    } else {
      return false;
    }
  }








}
