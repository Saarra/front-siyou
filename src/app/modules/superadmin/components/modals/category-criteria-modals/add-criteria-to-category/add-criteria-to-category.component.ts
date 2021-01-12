import { Component, OnInit } from '@angular/core';
import { CategoriesService } from 'src/app/shared/services/categories.service';
import { CriteriaService } from 'src/app/shared/services/criteria.service';
import { Router } from '@angular/router';
import { MatDialog, MatSnackBar } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-add-criteria-to-category',
  templateUrl: './add-criteria-to-category.component.html',
  styleUrls: ['./add-criteria-to-category.component.scss']
})
export class AddCriteriaToCategoryComponent implements OnInit {
  categoryList;
  criteriaList;


  constructor(
    private criteriaService: CriteriaService,
    private categoryService: CategoriesService,
    private router: Router,
    private dialog: MatDialog,
    private snackbar: MatSnackBar,
    private translate : TranslateService
  ) { }

  ngOnInit() {
    this.onGetCriteriaList();
    this.ongetCategoriesList();
  }
  onGetCriteriaList(){
    return  this.criteriaService.GetCriteriaList().subscribe(
      res=>{
         this.criteriaList=res;
      }
    );
  }
  ongetCategoriesList(){
    return this.categoryService.getCategoriesList().subscribe(
      res => {
        this.categoryList= res;
      }, err=>{
        console.log(err);;
      }
    );
  }

  onaddCriteriaToCategory(_category_id: any, _criteria_ids: any){
    var data={
      category_id : _category_id,
      criteria_ids: _criteria_ids
    }

    return this.categoryService.addCriteriaToCategory(data).subscribe(
      res=>{
        // this.redirectTo('superadmin/criteria-to-categories');
        this.router.navigate(['superadmin/criteria-to-categories']);

        this.dialog.closeAll();
        this.snackbar.open(this.translate.currentLang === 'Chinese' ? "条件已成功添加":this.translate.currentLang === 'Italian' ? "Criteri aggiunti con successo":'Criteria Appended Successfully', '',{
          duration: 2000
        });
      }, err=>{
        console.log(err);;
      }
    );
  }

  getNullValue(){
    return null;
  }

  redirectTo(uri:string){
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
    this.router.navigate([uri]));
  }


}
