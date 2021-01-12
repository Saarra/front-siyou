import { Component, OnInit, ViewChild, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog, MatSnackBar } from '@angular/material';
import { SupplierS2cService } from 'src/app/shared/services/supplier-s2c.service';

@Component({
  selector: 'app-suppliers-management',
  templateUrl: './suppliers-management.component.html',
  styleUrls: ['./suppliers-management.component.scss']
})
export class SuppliersManagementComponent implements OnInit {
  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  brand;
  user;
  sum_brand = 0;
  brandData;
  displayedColumns = [ 'company_name', 'supplier_name', 'email', 'phone_num1','country', 'tax_id','details'];

  constructor(
    private supplierS2cService : SupplierS2cService,
    private _snackBar: MatSnackBar,

  ) { }

  ngOnInit() {
    this.ongetSuppliers();
    this.dataSource.paginator = this.paginator;
    
  }

  ongetSuppliers(){
    this.supplierS2cService.GetAllSuppliersListS2C().subscribe(
      res => {
        this.brand = res;
        this.brandData = this.brand.data;
        this.dataSource.data = this.brandData;
        this.sum_brand = this.brandData.length
        this.displayedColumns =[ 'company_name', 'supplier_name', 'email', 'phone_num1','country', 'tax_id','details']

      }, err => {
        console.log(err);;
      }
    )
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
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
