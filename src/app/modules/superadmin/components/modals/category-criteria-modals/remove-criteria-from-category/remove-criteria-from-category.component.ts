import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar, MatDialog } from '@angular/material';
import { CategoriesService } from 'src/app/shared/services/categories.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-remove-criteria-from-category',
  templateUrl: './remove-criteria-from-category.component.html',
  styleUrls: ['./remove-criteria-from-category.component.scss']
})
export class RemoveCriteriaFromCategoryComponent implements OnInit {

  currentCategory;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private categoryService: CategoriesService,
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<RemoveCriteriaFromCategoryComponent>,
    private router: Router,
    private snackbar: MatSnackBar
  ) { }

  ngOnInit() {
    this.currentCategory = this.dialogRef.componentInstance.data;
  }

  onRemoveCriteriaFromCategory() {
    var idCategory = this.currentCategory.category.id;
    var idCriteria = this.currentCategory.criteria.id
    return this.categoryService.RemoveCriteriaFromCategory(idCategory, idCriteria).subscribe(
      res => {
        // this.redirectTo('superadmin/criteria-to-categories');
        this.router.navigate(['superadmin/criteria-to-categories']);

        this.dialog.closeAll();
        this.snackbar.open('Criteria Removed Successfully', 'OK', {
          duration: 2000
        });
      }, err => {
        console.log(err);;
      });
  }
  redirectTo(uri: string) {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      this.router.navigate([uri]));
  }


}
