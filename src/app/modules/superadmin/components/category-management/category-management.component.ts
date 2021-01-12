import { Component, OnInit } from '@angular/core';

import { CategoriesService } from 'src/app/shared/services/categories.service';
import { MatSnackBar, MatTableDataSource, MatDialog } from '@angular/material';
import { EditCategoryModalComponent } from '../modals/category-modals/edit-category-modal/edit-category-modal.component';
import { AddCategoryModalComponent } from '../modals/category-modals/add-category-modal/add-category-modal.component';
import { DeleteCategoryModalComponent } from '../modals/category-modals/delete-category-modal/delete-category-modal.component';

@Component({
  selector: 'app-category-management',
  templateUrl: './category-management.component.html',
  styleUrls: ['./category-management.component.scss'],
})
export class CategoryManagementComponent implements OnInit {
  panelOpenState = false;
  categoryList: any;
  dataSource = new MatTableDataSource();
  displayedColumns = ['category_name', 'created_at', 'updated_at', 'actions'];




  constructor(private categoriesService: CategoriesService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.onGetCategoryList();
  }
  categoryData;
  onGetCategoryList() {
    this.categoriesService.getCategoriesSystem().subscribe(categoryList => {
      this.categoryList = categoryList;
      this.categoryData = this.categoryList.data;


    })
  }

  // open modals methods
  openAddCategoryModal() {
    this.dialog.open(AddCategoryModalComponent);
  }

  openEditCategoryModal(data: any) {
    this.dialog.open(EditCategoryModalComponent, { data })
  }

  openDeleteCategoryModal(data: any) {
    let dialogRef = this.dialog.open(DeleteCategoryModalComponent, { data })
    dialogRef.afterClosed().subscribe(res => {
      this.onGetCategoryList();
    }) 
  }
}