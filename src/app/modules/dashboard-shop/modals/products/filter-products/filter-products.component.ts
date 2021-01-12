import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { SupplierService } from 'src/app/shared/services/supplier.service';
import { CategoriesService } from 'src/app/shared/services/categories.service';
import { MatDialogRef, MatSpinner } from '@angular/material';
import { ProductsService } from 'src/app/shared/services/products.service';
@Component({
  selector: 'app-filter-products',
  templateUrl: './filter-products.component.html',
  styleUrls: ['./filter-products.component.scss'],
})
export class FilterProductsComponent implements OnInit {
  filterForm: FormGroup;
  categoriesList: any;
  supplierList: any;
  @ViewChild('matSpinner', { static: false }) matSpinner: MatSpinner;
  constructor(private formBuilder: FormBuilder, private supplierService: SupplierService,
    private categoriesService: CategoriesService, private dialogRef: MatDialogRef<FilterProductsComponent>,
    private productsService: ProductsService) {
    this.filterForm = this.formBuilder.group({
      category: '',
      supplier: ''
    })
  }
  ngOnInit() {
    this.getCategoriesList();
    this.getSupplierList();
  }
  getSupplierList() {
    this.supplierService.getSupplierList().subscribe(supplierList => {
      this.supplierList = supplierList;
    })
  }
  getCategoriesList() {
    this.categoriesService.getCategories().subscribe(categoriesList => {
      this.categoriesList = categoriesList;
    })
  }
  submitFilterForm() {
    const matSpinner = document.getElementById('filterMatSpinner');
    matSpinner.style.display = 'unset';
    this.productsService.getFilteredProductsList(this.filterForm.value).subscribe(result => {
      matSpinner.style.display = 'none';
      this.dialogRef.close(result);
    })
  }
}
