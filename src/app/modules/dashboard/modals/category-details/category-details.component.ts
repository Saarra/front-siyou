import { Component, OnInit, Input } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-category-details',
  templateUrl: './category-details.component.html',
  styleUrls: ['./category-details.component.scss']
})
export class CategoryDetailsComponent implements OnInit {

  @Input() productList;
  categoriesName = ['Electronics', 'Fashion', 'Clothes'];
  catName = '';
  constructor() { }

  ngOnInit() {
    this.catName = this.categoriesName[Math.random() * Math.floor(3)];
  }

  getProdImage(path) {
    return `${environment.baseImageUrl}/${path}`;
  }

}
