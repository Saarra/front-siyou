import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { BrandsService } from 'src/app/shared/services/brands.service';
import { Brand } from 'src/app/shared/models/brand.model';
import { MatDialogClose, MatDialog, MatDialogRef, MatSnackBar, MatInput } from '@angular/material';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-add-brand-modal',
  templateUrl: './add-brand-modal.component.html',
  styleUrls: ['./add-brand-modal.component.scss']
})
export class AddBrandModalComponent implements OnInit {
  dialogRef: any;
  form: any;
  formData: any;
  @ViewChild('resultInput', { static: false }) resultInput: ElementRef;
  constructor(private brandService: BrandsService,
    private router: Router,
    private dialog: MatDialog,
    private _snackBar: MatSnackBar,
    public translate: TranslateService,
    dialogRef: MatDialogRef<AddBrandModalComponent>,
    private formBuilder: FormBuilder) {
    this.formData = new FormData();
  }
  ngOnInit() {
    this.form = this.formBuilder.group({
      brand_name: ['', Validators.required],
      brand_logo: ['', Validators.required],
    });
  }
  getFileChange(event) {
    const fileInput = this.resultInput.nativeElement as MatInput;
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      fileInput.value = file.name;
      this.form.get('brand_logo').setValue(file);
      this.formData.append('brand_logo', this.form.get('brand_logo').value);
    }
  }
  toFormData<T>(formValue: T) {
    const formData = new FormData();
    for (const key of Object.keys(formValue)) {
      const value = formValue[key];
      formData.append(key, value);
    }
    return formData;
  }
  onSubmit() {
    this.formData = this.toFormData(this.form.value);
    this.brandService.AddNewBrand(this.formData).subscribe(res => {
      // this.redirectTo('superadmin/brands');
      this.router.navigate(['superadmin/brands']);

      this.dialog.closeAll();
      this._snackBar.open(this.translate.currentLang === 'Chinese' ? "品牌已成功添加":this.translate.currentLang === 'Italian' ? "Brand aggiunto con successo":'Brand Successfully Added', '',
      {        duration: 2000,
      });
    }, err => {
      console.log(err);;
    });
  }
  redirectTo(uri: string) {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      this.router.navigate([uri]));
  }
}
