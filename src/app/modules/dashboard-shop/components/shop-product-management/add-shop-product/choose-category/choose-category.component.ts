import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Router } from '@angular/router';
import { CategoriesService } from 'src/app/shared/services/categories.service';
import { MatSnackBar, MatTableDataSource, MatDialogRef } from '@angular/material';
@Component({
  selector: 'app-choose-category',
  templateUrl: './choose-category.component.html',
  styleUrls: ['./choose-category.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed, void', style({ height: '0px', minHeight: '0', display: 'none' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
      transition('expanded <=> void', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)'))
    ])
  ],
})
export class ChooseCategoryComponent implements OnInit {
  catList;
  catId;
  expanded = false;
  categoryList: any;
  categoryData : any;
  displayedColumns: string[] = ['choose','category_image', 'category_name'];
  dataSource = new MatTableDataSource<any>(this.categoryData);
  expandedElement: null;
  constructor(private categoriesService: CategoriesService,
    public translate: TranslateService,
    public dialogRef: MatDialogRef<ChooseCategoryComponent>) { }



  ngOnInit() {
    this.onGetCategoryList();
  }

  
  onGetCategoryList() {
    this.categoriesService.getCategories().subscribe(categoryList => {
      this.catList = categoryList;
      console.log(this.catList)
      this.categoryData=this.catList.data;
      this.dataSource = new MatTableDataSource<any>(this.categoryData);
      this.displayedColumns = ['choose','category_image', 'category_name'];

    })
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  cancel() {
    this.dialogRef.close({ data: 'you must choose category' })
  }
  confirm() {
    this.dialogRef.close({ data: this.category })
  }
  category
  onSelect(selectedItem: any) {
    this.category = selectedItem
  }
}
