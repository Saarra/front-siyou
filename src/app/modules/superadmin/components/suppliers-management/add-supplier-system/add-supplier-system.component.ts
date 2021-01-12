import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { SupplierS2cService } from 'src/app/shared/services/supplier-s2c.service';
import { MatSnackBar, MatInput } from '@angular/material';
import { FormBuilder, Validators,FormGroup } from '@angular/forms';

@Component({
  selector: 'app-add-supplier-system',
  templateUrl: './add-supplier-system.component.html',
  styleUrls: ['./add-supplier-system.component.scss']
})
export class AddSupplierSystemComponent implements OnInit {

  @ViewChild('resultInput', { static: false },) resultInput: ElementRef;
  formData: any;
  lat: number = 43.508037;
  lng: number = 12.267635;
  latitude: number = 43.508037;
  longitude: number = 12.267635;
  locationChosen = false;
  hide = true;
  formErrors: any;
  public form:       FormGroup;

  constructor(private supplierS2cService: SupplierS2cService,
    private router: Router,
    private snackbar: MatSnackBar,
    private formBuilder: FormBuilder,
  ) {
    this.formData = new FormData();
    this.form = this.formBuilder.group({
      supplier_name: ['', Validators.required],
      company_name: ['', Validators.required],
      email: [''],
      contact: [''],
      description: [''],
      tax_id: ['',Validators.required],
      website: [''],
      adress: [''],
      country: [''],
      city: [''],
      postal_code: [''],
      lat: [''],
      lng: [''],
      province: ['']
    });
    this.formErrors = {
      supplier_name:{},
      company_name:{},
      tax_id:{}
    };
  }
  
  ngOnInit() {
    this.form.valueChanges.subscribe(() => {
      for ( const field in this.formErrors )
        {
            if ( !this.formErrors.hasOwnProperty(field) )
            {
                continue;
            }
            // Clear previous errors
            this.formErrors[field] = {};
            // Get the control
            const control = this.form.get(field);
            if ( control && control.dirty && !control.valid )
            {
                this.formErrors[field] = control.errors;
            }

        }
    });
  }
  message;
  
        supplier;
        invalidTax : boolean = false;

        
  onSubmit() {
    this.formData = this.toFormData(this.form.value);
    console.log(this.form.value);
    this.supplierS2cService.addSuppliersystem(this.formData).subscribe(res => {
      console.log(res)
      this.supplier = res ; 
    
      if (this.supplier.msg == "supplier with this tax number already exists"){
        this.invalidTax = true;
        this.message = "Supplier with this tax number already EXSITS" ;
      }
       if (this.supplier.msg == "supplier added successfully !") {
        // this.snackbar.open(this.translate.currentLang === 'Chinese' ? "供货商已成功添加":this.translate.currentLang === 'Italian' ? "Fornitore aggiunto con successo":'Supplier Successfully Added', '',{        duration: 1000,
        //   verticalPosition: "top",
        //   horizontalPosition: "right"
        // });
        this.snackbar.open('Supplier Successfully Added', '',{        duration: 1000,
            verticalPosition: "top",
            horizontalPosition: "right"
          });
        this.router.navigate(["superadmin/suppliers"]);

        // this.redirectTo('shop/my-suppliers');
      }
      
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
    this.form.get('lat').setValue(this.lat);
    this.form.get('lng').setValue(this.lng);
  }
  redirectTo(uri: string) {
    this.router.navigateByUrl('/', { skipLocationChange: false }).then(() =>
      this.router.navigate([uri]));
  }
}

