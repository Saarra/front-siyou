import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.scss']
})
export class UpdateProductComponent implements OnInit {
  form: any;
  formData: any;
  constructor(
    private formBuilder: FormBuilder,
  ) {
    this.formData = new FormData();
  }
  ngOnInit(
  ) {
  }
}
