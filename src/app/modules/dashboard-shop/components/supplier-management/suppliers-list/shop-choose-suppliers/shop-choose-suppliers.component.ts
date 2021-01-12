import {AfterViewInit, Component, ViewChild,OnInit} from '@angular/core';
import { DataSource } from '@angular/cdk/table';
import { SupplierS2cService } from 'src/app/shared/services/supplier-s2c.service';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { MatSnackBar, MatDialogRef, MatDialog } from '@angular/material';
import * as XLSX from 'xlsx';
import { ExcelService } from 'src/app/shared/services/excel.service';
import { Router } from '@angular/router';
import { PeriodicElement } from 'src/app/modules/superadmin/components/commission-list/commission-list.component';
import { SelectionModel } from '@angular/cdk/collections';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-shop-choose-suppliers',
  templateUrl: './shop-choose-suppliers.component.html',
  styleUrls: ['./shop-choose-suppliers.component.scss']
})
export class ShopChooseSuppliersComponent implements OnInit , AfterViewInit {
  suppliersList;
  suppliersData;
  pageSize = 20;

  displayedColumns = [ 'company_name', 'supplier_name', 'email', 'phone_num1','country', 'tax_id','details'];
  dataSource:any = new MatTableDataSource();
  selection = new SelectionModel<any>(true, []);
  selecteditems;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;


  constructor(private supplierService: SupplierS2cService,
    private excelService: ExcelService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private router: Router,
    private translate : TranslateService

    ) { }

  ngOnInit() {

    this.onGetSuppliersList();
    this.dataSource.paginator = this.paginator;

  }
  ngAfterViewInit(){
   this.dataSource.sort = this.sort;
   }
  suppliersNum:number=0;
  suppwebsite:number=0;
  suppcontact:number=0;
  suppemail:number=0;
   /** Whether the number of selected elements matches the total number of rows. */
   isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
        this.selecteditems = this.selection.selected;
        //console.log(this.selecteditems);

  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: PeriodicElement): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }
  
  getCheckeditems(){
    this.selecteditems = this.selection.selected;
    //console.log(this.selecteditems);
  }
  onGetSuppliersList(){

    return this.supplierService.GetAllSuppliersListS2C().subscribe(
      res=>{
        this.suppliersData=res;
        this.dataSource.data = this.suppliersData.data;
         this.displayedColumns =[ 'select','company_name', 'supplier_name', 'email', 'phone_num1','country', 'tax_id','details']

         //console.log(this.suppliersData)
      }, err=>{
        console.log(err);;
      }
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  
  }
  
onAssignSupplier() {
    var sel = this.selecteditems;
    var suppliers: number[] = [];
    for(var i=0; i<sel.length; i++){ 
      suppliers.push(sel[i].id)
    }
    var supp = {
     store_id: localStorage.getItem('store_id'),
     suppliers: suppliers,
   }
   return this.supplierService.AssignSuppliers(supp).subscribe(
    res=>{
      this.dialog.closeAll()
      // this.redirectTo('/shop/suppliers-list');
      this.router.navigate([`shop/suppliers-list`]);

      this.snackBar.open(this.translate.currentLang === 'Chinese' ? "供货商已成功选择":this.translate.currentLang === 'Italian' ? "Fornitori scelti con successo":'Suppliers Choosed successfully', '',{       
         duration:1000
       });
    }, err=>{
      console.log(err);
    }
  );
  }

  redirectTo(uri: string) {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      this.router.navigate([uri]));
  }
  
}


