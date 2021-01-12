import { Component, OnInit, Inject, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA, MatSelectChange, MatDialogRef } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ColorPickerService } from 'ngx-color-picker';
import { NgxDropzoneChangeEvent } from 'ngx-dropzone';
import { ProductsService } from 'src/app/shared/services/products.service';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { element } from 'protractor';
export interface ImageItem {
  id?: number;
  image_url?: string;
  File: File;
  loaded?: boolean;
  uploaded?: boolean;
  progress?: number;
  hovered?: boolean;
}
@Component({
  selector: 'app-add-product-management-modal',
  templateUrl: './add-product-management-modal.component.html',
  styleUrls: ['./add-product-management-modal.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AddProductManagementModalComponent implements OnInit {
  formGroup: FormGroup;
  color: any;
  format: any;
  files: ImageItem[] = [];
  criteria_list: Array<any> = [];
  product_item_images: Array<any> = [];
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private cpService: ColorPickerService,
    private productService: ProductsService, private dialogRef: MatDialogRef<AddProductManagementModalComponent>) {
  }
  ngOnInit() {
    let group = {
      item_barcode: new FormControl('', Validators.required),
      item_offline_price: new FormControl('', Validators.required),
      item_online_price: new FormControl('', Validators.required),
      item_package: new FormControl('', Validators.required),
      item_box: new FormControl('', Validators.required),
      item_warn_quantity: new FormControl('', Validators.required),
      item_quantity: new FormControl('', Validators.required),
      image_list: new FormControl('')
    };
    if (this.data.length) {
      this.data.forEach(element => {
        group[`${element.name}-value`] = new FormControl('');
        group[`${element.name}-unit`] = new FormControl('');
      });
      this.formGroup = new FormGroup(group);
    }
    this.data.forEach((element: any) => {
      this.formGroup.get(`${element.name}-unit`).setValue(element.criteria_unit[0].id);
    })
  }
  ngAfterViewInit() { }
  getFieldType(item) {
    if (item.name === 'color') {
      return 'color'
    } else {
      return 'text'
    }
  }
  onSubmit() {
    const itemImageList = this.product_item_images.map((element: any) => element.image_id);
    this.data.forEach((element: any) => {
      const criteria_id = element.id;
      const criteria_unit_id = this.formGroup.get(`${element.name}-unit`).value;
      const criteria_value = this.formGroup.get(`${element.name}-value`).value;
      const criteriaItem = Object.assign({}, { criteria_id, criteria_unit_id, criteria_value })
      this.criteria_list.push(criteriaItem);
      this.formGroup.removeControl(`${element.name}-unit`);
      this.formGroup.removeControl(`${element.name}-value`);
    });
    this.formGroup.addControl('criteria_list', new FormControl());
    this.formGroup.get('image_list').setValue(itemImageList);
    this.formGroup.get('criteria_list').setValue(this.criteria_list);
    this.dialogRef.close({ item_values: this.formGroup.value, item_image_list: this.product_item_images });
  }
  onColorPickerChange(color: string) {
    this.formGroup.get('color-value').setValue(color);
  }
  onUnitSelectChange(criteriaName, args: MatSelectChange) {
  }
  onSelect(event: NgxDropzoneChangeEvent) {
    event.addedFiles.forEach((element: File) => {
      this.files.push({ File: element, loaded: false, uploaded: false, hovered: false })
    })
    this.uploadImages(this.files);
  }
  uploadImages(imagesArray: Array<ImageItem>) {
    imagesArray.forEach(image => {
      const formData = new FormData();
      formData.append('file', image.File)
      this.productService.uploadImage(formData).subscribe((event: HttpEvent<any>) => {
        switch (event.type) {
          case HttpEventType.UploadProgress:
            let progress = Math.round(event.loaded / event.total * 100)
            image.progress = Math.round(event.loaded / event.total * 100);
            if (progress === 100) {
              image.loaded = true;
            }
            break;
          case HttpEventType.Response:
            image.uploaded = true;
            image.image_url = event.body.image_url;
            image.id = event.body.id;
            this.product_item_images.push({ image_id: event.body.id, image_url: event.body.image_url });
            break;
        }
      })
    })
  }
  deleteImage(id: any) {
    this.productService.deleteImage(id).subscribe((data) => {
      const itemIndex = this.product_item_images.findIndex((element: any) => element.image_id === id);
      this.product_item_images.splice(itemIndex, 1);
      const indexToRemove = this.files.findIndex((element: any) => element.id === id);
      this.files.splice(indexToRemove, 1);
    })
  }
}
