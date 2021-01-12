import { Component, OnInit, ViewChild, AfterViewInit, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { MatTabGroup, MatDialog, MatTabChangeEvent, MatSelectChange, MatSnackBar, MatTableDataSource, MatTable } from '@angular/material';
import { ProductsService } from 'src/app/shared/services/products.service';
import { Product } from 'src/app/shared/models/product.model';
import { AddProductManagementModalComponent } from '../../modals/add-product-management-modal/add-product-management-modal.component';
import { CategoriesService } from 'src/app/shared/services/categories.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BrandsService } from 'src/app/shared/services/brands.service';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
export interface PeriodicElement {
  image: number;
  barcode: number;
  quantity: number;
  actions: string;
}
export interface ProductItem {
  item_values: any,
  item_image_list: any
}
@Component({
  selector: 'app-add-product-management',
  templateUrl: './add-product-management.component.html',
  styleUrls: ['./add-product-management.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddProductManagementComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['image', 'barcode', 'quantity', 'actions'];
  dataSource: MatTableDataSource<ProductItem>;
  tableData: Array<ProductItem> = []
  categoriesList: any;
  brandsList: any;
  productBaseGroup: FormGroup;
  criteriaBaseArray: Array<any>;
  imagesList: Array<any> = [];
  imageItemSelectionId: any;
  itemsValue: Array<any> = [];
  @ViewChild('tabSection', { static: false }) tabSection: MatTabGroup;
  @ViewChild('itemsTable', { static: false }) itemsTable: MatTable<any>;
  constructor(private productService: ProductsService, private dialog: MatDialog,
    private categoriesService: CategoriesService, private formBuilder: FormBuilder,
    private brandsService: BrandsService, private snackbar: MatSnackBar,
    public translate: TranslateService,
    private changeDetectorRefs: ChangeDetectorRef, private router: Router) {
    this.productBaseGroup = this.formBuilder.group({
      product_name: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(250)]],
      product_description: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(1000)]],
      taxe_rate: ['', Validators.required],
      category_id: ['', Validators.required],
      brand_id: ['', Validators.required],
      product_image_url: [''],
      items: ['']
    })
  }
  ngOnInit() {
    this.getCategoriesList();
    this.getBrandsList();
    this.changeDetectorRefs.detectChanges();
  }
  ngAfterViewInit() {
    this.tabSection.selectedTabChange.subscribe((event: MatTabChangeEvent) => {
      if (event.index === 1) {
        if (!this.productBaseGroup.valid) {
          this.tabSection.selectedIndex = 0;
          this.showSnackbar('You need to fill the form');
        } else {
          this.tabSection.selectedIndex = event.index;
        }
      }
    })
  }
  goToNext(args: any) {
    this.productBaseGroup.valid ? this.tabSection.selectedIndex += 1 : this.showSnackbar('You need to fill the form');
  }
  goToBack(args: any) {
    this.tabSection.selectedIndex -= 1
  }
  addProduct() {
    this.productService.addNewProduct(this.productBaseGroup.value).subscribe(res => {
      this.showSnackbar(this.translate.currentLang === 'Chinese' ? "产品已成功添加到购物车":this.translate.currentLang === 'Italian' ? "Prodotto aggiunto con successo al tuo carrello":'Product added to your cart successfully').afterDismissed().subscribe((data) => {
        this.router.navigate(['dashboard/products-list']);
      });
    })
  }
  showSnackbar(text: string) {
    return this.snackbar.open(text, '', {
      duration: 1500,
      verticalPosition: 'bottom',
      horizontalPosition: 'right',
      panelClass: ['snackbar']
    });
  }
  openAddProductManagementModal() {
    const dialogRef = this.dialog.open(AddProductManagementModalComponent, {
      width: '1400px',
      height: '700px',
      data: this.criteriaBaseArray
    });
    dialogRef.afterClosed().subscribe(data => {
      if (data) {
        this.tableData.push(data);
        this.dataSource = new MatTableDataSource(this.tableData);
        data.item_image_list.forEach(element => {
          this.imagesList.push(element);
        });
        this.imageItemSelectionId = this.imagesList[0].image_id
        if (this.productBaseGroup.get('items').value) {
          this.itemsValue = this.productBaseGroup.get('items').value;
        }
        this.itemsValue.push(data.item_values);
        this.productBaseGroup.get('items').setValue(this.itemsValue);
        this.productBaseGroup.get('product_image_url').setValue(this.imagesList[0].image_url);
        this.changeDetectorRefs.detectChanges();
      }
    })
  }
  getCategoriesList() {
    this.categoriesService.getCategoriesList().subscribe(categoriesList => {
      this.categoriesList = categoriesList;
    })
  }
  getBrandsList() {
    this.brandsService.GetBrands().subscribe(brandsList => {
      this.brandsList = brandsList;
    })
  }
  onChangeSelect(args: MatSelectChange) {
    if (args.value) {
      this.categoriesService.getCategoryCriteria(args.value).subscribe((categoriesCriteria: any) => {
        this.criteriaBaseArray = categoriesCriteria.criteria_base;
      })
    }
  }
  onSelectImage(image) {
    this.imageItemSelectionId = image.image_id;
    this.productBaseGroup.get('product_image_url').setValue(image.image_url);
  }
  get product_name() { return this.productBaseGroup.get('product_name') }
  get product_description() { return this.productBaseGroup.get('product_description') }
  get taxe_rate() { return this.productBaseGroup.get('taxe_rate') }
  get category_id() { return this.productBaseGroup.get('category_id') }
  get brand_id() { return this.productBaseGroup.get('brand_id') }
  get product_image_url() { return this.productBaseGroup.get('product_image_url') }
}
