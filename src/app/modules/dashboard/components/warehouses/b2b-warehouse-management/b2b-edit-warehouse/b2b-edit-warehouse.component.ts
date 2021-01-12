import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { MatSnackBar, MatInput } from "@angular/material";
import { WarhouseService } from 'src/app/shared/services/warhouse.service';
import { FormBuilder, Validators } from '@angular/forms'
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-b2b-edit-warehouse',
  templateUrl: './b2b-edit-warehouse.component.html',
  styleUrls: ['./b2b-edit-warehouse.component.scss']
})
export class B2bEditWarehouseComponent implements OnInit {
  currentId;
  lat: number = 43.508037;
  lng: number = 12.267635;
  latitude: number = 43.508037;
  longitude: number = 12.267635;
  locationChosen = false;
  formData;
  form;
  constructor(private router: Router,
    private snackbar: MatSnackBar,
    private activatedRouter: ActivatedRoute,
    private warehouseService: WarhouseService,
    private formBuilder: FormBuilder,
    public translate: TranslateService

  ) {
    activatedRouter.params.subscribe((params) => {
      this.currentId = params.id;
    });
    this.formData = new FormData();
  }
  ngOnInit() {
    this.onGetWarehouseByID();
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      first_responsible: [''],
      second_responsible: [''],
      latitude: [''],
      longitude: [''],
    });
  }
  currentWare;
  currentWarehouse;
  onGetWarehouseByID() {
    return this.warehouseService.getwarehousebyId(this.currentId).subscribe(res => {
      this.currentWare = res;
      this.currentWarehouse = this.currentWare.data
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
  onSubmit() {
    this.formData = this.toFormData(this.form.value);
    return this.warehouseService.editWarehouseB2B(this.formData, this.currentId).subscribe(res => {
      // this.redirectTo('warehouse-management');
      this.router.navigate(['warehouse-management']);
      this.snackbar.open(this.translate.currentLang === 'Chinese' ? "仓库信息已成功更新":this.translate.currentLang === 'Italian' ? "Magazzino aggiornato con successo":"Warehouse Successfully Updated", '',
         {duration: 1000,
        verticalPosition: "top",
        horizontalPosition: "right"
      });
    }, err => {
      console.log(err);;
    });
  }
  redirectTo(uri: string) {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      this.router.navigate([uri]));
  }
  onChoseLocation(event) {
    this.lat = event.coords.lat;
    this.lng = event.coords.lng;
    this.locationChosen = true;
    this.form.get('latitude').setValue(this.lat);
    this.form.get('longitude').setValue(this.lng);
  }
}
