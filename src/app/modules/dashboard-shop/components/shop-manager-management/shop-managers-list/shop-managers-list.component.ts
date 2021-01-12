import { Component, OnInit, ViewChild, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { ShopmanagerService } from 'src/app/shared/services/shopmanager.service';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';

@Component({
  selector: 'app-shop-managers-list',
  templateUrl: './shop-managers-list.component.html',
  styleUrls: ['./shop-managers-list.component.scss']
})
export class ShopManagersListComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  shopManagersList;
  displayedColumns = [ 'manager_image','manager', 'email', 'contact' ,'is_active','actions'];
  dataSource = new MatTableDataSource<any>();


  constructor(
    private shopManagerService: ShopmanagerService
  ) { }

  ngOnInit(
  ) {
    this.getShopManagersList();
    this.dataSource.paginator = this.paginator;

  }
  ngAfterViewInit(){
    this.dataSource.sort= this.sort;
  }
  shopManagers;
  getShopManagersList(){
    return this.shopManagerService.getShopmangerList().subscribe(
      res=>{
        this.shopManagers=res;
        this.shopManagersList  = this.shopManagers.data;
        // console.log(this.shopManagers)
        this.displayedColumns = [ 'manager_image','manager', 'email', 'contact' ,'is_active', 'actions'];
        this.dataSource.data = this.shopManagersList;
      }, err => {
        console.log(err);;
      }
    );
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
