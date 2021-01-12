import { Component, OnInit } from '@angular/core';
import { ChainService } from 'src/app/shared/services/chain.service';
import { Router } from '@angular/router';
import { MatDialog, MatSnackBar } from '@angular/material';
import { FormBuilder, Validators } from '@angular/forms';
import { ShopmanagerService } from 'src/app/shared/services/shopmanager.service';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-add-chain',
  templateUrl: './add-chain.component.html',
  styleUrls: ['./add-chain.component.scss']
})
export class AddChainComponent implements OnInit {
  form: any;
  formData: any;
  managerList;
  managerData;
  constructor(
    private chainservice: ChainService,
    private ShopmanagersrvService: ShopmanagerService,
    private router: Router,
    private dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private formBuilder: FormBuilder,
    public translate: TranslateService
  ) {
  }
  ngOnInit() {
    this.form = this.formBuilder.group({
      chain_name: ['', Validators.required],
      adress: ['', Validators.required],
      contact: ['', Validators.required],
      chain_opening_hours: ['', Validators.required],
      chain_close_hours: ['', Validators.required],
      manager_id: ['', Validators.required],
    });
    this.ongetShopmanagerList();
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
    this.chainservice.AddNewChain(this.formData).subscribe(res => {
      // this.redirectTo('/shop/chains-list');
      this.router.navigate(['shop/chains-list']);

      this.dialog.closeAll();
      
     this._snackBar.open(this.translate.currentLang === 'Chinese' ? "商店已成功添加":this.translate.currentLang === 'Italian' ? "Store aggiunto con successo":'Store Successfully Added', '',{
        duration: 2000,
      });
    }, err => {
      console.log(err);;
    });
  }
  redirectTo(uri: string) {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      this.router.navigate([uri]));
  }
  onAddStore(chain_name, adress, contact, chain_opening_hours, chain_close_hours, approved) {
    if (!chain_name || !adress || !contact || !chain_opening_hours || !chain_close_hours) {
      alert('please insert the required inputs')
    } else {
      var _store = {
        chain_name: chain_name,
        adress: adress,
        contact: contact,
        chain_opening_hours: chain_opening_hours,
        chain_close_hours: chain_close_hours,
        approved: 1,
        store_id: localStorage.getItem('store_id')
      }
      this.chainservice.AddNewChain(_store).subscribe(
        res => {
          this.router.navigate(['shop/chains-list']);
          this.dialog.closeAll();
          this._snackBar.open(this.translate.currentLang === 'Chinese' ? "商店已成功添加":this.translate.currentLang === 'Italian' ? "Store aggiunto con successo":'Store Successfully Added', '',{
            duration: 2000,
          });
        }, err => {
          console.log(err);;
        }
      );
    }
  }
  ongetShopmanagerList() {
    return this.ShopmanagersrvService.getShopmangerList().subscribe(
      res => {
        this.managerList = res;
        this.managerData = this.managerList;
      }, err => {
        console.log(err);
      }
    );
  }
}
