import { Component, OnInit, ViewChild, ElementRef, ViewEncapsulation } from '@angular/core';
import { MatInput, MatSpinner, MatDialogRef } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductsService } from 'src/app/shared/services/products.service';
import { CategoriesService } from 'src/app/shared/services/categories.service';
@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {
  form: FormGroup;
  formData: FormData = new FormData();
  product: any;
  categoryListItem;
  categoriesList: any;
  @ViewChild('resultInput', { static: false }) resultInput: ElementRef;
  @ViewChild('loadingSpinner', { static: false }) loadingSpinner: ElementRef;
  constructor(private formBuilder: FormBuilder, private productsService: ProductsService,
    public dialogRef: MatDialogRef<AddProductComponent>, private categoriesService: CategoriesService) { }
  ngOnInit() {
    this.getCategoriesList();
    this.form = this.formBuilder.group({
      product_name: ['', Validators.required],
      product_description: ['', Validators.required],
      product_image: ['', Validators.required],
      mainCategory: ['', Validators.required],
      subCategory: ['', Validators.required],
      category_id: ['', Validators.required],
      quantity: ['', Validators.required],
      product_price: ['', Validators.required],
      product_weight: ['', Validators.required],
      product_size: ['', Validators.required],
      product_color: ['', Validators.required],
      product_package: ['', Validators.required],
      product_barcode: ['', Validators.required],
      product_box: ['', Validators.required]
    });
    this.form.get('mainCategory').valueChanges.subscribe(values => {
      this.categoryListItem = this.categoriesList[values].subCategories;
    }, err => { });
  }
  getFileChange(event) {
    const fileInput = this.resultInput.nativeElement as MatInput;
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      fileInput.value = file.name;
      this.form.get('product_image').setValue(file);
      this.formData.append('product_image', this.form.get('product_image').value);
    }
  }
  onSubmit() {
    const loadingSpinner = document.getElementById('loadingSpinner');
    loadingSpinner.style.display = 'unset';
    this.formData = this.toFormData(this.form.value);
    this.productsService.addProduct(this.formData).subscribe(res => {
      loadingSpinner.style.display = 'none';
      this.dialogRef.close(res);
      //console.log(res);
    }, err => {
      console.log(err);;
      loadingSpinner.style.display = 'none';
    });
  }
  getCategoriesList() {
    this.categoriesService.getCategoriesList().subscribe(categoriesList => {
      this.categoriesList = categoriesList;
    })
  }
  toFormData<T>(formValue: T) {
    const formData = new FormData();
    for (const key of Object.keys(formValue)) {
      const value = formValue[key];
      formData.append(key, value);
    }
    return formData;
  }
}
