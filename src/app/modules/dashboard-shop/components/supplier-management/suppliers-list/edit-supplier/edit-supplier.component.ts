import { Component, OnInit, ViewChild, ElementRef,NgZone } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/shared/services/user.service';
import { User } from 'src/app/shared/models/user';
import { MatSnackBar, MatInput } from '@angular/material';
import { FormBuilder, Validators } from '@angular/forms';
import { SupplierS2cService } from 'src/app/shared/services/supplier-s2c.service';
import { TranslateService } from '@ngx-translate/core';
import { MapsAPILoader } from '@agm/core';
@Component({
  selector: 'app-edit-supplier',
  templateUrl: './edit-supplier.component.html',
  styleUrls: ['./edit-supplier.component.scss']
})
export class EditSupplierComponent implements OnInit {
  @ViewChild('resultInput', { static: false },) resultInput: ElementRef;
  @ViewChild('search', { static: false })  
  public searchElementRef: ElementRef;
  form: any;
  formData: any;
  lat: number = 43.508037;
  lng: number = 12.267635;
  latitude: number = 43.508037;
  longitude: number = 12.267635;
  locationChosen = false;
  hide = true;
  currentId;
  
  lt: string;
  lg: string;
  zoom = 1;
  private geoCoder;

  constructor(private userService: UserService,
    private router: Router,
    private snackbar: MatSnackBar,
    private activatedRouter: ActivatedRoute,
    private supplierService: SupplierS2cService,
    private formBuilder: FormBuilder,
    private translate : TranslateService,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone
  ) {
    this.formData = new FormData();
    activatedRouter.params.subscribe((params) => {
      this.currentId = params.id;
    });
  }
  ngOnInit() {
    this.onGetSupplierById();
    this.form = this.formBuilder.group({
      supplier_name: [''],
      company_name: [''],
      email: [''],
      contact: [''],
      description: [''],
      tax_id: [''],
      website: [''],
      adress: [''],
      country: [''],
      city: [''],
      postal_code: [''],
      latitude: [''],
      longitude: [''],
    });
  }
  supp;
  supplier;
  onGetSupplierById() {
    this.supplierService.getSupplierById(this.currentId).subscribe(res => {
      this.supp = res;
      this.supplier = this.supp.data;
    }
    )
  }
  onSubmit(supplier_name,
    company_name,
    email,
    contact,
    description,
    tax_id,
    website,
    adress,
    country,
    city,
    postal_code) {
    this.form.get("supplier_name").setValue(supplier_name);
    this.form.get("company_name").setValue(company_name);
    this.form.get("email").setValue(email);
    this.form.get("contact").setValue(contact);
    this.form.get("description").setValue(description);
    this.form.get("tax_id").setValue(tax_id);
    this.form.get("website").setValue(website);
    this.form.get("adress").setValue(adress);
    this.form.get("country").setValue(country);
    this.form.get("city").setValue(city);
    this.form.get("postal_code").setValue(postal_code);
    this.formData = this.toFormData(this.form.value);
    //console.log(this.form.value);
    this.userService.updateSupplierS2C(this.form.value, this.currentId).subscribe(res => {
      // this.redirectTo('shop/suppliers-list');
      this.router.navigate([`shop/suppliers-list`]);

      this.snackbar.open(this.translate.currentLang === 'Chinese' ? "供货商已成功更新":this.translate.currentLang === 'Italian' ? "Fornitore aggiornato con successo":'Supplier Successfully Updated', '',{
        duration: 1000,
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
  onChoseLocation(event) {
    this.lat = event.coords.lat;
    this.lng = event.coords.lng;
    this.locationChosen = true;
    this.form.get('latitude').setValue(this.lat);
    this.form.get('longitude').setValue(this.lng);
    console.log(this.lng,this.lat)
  }
  redirectTo(uri: string) {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      this.router.navigate([uri]));
  }
 

  

    
  
}
