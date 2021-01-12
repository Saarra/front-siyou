import { Component, OnInit, ViewChild, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog, MatSnackBar } from '@angular/material';
import { SupplierS2cService } from 'src/app/shared/services/supplier-s2c.service';
import { UserService } from 'src/app/shared/services/user.service';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { PagerService } from "src/app/shared/services/pager.service";

@Component({
  selector: 'app-shop-suppliers',
  templateUrl: './shop-suppliers.component.html',
  styleUrls: ['./shop-suppliers.component.scss']
})
export class ShopSuppliersComponent implements OnInit {
  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  brand;
  user;
  sum_brand = 0;
  brandData;
  displayedColumns = [ 'company_name', 'supplier_name', 'email', 'phone_num1','country', 'tax_id','details'];
  allItems;
  SuppLength;
  pager: any = {};
  page = 1;

  constructor(
    private supplierS2cService : SupplierS2cService,
    private _snackBar: MatSnackBar,
    private userService: UserService,
    private http: HttpClient,
    private pagerService: PagerService,



  ) { }

  ngOnInit() {
    this.ongetSuppliers(this.page);
    this.getShopOwners();
    this.http
    .get(`${environment.BaseUrlS2C}/suppliers/shopowners`, {
      params: {
        token: localStorage.getItem("token") ,
            },
    })
    .subscribe((data) => {
      // set items to json response
      this.allItems = data;
      this.SuppLength = this.allItems.data.total;
      console.log(this.SuppLength)
      this.pager = this.pagerService.getPager(this.SuppLength, this.page);
      console.log(this.pager)

    });
  }
  shopData;
  shopowners;
  getShopOwners() {
    return this.userService.getShopOwners().subscribe((res) => {
      this.shopowners = res;
      this.shopData = this.shopowners.data;
    });
  }
  ongetSuppliers(page?,shop_id?){
    if (shop_id == 0 || !shop_id) {
      shop_id = "";
    }
    this.supplierS2cService.GetAllShopSuppliers(page,shop_id).subscribe(
      res => {
        this.brand = res;
        this.brandData = this.brand.data.data;
        this.dataSource.data = this.brandData;
        this.SuppLength = this.brand.data.total;
        this.sum_brand = this.brandData.length
        this.displayedColumns =[ 'company_name', 'supplier_name', 'email', 'phone_num1','country', 'tax_id','details']
        this.pager = this.pagerService.getPager(this.SuppLength, page);

      }, err => {
        console.log(err);;
      }
    )
  }
  setPageFilter(page,shop_id?) {
    this.pager = this.pagerService.getPager(this.SuppLength, page);
    this.page = page;
    this.ongetSuppliers(page,shop_id);
  
  }
 
  onDeleteSupplier(id){

    return this.supplierS2cService.DeleteSupplierSuper(id).subscribe(
      res=>{
        // this._snackBar.open(this.translate.currentLang === 'Chinese' ? "供货商已成功删除":this.translate.currentLang === 'Italian' ? "Fornitore eliminato con successo":'Supplier Successfully Deleted', '',{         duration: 2000,
        //  });
        this._snackBar.open( 'Supplier Successfully Deleted')

         this.ongetSuppliers();
       })
  
  }
}

