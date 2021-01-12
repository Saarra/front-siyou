import { Component, OnInit, ViewChild, Inject ,ElementRef } from '@angular/core';
import { CategoriesService } from 'src/app/shared/services/categories.service';
import { Router ,ActivatedRoute } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialog, MatInput,MatSnackBar } from '@angular/material';
import { FormBuilder, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-edit-my-category',
  templateUrl: './edit-my-category.component.html',
  styleUrls: ['./edit-my-category.component.scss']
})
export class EditMyCategoryComponent implements OnInit {
  @ViewChild('resultInput', { static: false }) resultInput: ElementRef;
  categoryList;
  form: any;
  formData: any;
  french: boolean = false;
  italian: boolean = false;
  chinois: boolean = false;
  currentId;
  currentDirection;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private categoryService: CategoriesService,
    private router: Router,
    private dialog : MatDialog,
    private snackBar: MatSnackBar,
    private formBuilder: FormBuilder,
    private activatedRouter: ActivatedRoute,
    private translate : TranslateService

  ) {
    this.formData = new FormData();
    
      activatedRouter.params.subscribe(params => {
        this.currentId = params.id;
        this.currentDirection= params.direction
      })
    
  }

  ngOnInit() {
   this.ongetCategoryByID(this.currentId);
   this.form = this.formBuilder.group({
    category_image: [''],
    name: [],
    category_cn: [],
    category_it: [],
    category_fr: [],
    category_id: this.currentId

  })
  
  }
  currentcategory;
  ongetCategoryByID(id){
    return this.categoryService.getmyCategoryById(this.currentId).subscribe(
      res => {
        this.currentcategory= res;
        console.log(this.currentcategory)
      }, err=>{
        console.log(err);;
      }
    );
  }
  onEditCategory(name,category_fr,category_cn,category_it){
    this.form.get('category_cn').setValue(category_cn);
    this.form.get('category_it').setValue(category_it);
    this.form.get('category_fr').setValue(category_fr);
    this.form.get('name').setValue(name);
    this.formData = this.toFormData(this.form.value);
    return this.categoryService.editMycategories(this.formData).subscribe(
      res => {
        if(this.currentDirection == 1) {
          // this.redirectTo('shop/categories');
          this.router.navigate([`shop/categories`]);


        }
        if(this.currentDirection == 2) {
          // this.redirectTo('shop/my-categories');
          this.router.navigate([`shop/my-categories`]);

        }
        this.snackBar.open(this.translate.currentLang === 'Chinese' ? "分类成功更新":this.translate.currentLang === 'Italian' ? "Categoria aggiornata con successo":'Category Updated Successfully', '',{          duration: 1000
        });
      }, err=>{
        console.log(err);;
      }
    );
  }


  getNullValue(){
    return null;
  }
  toFormData<T>(formValue: T) {
    const formData = new FormData();
    for (const key of Object.keys(formValue)) {
      const value = formValue[key];
      formData.append(key, value);
    }
    return formData;
  }

  redirectTo(uri:string){
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
    this.router.navigate([uri]));
  }

  getFileChange(event) {
    const fileInputImg = this.resultInput.nativeElement as MatInput;
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      //console.log(file);
      fileInputImg.value = file.name;
      this.form.get('category_image').setValue(file);
      this.formData.append('category_image', this.form.get('category_image').value);
    }
  }
}