import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { CategoriesService } from 'src/app/shared/services/categories.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef, MatSnackBar } from '@angular/material';
import { Categories } from 'src/app/shared/models/categories.model';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-edit-category-modal',
  templateUrl: './edit-category-modal.component.html',
  styleUrls: ['./edit-category-modal.component.scss']
})
export class EditCategoryModalComponent implements OnInit {

  currentCategory;
  categoryList;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    private router: Router,
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<EditCategoryModalComponent>,
    private categoriesService: CategoriesService,
    private snackbar: MatSnackBar,
    private translate : TranslateService
  ) { }

  ngOnInit() {
    this.currentCategory = this.dialogRef.componentInstance.data;
    this.getAllCategories();
  }

  onEditCategory(category_id,category_name,category_fr,category_cn, category_it , parent_category_id) {
    var _Category={
      category_id :category_id,
      name: category_name,
      category_it: category_it,
      category_cn: category_cn,
      category_fr: category_fr,
      parent_id: parent_category_id,
    }

    return this.categoriesService.editCategory(this.currentCategory.id,_Category).subscribe(
      res => {
        // this.redirectTo('superadmin/categories');
        this.router.navigate(['superadmin/categories']);

        this.dialog.closeAll();
        this.snackbar.open(this.translate.currentLang === 'Chinese' ? "分类成功更新":this.translate.currentLang === 'Italian' ? "Categoria aggiornata con successo":'Category Updated Successfully', '',
        { 
          duration: 2000
        });
      }, err => {
        console.log(err);;
      }
    );
  }


  getAllCategories() {
    this.categoriesService.getCategoriesList().subscribe(
      res => {
        this.categoryList = res;
      }, err => {
        console.log(err);;
      });
  }
  getNullValue(){
    return null;
  }

  redirectTo(uri: string) {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      this.router.navigate([uri]));
  }
}
