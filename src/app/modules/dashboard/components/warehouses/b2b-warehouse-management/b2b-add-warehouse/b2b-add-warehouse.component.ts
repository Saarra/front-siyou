import { Component, OnInit } from '@angular/core';
import { MatSnackBar, MatInput } from '@angular/material';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { WarhouseService } from 'src/app/shared/services/warhouse.service';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-b2b-add-warehouse',
  templateUrl: './b2b-add-warehouse.component.html',
  styleUrls: ['./b2b-add-warehouse.component.scss']
})
export class B2bAddWarehouseComponent implements OnInit {
  form: any;
  currentId;
  formData: any;
  lat: number = 43.508037;
  lng: number = 12.267635;
  latitude: number = 43.508037;
  longitude: number = 12.267635;
  locationChosen = false;
  constructor(private warehouseService: WarhouseService,
    private router: Router,
    private routerAv: ActivatedRoute,
    private snackbar: MatSnackBar,
    private formBuilder: FormBuilder,
    public translate: TranslateService
    ) {
    this.formData = new FormData();
    routerAv.params.subscribe(
      params => {
        this.currentId = params.id;
      }
    )
  }
  ngOnInit() {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      first_responsible: [''],
      second_responsible: [''],
      latitude: [''],
      longitude: [''],
    });
  }
  onSubmit() {
    this.formData = this.toFormData(this.form.value);
    this.warehouseService.addWarehouseB2B(this.formData).subscribe(res => {
      // this.redirectTo('warehouse-management');
      this.router.navigate(['warehouse-management']);

      this.snackbar.open(this.translate.currentLang === 'Chinese' ? "仓库已成功添加":this.translate.currentLang === 'Italian' ? "Magazzino aggiunto con successo":"Warehouse Successfully Added", '',
       {
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
  }
  redirectTo(uri: string) {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      this.router.navigate([uri]));
  }
}
