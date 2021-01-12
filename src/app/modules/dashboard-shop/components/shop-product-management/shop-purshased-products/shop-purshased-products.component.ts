import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductsS2cService } from 'src/app/shared/services/products-s2c.service';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { PurchaseService } from 'src/app/shared/services/purchase.service';
@Component({
  selector: 'app-shop-purshased-products',
  templateUrl: './shop-purshased-products.component.html',
  styleUrls: ['./shop-purshased-products.component.scss']
})
export class ShopPurshasedProductsComponent implements OnInit {
  purchaseList: any;
  displayedColumns = ['image_url', 'product_name', 'item_barcode', 'item_offline_price', 'item_online_price', 'item_quantity', 'details'];
  dataSource = new MatTableDataSource<any>(this.purchaseList);
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  constructor(
    private purchaseService: PurchaseService
  ) { }
  ngOnInit() {
    this.onGetPurchasedProdsList();
  }
  onGetPurchasedProdsList() {
    return this.purchaseService.getPurchasedProdsList().subscribe(
      res => {
        this.purchaseList = res;
        this.displayedColumns = ['image_url', 'product_name', 'item_barcode', 'item_offline_price', 'item_online_price', 'item_quantity', 'details'];
        this.dataSource = new MatTableDataSource<any>(this.purchaseList);
      }, err => {
        console.log(err);;
      }
    )
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
