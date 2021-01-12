import { Component, OnInit, ViewChild, Inject ,ElementRef, OnChanges } from '@angular/core';
import { CategoriesService } from 'src/app/shared/services/categories.service';
import { Categories } from 'src/app/shared/models/categories.model';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialog, MatInput,MatSnackBar, MatDialogRef } from '@angular/material';
import { FormBuilder, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnInit {
  @ViewChild('resultInput', { static: false }) resultInput: ElementRef;
  categoryList;
  form: any;
  formData: any;
  french: boolean = false;
  italian: boolean = false;
  chinois: boolean = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private categoryService: CategoriesService,
    private router: Router,
    private dialog : MatDialog,
    private snackBar: MatSnackBar,
    private formBuilder: FormBuilder,
    private translate : TranslateService 
  ) {
    this.formData = new FormData();

  }

  ngOnInit() {
   this.form = this.formBuilder.group({
    category_image: [''],
    name: [''],
    category_cn: [''],
    category_it: [''],
    category_fr: ['']

  })
  
  }

  onaddCategoryByShop(){
if(this.form.get('category_fr').value == ""){
  this.form.get('category_fr').setValue(this.form.get('name').value);

}
if(this.form.get('category_it').value == ""){
  this.form.get('category_it').setValue(this.form.get('name').value);

}
if(this.form.get('category_cn').value == ""){
  this.form.get('category_cn').setValue(this.form.get('name').value);

}
    this.formData = this.toFormData(this.form.value);
    return this.categoryService.addCategoryByShop(this.formData).subscribe(
      res => {
        // this.redirectTo('shop/my-categories');
        this.router.navigate([`shop/my-categories`]);

        this.dialog.closeAll();

        this.snackBar.open(this.translate.currentLang === 'Chinese' ? "分类已成功添加":this.translate.currentLang === 'Italian' ? "Categoria aggiunta con successo":'Category Added Successfully', '',{
                    duration: 1000
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
  choosefren()
  {
    this.french = true;
  }
  chooseChinois()
  {
    this.chinois = true;
  }
  chooseitalian()
  {
    this.italian = true;
  }
}
