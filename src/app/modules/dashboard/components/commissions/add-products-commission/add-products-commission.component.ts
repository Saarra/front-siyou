import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductsService } from 'src/app/shared/services/products.service';
import { MatPaginator, MatSort, MatTableDataSource, MatSnackBar } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { SupplierService } from 'src/app/shared/services/supplier.service';
import { Router } from '@angular/router';
import { CommissionsService } from 'src/app/shared/services/commissions.service';
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: 'app-add-products-commission',
  templateUrl: './add-products-commission.component.html',
  styleUrls: ['./add-products-commission.component.scss']
})
export class AddProductsCommissionComponent implements OnInit {

  products;
  productsData;
  salesmanagerList;
  _keywordInit='';
  _barcodeInit='';


  selecteditems;


  
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  displayedColumns: string[] = ['select', 'product_image', 'product_name','product_barcode', 'unit_price', 'details'];
  dataSource = new MatTableDataSource<any>(this.productsData);
  selection = new SelectionModel<any>(true, []);


  displayedColumns1: string[] = ['product_image', 'product_name', 'unit_price'];
  dataSource1 = this.productsData;

  

  constructor(
    private productsService: ProductsService,
    private supplierService: SupplierService,
    private snackbar: MatSnackBar,
    private router: Router,
    private commissionService: CommissionsService,
    public translate: TranslateService

  ) { }

  ngOnInit() {
    this.ongetAllProductsItems(this._keywordInit, this._barcodeInit);
    this.getSupplierSalesmanagers();
  }

  ongetAllProductsItems(_keyword?, _barcode?){
    return this.productsService.getAllProductsItems(_keyword, _barcode).subscribe(
      res=>{
          this.products = res;
          this.productsData = this.products.data;


          
          this.dataSource.paginator = this.paginator;
 

          this.displayedColumns =['select', 'product_image', 'product_name', 'product_barcode','unit_price', 'details'];
          this.dataSource = new MatTableDataSource<any>(this.productsData);
          this.selection = new SelectionModel<any>(true, []);


          
          this.displayedColumns1= ['product_image', 'product_name', 'unit_price'];
          this.dataSource1 = this.selecteditems;



      }, err => {
        console.log(err);;
      }
    );
  }



  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }




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

  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }
  
  getCheckeditems(){
    this.selecteditems = this.selection.selected;
  }


  getSupplierSalesmanagers() {
    this.supplierService.getSupplierSalesManager().subscribe((salesmanagerList: any) => {
      this.salesmanagerList = salesmanagerList
     
    })

  }


  Submit(_sales_manager_id, _commission_percent){
    const items=[];

    this.selecteditems.forEach(oneData=>{
       items.push(oneData.id);
    })
     const commission ={
      commission_type: 'by product',
      commission_percent: _commission_percent,
      items_id: items,
      sales_manager_id: _sales_manager_id
     }

     this.commissionService.addProductsCommission(commission).subscribe(
       res=>{
        this.router.navigate(["add-product-commission"]);

        //  this.redirectTo(`add-product-commission`);
         this.snackbar.open(this.translate.currentLang === 'Chinese' ? "佣金产品已成功添加" :this.translate.currentLang === 'Italian' ? "Prodotto su commissione aggiunto con successo": 'Commission Product Added Successfully', 'OK', {
           duration: 2000
         });
       }, err => {
         console.log(err);;
       }
     );
     
     
  }

  redirectTo(uri:string){
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
    this.router.navigate([uri]));
 }


}
