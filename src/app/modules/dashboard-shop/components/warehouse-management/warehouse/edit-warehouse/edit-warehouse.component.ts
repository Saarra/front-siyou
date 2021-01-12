import { Component, OnInit } from '@angular/core';
import { MatSnackBar, MatInput } from '@angular/material';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { WarhouseService } from 'src/app/shared/services/warhouse.service';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-edit-warehouse',
  templateUrl: './edit-warehouse.component.html',
  styleUrls: ['./edit-warehouse.component.scss']
})
export class EditWarehouseComponent implements OnInit {
  currentId;
  form: any;
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
    private translate : TranslateService) {
    this.formData = new FormData();
    routerAv.params.subscribe(
      params => {
        this.currentId = params.id;
      }
    )
  }
  ngOnInit() {
    this.GetwarehouseById(this.currentId);
    this.form = this.formBuilder.group({
      name: [''],
      description: [''],
      first_responsible: [''],
      second_responsible: [''],
      latitude: [''],
      longitude: [''],
      chain_id: [''],
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
  warehouse;
  warehousedata
  GetwarehouseById(id) {
    return this.warehouseService.getWarehouseById(this.currentId).subscribe(res => {
      this.warehouse = res;
      this.warehousedata = this.warehouse.data;
      //console.log(res)
    }, err => {
      console.log(err);;
    });
  }
  onSubmit(name, description, first_responsible, second_responsible, chain_id) {
    this.form.get("name").setValue(name);
    this.form.get("description").setValue(description);
    this.form.get("first_responsible").setValue(first_responsible);
    this.form.get("second_responsible").setValue(second_responsible);
    this.form.get("chain_id").setValue(chain_id);
    //console.log(this.form.value);
    this.formData = this.toFormData(this.form.value);
    //console.log(this.formData);
    this.warehouseService.updateWarehouse(this.currentId, this.form.value).subscribe(res => {
      //console.log(res)
      // this.redirectTo('shop/warehouse-management');
      this.router.navigate([`shop/warehouse-management`]);

      this.snackbar.open(this.translate.currentLang === 'Chinese' ? "仓库信息已成功更新":this.translate.currentLang === 'Italian' ? "Magazzino aggiornato con successo":'Warehouse Successfully Updated', '',{        duration: 1000,
        verticalPosition: "top",
        horizontalPosition: "right"
      });
    }, err => {
      console.log(err);;
    });
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
