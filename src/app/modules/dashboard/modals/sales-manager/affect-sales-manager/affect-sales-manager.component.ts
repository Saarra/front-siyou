import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SalesmanagerService } from 'src/app/shared/services/salesmanager.service';
import { MAT_DIALOG_DATA, MatDialogRef, MatTableDataSource, MatSnackBar } from '@angular/material';
import { SupplierService } from 'src/app/shared/services/supplier.service';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-affect-sales-manager',
  templateUrl: './affect-sales-manager.component.html',
  styleUrls: ['./affect-sales-manager.component.scss']
})
export class AffectSalesManagerComponent implements OnInit {
  form: FormGroup;
  isSearch = false;
  dataSource: MatTableDataSource<any>;
  salesmanager: any;
  displayedColumns = ['first_name', 'last_name', 'email', 'actions'];
  constructor(private dialogRef: MatDialogRef<AffectSalesManagerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private salesmanagerService: SalesmanagerService,
    private snackBar: MatSnackBar,
    private supplierService: SupplierService,
    public translate: TranslateService
    ) {
  }
  ngOnInit() {
    this.salesmanager = this.dialogRef.componentInstance.data.salesmanagerList[this.dialogRef.componentInstance.data.index];
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });
    this.getAffectedShopsIds().then(data => {
    })
  }
  getAffectedShopsIds(): Promise<any> {
    const shopsIdList = [];
    const salesManagerList = this.dialogRef.componentInstance.data.salesmanagerList;
    return new Promise((resolve, reject) => {
      try {
        salesManagerList.forEach((element, index) => {
          if (element.shop_owners.length > 0) {
            shopsIdList.push(element.shop_owners[0].id);
          } else {
            shopsIdList.push(-1);
          }
          if (index === (salesManagerList.length - 1)) {
            resolve(shopsIdList);
          }
        })
      }
      catch (err) {
        reject(err);
      }
    })
  }
  addSalesmanager() { }
  serachShopOwnerByEmail() {
    if (!this.form.valid) {
      return;
    }
    this.isSearch = true;
    this.getAffectedShopsIds().then((shopIdsArray) => {
      this.form.value.shopsIds = shopIdsArray;
      this.salesmanagerService.getAvailableShops(this.form.value).subscribe((data: any) => {
        if (!data.length) {
          this.snackBar.open(this.translate.currentLang === 'Chinese' ? "没有匹配到该店的邮箱":this.translate.currentLang === 'Italian' ? "Nessun proprietario del negozio con questa email":'There is no Shop Owner with this email', '',{
            verticalPosition: 'bottom',
            horizontalPosition: 'left',
            duration: 1500,
            panelClass: ['snackbar']
          })
        }
        this.dataSource = new MatTableDataSource(data);
        this.isSearch = false;
      }, err => {
        this.snackBar.open(this.translate.currentLang === 'Chinese' ? "出现错误，请稍后再试":this.translate.currentLang === 'Italian' ? "Si è verificato un errore, riprova più tardi":'Error occured, Please try again later', '',{
          verticalPosition: 'bottom',
          horizontalPosition: 'left',
          duration: 1500,
          panelClass: ['snackbar']
        })
        this.isSearch = false;
      })
    }).catch(err => {
      console.log(err);;
      this.snackBar.open(this.translate.currentLang === 'Chinese' ? "出现错误，请稍后再试":this.translate.currentLang === 'Italian' ? "Si è verificato un errore, riprova più tardi":'Error occured, Please try again later', '',{
        verticalPosition: 'bottom',
        horizontalPosition: 'left',
        duration: 1500,
        panelClass: ['snackbar']
      })
      this.isSearch = false;
    })
  }
  affectShopToSalesmanager(shopOwner: any) {
    const data = {};
    Object.assign(data, { salesmanager_id: this.salesmanager.id, shop_owner_id: shopOwner.id })
    //console.log(data);
    this.supplierService.affectSalesmanagerToShop(data).subscribe(shopAffected => {
      this.dialogRef.close('success');
    }, err => {
      this.dialogRef.close('error');
    })
  }
}
