import { Component, OnInit, ViewChild, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatDialogRef, MatDialog } from '@angular/material';
import { ProductsService } from 'src/app/shared/services/products.service';
import { MediaMatcher } from '@angular/cdk/layout';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Options } from 'ng5-slider';
import { AddProductComponent } from '../../modals/add-product/add-product.component';
import { Router } from '@angular/router';
import { trigger, state, transition, style, animate } from '@angular/animations';
import { ProductItemDetailsComponent } from '../../modals/product-item-details/product-item-details.component';
@Component({
  selector: 'app-product-management',
  templateUrl: './product-management.component.html',
  styleUrls: ['./product-management.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ProductManagementComponent implements OnInit, AfterViewInit {
  mobileQuery: MediaQueryList;
  dataSource: MatTableDataSource<any>;
  filterForm: FormGroup;
  form: FormGroup;
  options: Options = {
    floor: 0,
    ceil: 500
  };
  displayedColumns = ['product_image', 'product_name', 'product_description', 'category', 'quantity', 'actions'];
  expandedElement: null;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  constructor(private productsService: ProductsService, private formBuilder: FormBuilder,
    private dialog: MatDialog, media: MediaMatcher, private router: Router) {
    this.mobileQuery = media.matchMedia('(max-width: 1200px)');
    this.filterForm = this.formBuilder.group({
      category: [''],
      sub_catgory: ['']
    })
    this.form = this.formBuilder.group({
      piece: ['']
    });
  }
  ngOnInit() {
    this.getNewProductList();
  }
  ngAfterViewInit() {
    const priceSlider = document.getElementById('priceSlider');
    this.productsService.getSupplierProductsList().subscribe((productsList: any) => {
      priceSlider.setAttribute('highValue', productsList.maxPrice);
      this.options = {
        floor: 0,
        ceil: productsList.maxPrice ? productsList.maxPrice : 500
      }
    })
  }
  openAddProductModal() {
    this.router.navigate(['dashboard/add-product']);
  }
  onFileChange(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.form.get('piece').setValue(file);
      const formData = new FormData();
      formData.append('products', this.form.get('piece').value);
      this.productsService.upload(formData).subscribe(
        (res: any) => {
          if (res.type) {
            res.body.forEach(element => {
              //console.log(element);
            });
          }
        },
        (err) => {
          console.log(err);
    })
  }
}
  private getNewProductList() {
    this.productsService.getNewProductsList().subscribe((productsList: any) => {
      this.dataSource = new MatTableDataSource(productsList);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }
  getProductTotalQuantity(product) {
    const quantity = product.items.reduce((total, element: any) => {
      return total += element.item_quantity
    }, 0)
    return quantity;
  }
  getItemImageUrl(item) {
    if (item.images.length) {
      return item.images[0].image_url
    }
    return 'assets/images/product.png';
  }
  openProductItemDetailsModal(item) {
    this.dialog.open(ProductItemDetailsComponent, {
      width: '400px',
      height: '650px',
      data: {
        item
      }
    })
  }
}
