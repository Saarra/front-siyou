import { Component, OnInit, ViewChild, Inject, ElementRef, OnChanges } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog, MatSnackBar, MatInput } from '@angular/material';
import { FormBuilder, Validators } from '@angular/forms';
import { ChainService } from 'src/app/shared/services/chain.service';
import { ShopcachierService } from 'src/app/shared/services/shopCachier.service';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-add-shop-cachier',
  templateUrl: './add-shop-cachier.component.html',
  styleUrls: ['./add-shop-cachier.component.scss']
})
export class AddShopcachierComponent implements OnInit {
  @ViewChild('resultInput', { static: false }) resultInput: ElementRef;
  form: any;
  formData: any;
  chainList;
  chainData;
  constructor(
    private shopcachierservice: ShopcachierService,
    private chainService: ChainService,
    private router: Router,
    private _snackBar: MatSnackBar,
    private formBuilder: FormBuilder,
    public translate: TranslateService) {
    this.formData = new FormData();
  }
  ngOnInit() {
    this.form = this.formBuilder.group({
      chain_id: ['', Validators.required],
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      contact: ['', Validators.required],
      password: ['', Validators.required],
      is_active: ['', Validators.required],
      cachier_image: ['']
    });
    this.ongetChainList();
  }
  toFormData<T>(formValue: T) {
    const formData = new FormData();
    for (const key of Object.keys(formValue)) {
      const value = formValue[key];
      formData.append(key, value);
    }
    return formData;
  }
  ongetChainList() {
    return this.chainService.getChainList().subscribe(
      res => {
        this.chainList = res;
        this.chainData = this.chainList.data;
        //console.log(this.chainData)
      }, err => {
        console.log(err);
      }
    );
  }
  redirectTo(uri: string) {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      this.router.navigate([uri]));
  }
  onAddcachier() {
    this.formData = this.toFormData(this.form.value);
    //console.log(this.form.value);
    this.shopcachierservice.AddNewcachier(this.formData).subscribe(
      res => {

        this._snackBar.open(this.translate.currentLang === 'Chinese' ? "收银员已成功添加":this.translate.currentLang === 'Italian' ? "Cassiere aggiunto con successo":'Cashier Successfully Added', '',{          duration: 1000,
        });
        // this.redirectTo('shop/cashiers-list');
        this.router.navigate([`shop/cashiers-list`]);

      }, err => {
        console.log(err);;
      }
    );
  }
  getFileChange(event) {
    const fileInputImg = this.resultInput.nativeElement as MatInput;
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      //console.log(file);
      fileInputImg.value = file.name;
      this.form.get('cachier_image').setValue(file);
      this.formData.append('cachier_image', this.form.get('cachier_image').value);
    }
  }
}  
