import { Component, OnInit, ViewChild, ElementRef, OnChanges } from '@angular/core';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { UserService } from 'src/app/shared/services/user.service';
import { MatSnackBar, MatInput } from '@angular/material';
import { Router } from '@angular/router';
import { RolesService } from 'src/app/shared/services/roles.service';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  selectedValue: any = ''
  @ViewChild('resultInput', { static: false }) resultInput: ElementRef;
  mobileQuery: MediaQueryList;
  form: any;
  hide = true;
  formData: any;
  lat: number = 43.508037;
  lng: number = 12.267635;
  roles;
  formShop;
  latitude: number = 43.508037;
  longitude: number = 12.267635;
  locationChosen = false;
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private snackbar: MatSnackBar,
    private router: Router,
    private translate : TranslateService
  ) {
    this.formData = new FormData();
  }
 
  ngOnInit() {
    this.roles = ['Supplier', 'Shop Owner', 'Sales Manager'];
    this.formShop = this.formBuilder.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      contact: ['', Validators.required],
      role_id: ['', Validators.required],
      store_name: [''],
      min_price: [''],
      validation: ['']
    });
  }
  onAddNewUser() {
    this.formData = this.toFormData(this.form.value);
    //console.log(this.form.value);
    this.userService.signUp(this.formData).subscribe(
      res => {
        //console.log(res)
        // this.redirectTo('/login');
        this.router.navigate(['/login']);

        this.snackbar.open(this.translate.currentLang === 'Chinese' ? "账号已成功添加":this.translate.currentLang === 'Italian' ? "Account aggiunto con successo":'Account Successfully Added', '',{          duration: 1000,
          verticalPosition: "top",
          horizontalPosition: "right"
        });
      }, err => {
        console.log(err);;
      }
    )
  }
  onAddShop() {
    this.formData = this.toFormData(this.formShop.value);
    //console.log(this.formShop.value);
    this.userService.signUp(this.formData).subscribe(
      res => {
        // this.redirectTo('/login');
        this.router.navigate(['/login']);

        this.snackbar.open(this.translate.currentLang === 'Chinese' ? "账号已成功添加":this.translate.currentLang === 'Italian' ? "Account aggiunto con successo":'Account Successfully Added', '',{
          duration: 1000,
          verticalPosition: "top",
          horizontalPosition: "right"
        });
      }, err => {
        console.log(err);;
      }
    )
  }
  getFileChange(event) {
    const fileInput = this.resultInput.nativeElement as MatInput;
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      fileInput.value = file.name;
      this.form.get('profil_img').setValue(file);
      this.formData.append('profil_img', this.form.get('profil_img').value);
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
  onChoseLocation(event) {
    this.lat = event.coords.lat;
    this.lng = event.coords.lng;
    this.locationChosen = true;
    this.form.get('lat').setValue(this.lat);
    this.form.get('lng').setValue(this.lng);
  }
  supplier = false;
  shopowner = false
  chooseRole(role) {
    if (role === "2") {
      this.supplier = true;
      this.shopowner = false;
    } else if (role === "3") {
      this.shopowner = true;
      this.supplier = false;
    }
  }
  redirectTo(uri: string) {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      this.router.navigate([uri]));
  }
}
