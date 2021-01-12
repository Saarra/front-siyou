import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/shared/services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  productList: any = [];
  constructor(private productsService: ProductsService) { }

  ngOnInit() {
    this.getProductsList();
  }

  getProductsList() {
    this.productsService.getSalesManagerProductList().subscribe(data => {
      this.productList = data;
    })
  }

}
