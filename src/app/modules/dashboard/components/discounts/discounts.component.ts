
import {SelectionModel} from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { MatPaginator, MatSort, MatSnackBar } from '@angular/material';
import { ProductsService } from 'src/app/shared/services/products.service';
import { DiscountService } from 'src/app/shared/services/discount.service';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';


export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];

const ELEMENT_DATA1: PeriodicElement1[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];



export interface PeriodicElement1 {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}


@Component({
  selector: 'app-discounts',
  templateUrl: './discounts.component.html',
  styleUrls: ['./discounts.component.scss'],
  
})
export class DiscountsComponent implements OnInit {


  

 
  date;
  selecteditems;
  productItemsList;
  data;
  discountTypes;

  barcodeInit='';
  keywordInit='';
  

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  displayedColumns: string[] = ['select', 'image_url', 'product_name', 'item_online_price', 'details'];
  dataSource = new MatTableDataSource<any>(this.data);
  selection = new SelectionModel<any>(true, []);


  displayedColumns1: string[] = ['image_url', 'product_name', 'item_online_price'];
  dataSource1 = this.data;

  
   
  constructor(
    private productService: ProductsService,
    private discountService: DiscountService,
    public datepipe: DatePipe,
    private snackbar: MatSnackBar,
    private router: Router,
    public translate: TranslateService

  ){}

  ngOnInit(){
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.onGetProductsItemsList(this.barcodeInit, this.keywordInit);
    this.onGetDiscountTypes();


  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
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
  }

  onGetProductsItemsList(_keyword?, _barcode?){

    if(!_keyword){
      _keyword = ''
    }

    
    if(!_barcode){
      _barcode = ''
    }
     
    return this.productService.getAllProductsItems(_keyword,_barcode).subscribe(
      
      res=>{
          this.productItemsList = res;
          this.data = this.productItemsList.data;

          this.displayedColumns = ['select', 'image_url', 'product_name', 'item_offline_price', 'details'];
          this.dataSource = new MatTableDataSource<any>(this.data);
          this.selection = new SelectionModel<any>(true, []);


          
          this.displayedColumns1= ['image_url', 'product_name', 'item_online_price'];
          this.dataSource1 = this.selecteditems;

          



      }, err=>{
        console.log(err);;
      }
    );
  
  }

  
  onGetDiscountTypes(){
   
    return this.discountService.getDiscountTypes().subscribe(
      res=>{
        this.discountTypes = res;
      }, err=>{
        console.log(err);;
      }
    );
  }

  getFormValues(discounttype: any, val: any, startdate: any, enddate: any){
     
    
     var sel = this.selection.selected;
     var arr: number[] = [];

     for(var i=0; i<sel.length; i++){

         
        arr.push(sel[i].id)
     }

     
     var strdate =this.datepipe.transform(startdate, 'yyyy-MM-dd');
     var endate =this.datepipe.transform(enddate, 'yyyy-MM-dd');

     var el = {
      discount_id: discounttype,
      items_id: arr,
      start_date: strdate,
      finish_date: endate,
      value: val,

    }


     return this.discountService.addPromotion(el).subscribe(
        res=>{
          this.router.navigate(["dashboard/discounts"]);

          //this.redirectTo('dashboard/discounts');
          
           this.snackbar.open(this.translate.currentLang === 'Chinese' ? '折扣已成功添加':this.translate.currentLang === 'Italian' ? "Sconto aggiunto con successo":'Discount added successfully', 'OK',
           {
             duration:2000
           });
        }, err=>{
          console.log(err);
        }
      );
  }

   
  transformDate(date){
    let latest_date =this.datepipe.transform(date, 'yyyy-MM-dd');
   }




redirectTo(uri: string) {
  this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
    this.router.navigate([uri]));
}






}
