import { Component, OnInit, ViewChild, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { ShopoperatorService } from 'src/app/shared/services/shopoperator.service';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';

@Component({
  selector: 'app-shop-operators-list',
  templateUrl: './shop-operators-list.component.html',
  styleUrls: ['./shop-operators-list.component.scss']
})
export class ShopOperatorsListComponent implements OnInit {

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  shopoperatorsList;
  displayedColumns = [ 'operator_image','operator', 'email', 'contact' ,'is_active','actions'];
  dataSource = new MatTableDataSource<any>();


  constructor(
    private shopOperatorService: ShopoperatorService
  ) { }

  ngOnInit(
  ) {
    this.getShopOperatorsList();
    this.dataSource.paginator = this.paginator;

  }
  ngAfterViewInit(){
    this.dataSource.sort= this.sort;
  }
  shopOperators;
  getShopOperatorsList(){
    return this.shopOperatorService.getShopoperatorList().subscribe(
      res=>{
        this.shopOperators=res;
        this.shopoperatorsList  = this.shopOperators.data;
        //console.log(this.shopOperators)
        this.displayedColumns = [ 'operator_image','operator', 'email', 'contact' ,'is_active', 'actions'];
        this.dataSource.data = this.shopoperatorsList;
      }, err => {
        console.log(err);;
      }
    );
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
