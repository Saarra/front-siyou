import { Component, OnInit, ViewChild, QueryList, ViewChildren } from '@angular/core';
import { ProductsService } from 'src/app/shared/services/products.service';
import { CategoriesService } from 'src/app/shared/services/categories.service';
import { BasketService } from 'src/app/core/services/basket.service';
import { MatSnackBar, MatProgressSpinner, MatDialogRef, MatDialog } from '@angular/material';
import { MediaMatcher } from '@angular/cdk/layout';
import { SupplierService } from 'src/app/shared/services/supplier.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FilterProductsComponent } from '../../modals/products/filter-products/filter-products.component';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  productList: any = [];
  categoriesList: any;
  supplierList: any;
  mobileQuery: MediaQueryList;
  filterForm: FormGroup;
  @ViewChild('spinner', { static: false }) Spinner: MatProgressSpinner;
  @ViewChildren('spanProd') spans: QueryList<any>;
  constructor(private productsService: ProductsService, private categoriesService: CategoriesService,
    private basketService: BasketService, private snackBar: MatSnackBar, private media: MediaMatcher,
    private supplierService: SupplierService, private formBuilder: FormBuilder, private dialog: MatDialog) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this.filterForm = this.formBuilder.group({
      category: '',
      supplier: ''
    })
  }
  ngOnInit() {
    this.getProductList();
    this.getCategoriesList();
    this.getSupplierList();
    this.filterForm.valueChanges.subscribe(values => {
      this.getFilteredList(values);
    }, err => { });
  }
  getProductList() {
    this.productsService.getProductsList().subscribe(productsList => {
      this.productList = productsList;
    }, err => {
    })
  }
  public getProductImage(product) {
    if (product.product_image_url) {
      return product.product_image_url;
    }
    return 'assets/images/product.png';
  }
  getSupplierList() {
    this.supplierService.getSupplierList().subscribe(supplierList => {
      this.supplierList = supplierList;
    })
  }
  categoryData;
  getCategoriesList() {
    this.categoriesService.getCategories().subscribe(categoriesList => {
      this.categoriesList = categoriesList;
      this.categoryData=this.categoriesList.data;

    })
  }
  getFilteredList(data) {
    const productSearchSpinner = document.getElementById('productSearchSpinner');
    productSearchSpinner.style.display = 'unset';
    this.productsService.getFilteredProductsList(data).subscribe(result => {
      productSearchSpinner.style.display = 'none';
      this.productList = result;
    })
  }
  addProductToBasket(product: any, index: number) {
    const spanElement = this.spans.toArray()[index].nativeElement;
    //console.log(this.spans.toArray()[index].nativeElement);
    spanElement.classList.add('animateSpan');
    setTimeout(() => {
      spanElement.classList.remove('animateSpan');
    }, 2000);
    //console.log(product);
  }
  openFilterProductModal() {
    const dialogRef = this.dialog.open(FilterProductsComponent, {
      width: '350px'
    });
    dialogRef.afterClosed().subscribe(data => {
      this.productList = data;
    });
  }
}
