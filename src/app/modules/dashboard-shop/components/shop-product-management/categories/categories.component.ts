import { Component, OnInit,ViewChild ,AfterViewInit} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { PeriodicElement } from 'src/app/modules/superadmin/components/commission-list/commission-list.component';
import { SelectionModel } from '@angular/cdk/collections';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { CategoriesService } from 'src/app/shared/services/categories.service';
import { MatSnackBar, MatTableDataSource, MatDialog ,MatPaginator, MatSort } from '@angular/material';
import {AddCategoryComponent} from 'src/app/modules/dashboard-shop/components/shop-product-management/categories/add-category/add-category.component'
@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed, void', style({ height: '0px', minHeight: '0', display: 'none' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
      transition('expanded <=> void', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)'))
    ])
  ],
})
export class CategoriesComponent implements OnInit, AfterViewInit  {
    
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
 
  date;
  selecteditems;
  productItemsList;
  data;
  discountTypes;
  discountData;
  pageSize =20;
  chain;
  chainData;

  barcodeInit='';
  keywordInit='';
  
  expanded = false;
  panelOpenState = false;
  categoryList: any;
  displayedColumns: string[] = ['select','category_image','category_name','sub_cat'];
  dataSource = new MatTableDataSource<any>(this.data);
  selection = new SelectionModel<any>(true, []);
  displayedColumns1: string[] = ['category_image','category_name'];
  dataSource1 = this.data;

  expandedElement: null;

  constructor(private categoriesService: CategoriesService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    public translate: TranslateService,
    private router: Router,

  ) { }

  
  ngOnInit(){

    this.onGetCategoryList();
    this.dataSource.paginator = this.paginator;

  }
  ngAfterViewInit(){
   this.dataSource.sort = this.sort;
   }
  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }


  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: PeriodicElement): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }
  disabled = false;
  getCheckeditems(){
    this.selecteditems = this.selection.selected;
    if (this.selecteditems.length === 30) {
      this.disabled = true;
    } else {
      this.disabled = false;

    }
    //console.log(this.selecteditems ,this.selection)
  }
  cat;
  onGetCategoryList() {
    this.categoriesService.getCategoriesSystem().subscribe(res => {
      this.cat = res ;
      this.data = this.cat.data;
      this.displayedColumns=  ['select','category_image','category_name','sub_cat'];
      this.dataSource.data = this.data;
      this.selection = new SelectionModel<any>(true, []);
      this.displayedColumns1=  ['category_image','category_name'];
      this.dataSource1 = this.selecteditems;
    })
  }
  // open modals methods
  openAddCategory() {
    this.dialog.open(AddCategoryComponent);
  }

  openEditCategoryModal(data: any) {
    //this.dialog.open(EditCategoryModalComponent, { data });
  }

  openDeleteCategoryModal(data: any) {
    //this.dialog.open(DeleteCategoryModalComponent, { data });
  }

  
 

  onAffect(){
     var sel = this.selecteditems;
     var categories: number[] = [];
     for(var i=0; i<sel.length; i++){ 
      categories.push(sel[i].id)
     }
     console.log(categories)
     var cat = {
      store_id: localStorage.getItem('store_id'),
      categories: categories,
    }

     return this.categoriesService.affectCategoryS2C(cat).subscribe(
        res=>{
          
          // this.redirectTo('/shop/categories');
          this.router.navigate([`shop/categories`]);

           this.snackBar.open('Categories Choosed successfully', 'OK',
           {
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
