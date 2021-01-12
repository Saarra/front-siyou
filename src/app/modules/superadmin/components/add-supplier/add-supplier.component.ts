import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/shared/services/user.service';
import { User } from 'src/app/shared/models/user';
import { MatSnackBar, MatInput } from '@angular/material';
import { FormBuilder, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-add-supplier',
  templateUrl: './add-supplier.component.html',
  styleUrls: ['./add-supplier.component.scss']
})
export class AddSupplierComponent implements OnInit {
  @ViewChild('resultInput', { static: false },) resultInput: ElementRef;
  form: any;
  formData: any;
  lat: number = 43.508037;
  lng: number = 12.267635;
  latitude: number = 43.508037;
  longitude: number = 12.267635;
  locationChosen = false;
  hide = true;
  constructor(private userService: UserService,
    private router: Router,
    private snackbar: MatSnackBar,
    private formBuilder: FormBuilder,
    private translate : TranslateService
  ) {
    this.formData = new FormData();
  }
  ngOnInit() {
    this.form = this.formBuilder.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      logistic_service: ['', Validators.required],
      min_price: ['', Validators.required],
      product_visibility: ['', Validators.required],
      description: [''],
      tax_number: [''],
      first_resp_name: [''],
      profil_img: [''],
      adress: [''],
      country: [''],
      region: [''],
      postal_code: [''],
      lat: [''],
      lng: [''],
      store_id: localStorage.getItem('store_id')
    });
  }
  getFileChange(event) {
    const fileInputImg = this.resultInput.nativeElement as MatInput;
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      fileInputImg.value = file.name;
      this.form.get('profil_img').setValue(file);
      this.formData.append('profil_img', this.form.get('profil_img').value);
    }
  }
  onChoseLocation(event) {
    this.lat = event.coords.lat;
    this.lng = event.coords.lng;
    this.locationChosen = true;
    this.form.get('lat').setValue(this.lat);
    this.form.get('lng').setValue(this.lng);
  }
  onSubmit() {
    this.formData = this.toFormData(this.form.value);
    //console.log(this.form.value);
    this.userService.addNewSupplier(this.formData).subscribe(res => {
      this.snackbar.open(this.translate.currentLang === 'Chinese' ? "供货商已成功添加":this.translate.currentLang === 'Italian' ? "Fornitore aggiunto con successo":'Supplier Successfully Added', '',{ 
        duration: 1000,
        verticalPosition: "top",
        horizontalPosition: "right"
      });
      // this.redirectTo('superadmin/accounts-list');
      this.router.navigate(['superadmin/accounts-list']);

      this.snackbar.open(this.translate.currentLang === 'Chinese' ? "供货商已成功添加":this.translate.currentLang === 'Italian' ? "Fornitore aggiunto con successo":'Supplier Successfully Added', '',{ 
        duration: 2000,
        verticalPosition: "top",
        horizontalPosition: "right"
      });
    }, err => {
      console.log(err);;
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
  redirectTo(uri: string) {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      this.router.navigate([uri]));
  }

}
