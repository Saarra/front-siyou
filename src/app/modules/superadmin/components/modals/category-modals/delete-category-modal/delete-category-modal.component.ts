import { Component, OnInit, Inject } from '@angular/core';
import { CategoriesService } from 'src/app/shared/services/categories.service';
import { Router } from '@angular/router';
import { MatSnackBar, MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-delete-category-modal',
  templateUrl: './delete-category-modal.component.html',
  styleUrls: ['./delete-category-modal.component.scss']
})
export class DeleteCategoryModalComponent implements OnInit {

  currentCategory;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private router: Router,
    private categoryService : CategoriesService,
    private dialog: MatDialog,
    private snackbar: MatSnackBar,
    public translate: TranslateService,
     private dialogRef: MatDialogRef<DeleteCategoryModalComponent>
  ) { }

  ngOnInit() {
     this.currentCategory=   this.dialogRef.componentInstance.data;
  }

  ondeleteCategory(id : any){
    return this.categoryService.deleteCateogy(id).subscribe(
      res=>{
          //  this.redirectTo('superadmin/categories');
           this.router.navigate(['superadmin/categories']);

           this.dialog.closeAll();
           this.snackbar.open(this.translate.currentLang === 'Chinese' ? "类别已成功删除":this.translate.currentLang === 'Italian' ? "Categoria eliminata con successo":'Category Successfully Deleted', '',{       
            duration: 2000
           });      }
    )
  }
 

  redirectTo(uri:string){
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
    this.router.navigate([uri]));
  }

}
