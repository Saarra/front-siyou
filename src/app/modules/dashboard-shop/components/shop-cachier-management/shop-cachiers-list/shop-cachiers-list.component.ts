import { Component, OnInit, ViewChild, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { ShopcachierService } from 'src/app/shared/services/shopCachier.service';
import { MatSnackBar,MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { ChainService } from 'src/app/shared/services/chain.service';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-shop-cachiers-list',
  templateUrl: './shop-cachiers-list.component.html',
  styleUrls: ['./shop-cachiers-list.component.scss']
})
export class ShopcachiersListComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  shopcachierssList: any = [];
  displayedColumns = ['cachier_image','cachier', 'contact','password','actions'];
  dataSource = new MatTableDataSource<any>();
  chainList;
  chainData;

  constructor(
   private ShopcachierService: ShopcachierService,
   private chainService: ChainService,
   private _snackBar: MatSnackBar,
   private router: Router,
   public translate: TranslateService

  ) { }

  ngOnInit(
  ) {
    this.ongetChainList();
    this.getShopcachiersList();

    this.dataSource.paginator = this.paginator;

  }
  ngAfterViewInit(){
    this.dataSource.sort= this.sort;
  }
  
  ongetChainList() {
    return this.chainService.getChainList().subscribe(
      res => {
        this.chainList = res;
        this.chainData = this.chainList.data;
      }, err => {
        console.log(err);

      }
    );
  }
  shopcachiersData;
  getShopcachiersList(){
    return this.ShopcachierService.getcachiersList().subscribe(
      res=>{
        this.shopcachierssList  = res;
        this.shopcachiersData = this.shopcachierssList.data
        this.displayedColumns = ['cachier_image','cachier', 'contact','password','actions'];
        this.dataSource.data = this.shopcachierssList;
      }, err => {
        console.log(err);;
      }
    );
  }
  

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  cashierList;
  cashierData;
  onFilterCashiersList(chain_id) {


    if (chain_id == 0 || !chain_id) {
      chain_id = '';
    }

    return this.ShopcachierService.filtercachiersList(chain_id).subscribe(
      res => {
        this.cashierList = res;
        this.cashierData = this.cashierList.data;
        this.dataSource = new MatTableDataSource<any>(this.cashierList);
      }, err => {
        console.log(err);;
      }
    );
  }
  onDeleteCashier(id){
    return this.ShopcachierService.DeleteCashier(id).subscribe(
      res => {
      
this._snackBar.open(this.translate.currentLang === 'Chinese' ? "收银员已成功删除":this.translate.currentLang === 'Italian' ? "Cassiere eliminato con successo":'Cashier Successfully Deleted', '',{
          duration: 1000,
        });
        // this.redirectTo('shop/cashiers-list');
        this.router.navigate([`shop/cashiers-list`]);

      }, err => {
        this._snackBar.open('This is a SHOP MANAGER ! You can\'t delete it', "ERROR", {
          duration: 3000,
          panelClass: ['loginSnackbar']

        });
        console.log(err);;
      }
    )
  }
  redirectTo(uri:string){
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
    this.router.navigate([uri]));
  }
}

