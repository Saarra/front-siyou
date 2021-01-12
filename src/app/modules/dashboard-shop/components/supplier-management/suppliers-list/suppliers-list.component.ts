
import {AfterViewInit, Component, ViewChild,OnInit} from '@angular/core';
import { DataSource } from '@angular/cdk/table';
import { SupplierS2cService } from 'src/app/shared/services/supplier-s2c.service';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { MatSnackBar, MatDialogRef, MatDialog } from '@angular/material';
import * as XLSX from 'xlsx';
import { ExcelService } from 'src/app/shared/services/excel.service';
import {ShopChooseSuppliersComponent} from 'src/app/modules/dashboard-shop/components/supplier-management/suppliers-list/shop-choose-suppliers/shop-choose-suppliers.component'
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-suppliers-list',
  templateUrl: './suppliers-list.component.html',
  styleUrls: ['./suppliers-list.component.scss']
})
export class SuppliersListComponent implements OnInit , AfterViewInit  {

  suppliersList;
  suppliersData;

  displayedColumns = [ 'company_name', 'supplier_name', 'email', 'phone_num1','country', 'tax_id','details'];
  dataSource:any = new MatTableDataSource();

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;


  constructor(private supplierService: SupplierS2cService,
    private excelService: ExcelService,
    private dialog: MatDialog,
    private _snackBar: MatSnackBar,
    public translate: TranslateService,

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
  onGetSuppliersList(){
    return this.supplierService.GetChosenSuppliers().subscribe(
      res=>{
        this.suppliersList= res;
        this.suppliersData=this.suppliersList.data
        this.dataSource.data =this.suppliersData;
        console.log(this.dataSource)

         for (let supp of this.suppliersData) {
              this.suppliersNum+=1
              if (supp.website != "")
              {
                this.suppwebsite += 1
              }
              if (supp.contact != "")
              {
                this.suppcontact += 1
              }
              if (supp.email != "")
              {
                this.suppemail += 1
              }
         }

         this.displayedColumns =[ 'company_name', 'supplier_name', 'email', 'phone_num1','country', 'tax_id','details']
      }, err=>{
        console.log(err);;
      }
    );
  }

  
 
  suppExport : {} [] = [];
  onexportAsExcelFile(){
    this.suppExport = [];
    for(let supp in this.suppliersData){
      var supplier ={Supplier_Name:'',Company_Name:'' , Email: '', Phone:'' ,Tax_ID : '', Website:'' , Adress: '', Country: '',City: '',Zip_Postal: '' };
      supplier.Supplier_Name = this.suppliersData[supp].supplier_name;
      supplier.Company_Name = this.suppliersData[supp].company_name;
      supplier.Email=this.suppliersData[supp].email
      supplier.Phone=this.suppliersData[supp].contact
      supplier.Tax_ID=this.suppliersData[supp].tax_id
      supplier.Website=this.suppliersData[supp].website
      supplier.Adress=this.suppliersData[supp].adress
      supplier.Country=this.suppliersData[supp].country
      supplier.City=this.suppliersData[supp].city
      supplier.Zip_Postal=this.suppliersData[supp].postal_code
      this.suppExport.push(supplier);
      }
      this.excelService.exportAsExcelFile(this.suppExport, 'Suppliers List');

}
  fileName = 'ExcelSheet.xlsx';

  exportexcel(): void {
    /* table id is passed over here */
    let element = document.getElementById('excel-table');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
 
    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
 
    /* save to file */
    XLSX.writeFile(wb, this.fileName,{compression:true});
 
 
  }
 
  exportAsXLSX(): void {
   this.excelService.exportAsExcelFile(this.suppExport, 'Stock');
 
 }
 applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();

}



 onChooseSupplier(){
  this.dialog.open(ShopChooseSuppliersComponent ,{
    autoFocus: false,
    maxHeight: '90vh' 
  })

 }
 onDeleteSupplier(id){

  return this.supplierService.DeleteSupplierS2C(id).subscribe(
    res=>{
      this._snackBar.open(this.translate.currentLang === 'Chinese' ? "供货商已成功删除":this.translate.currentLang === 'Italian' ? "Fornitore eliminato con successo":'Supplier Successfully Deleted', '',{         duration: 2000,
       });
       this.onGetSuppliersList();
     })

}
 }

