import { Component, OnInit } from '@angular/core';
import { SupplierService } from 'src/app/shared/services/supplier.service';
import { MatTableDataSource, MatSnackBar } from '@angular/material';
import { CommissionsService } from 'src/app/shared/services/commissions.service';
import { Router } from '@angular/router';
import { ShopmanagerService } from 'src/app/shared/services/shopmanager.service';
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: 'app-add-shop-commission',
  templateUrl: './add-shop-commission.component.html',
  styleUrls: ['./add-shop-commission.component.scss']
})
export class AddShopCommissionComponent implements OnInit {

  salesmanagerList;
  shopOwnersList;
  shopOwners;

  constructor(
    private supplierService: SupplierService,
    private commissionService: CommissionsService,
    private shopManagerService : ShopmanagerService,
    private snackbar: MatSnackBar,
    private router: Router,
    public translate: TranslateService

  ) { }

  ngOnInit() {
    this.getSupplierSalesmanagers();
    this.getSupplierShopOwners();
  }


  getSupplierSalesmanagers() {
    this.supplierService.getSupplierSalesManager().subscribe((salesmanagerList: any) => {
      this.salesmanagerList = salesmanagerList
     
    })

  }

  getSupplierShopOwners(){
      return this.shopManagerService.getSupplierShopManagers().subscribe(
        res=>{
          this.shopOwners = res;
          this.shopOwnersList = this.shopOwners.shops
        }, err =>{
          console.log(err);;
        }
      )
  }

  submit(_shop_owner_id, _sales_manager_id, _commission_percent){
    const data = {
      commission_type: 'by shop',
      commission_percent: _commission_percent,
      shop_owner_id: _shop_owner_id,
      sales_manager_id: _sales_manager_id
    }
    return this.commissionService.addShopCommission(data).subscribe(
      res=>{
         this.snackbar.open(this.translate.currentLang === 'Chinese' ? '折扣已成功添加':this.translate.currentLang === 'Italian' ? "commissione aggiunto con successo":'Commission Shop Added Successfully', 'OK', {
           duration: 2000
         });
         this.router.navigate(["add-shop-commission"]);

          // this.redirectTo(`add-shop-commission`);

      }, err =>{
        console.log(err);;
      }
    );
  }


  redirectTo(uri:string){
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
    this.router.navigate([uri]));
 }

}
