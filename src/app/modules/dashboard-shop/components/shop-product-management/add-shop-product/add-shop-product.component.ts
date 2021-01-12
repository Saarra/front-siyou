import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar, MatInput,MatDialog } from '@angular/material';
import { FormBuilder, Validators } from '@angular/forms';
import { ChainService } from 'src/app/shared/services/chain.service';
import { CategoriesService } from 'src/app/shared/services/categories.service';
import { ProductsS2cService } from 'src/app/shared/services/products-s2c.service';
import { $ } from 'protractor';
import {ChooseCategoryComponent} from 'src/app/modules/dashboard-shop/components/shop-product-management/add-shop-product/choose-category/choose-category.component'
import { SupplierS2cService } from 'src/app/shared/services/supplier-s2c.service';
import { DatePipe } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-add-shop-product',
  templateUrl: './add-shop-product.component.html',
  styleUrls: ['./add-shop-product.component.scss']
})
export class AddShopProductComponent implements OnInit {

  formData: any;
  @ViewChild('resultInput', { static: false }) resultInput: ElementRef;
  @ViewChild('expired_date', { static: false }) expired_date: ElementRef;

  

  chainList;
  chainData;
  categoryList;
  categoriesList;
  categoryData;
  form;
  catId:number=null;
  daaate;
  categoryname = "";
  categoryId;
  constructor(
    private router : Router,
    private snackbar: MatSnackBar,
    private formBuilder: FormBuilder,
    private chainService: ChainService,
    private productshopSerivce : ProductsS2cService,
    private categoryService : CategoriesService,
    private dialog: MatDialog,
    private supplierService: SupplierS2cService,
    private datepipe: DatePipe,
    public translate: TranslateService,

  ) { 
    this.formData = new FormData();
  }

  ngOnInit() {
    this.form =  this.formBuilder.group({
      chain_id: [''],
      product_name: [''],
      cost_price: [''],
      unit_price: [''],
      tax_rate: [''],
      product_quantity: [''],
      category_id: [''],
      product_image: [''],
      barcode :[''],
      range_id :[''],
      supplier_id :[''],
      warn_quantity:[''],
      expired_date:this.daaate,
      store_id: parseInt(localStorage.getItem('store_id'))

    });

    this.ongetChainList();
    this.getCategoriesList();
    this.onGetSuppliers();

  }
  toFormData<T>(formValue: T) {
    const formData = new FormData();

    for (const key of Object.keys(formValue)) {
      const value = formValue[key];
      formData.append(key, value);
    }

    return formData;
  }

  redirectTo(uri: string) {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      this.router.navigate([uri]));
  }
  suppliersList;
  suppliers;
  onSearchChange(searchValue: string): void {  
    this.suppliers = this.suppliers.filter(supplier=>{return supplier.supplier_name.toLowerCase().indexOf(searchValue.toLowerCase())>=0})
    if(searchValue.length==0) {
      this.onGetSuppliers();
    }
  }
  filterSupplier(supp) {
    this.suppliers=this.suppliers.filter(supplier=> supplier.name.indexof(supp)>=0)
  }

  onGetSuppliers() {
    return this.supplierService.GetSuppliersListS2C().subscribe(
      res => {
        this.suppliersList = res;
        this.suppliers = this.suppliersList.data
      }, err => {
        console.log(err);;
      }
    );
  }
  ongetChainList(){
    return this.chainService.getChainList().subscribe(
      res=>{
          this.chainList = res;
          this.chainData = this.chainList.data;
          //console.log(this.chainData)
      }, err =>{
        console.log(err);
           
      }
    );
  }


  getCategoriesList() {
    this.categoryService.getCategories().subscribe(categoriesList => {
      this.categoriesList = categoriesList;
      this.categoryData=this.categoriesList.data;

      
    })
  }
   // open modals methods
   openChooseCategory() {
    let dialogRef = this.dialog.open(ChooseCategoryComponent)
    dialogRef.afterClosed().subscribe(res => {
      this.categoryId=res.data.id
      this.categoryname = res.data.category_name
      console.log(res)    })
}

  onAddProduct(expired_date){
    this.daaate= this.datepipe.transform(expired_date,'yyyy-MM-dd')
    //console.log(this.daaate);
    this.form.get('barcode').setValue(this.barC);
    this.form.get('category_id').setValue(this.categoryId);
    this.form.get('expired_date').setValue(this.daaate);
    this.formData.append('product_image', this.form.get('product_image').value);
    this.formData = this.toFormData(this.form.value);
    console.log(this.form.value);
    this.productshopSerivce.addNewProduct(this.formData).subscribe(
        res => {
          this.snackbar.open(this.translate.currentLang === 'Chinese' ? "产品已成功添加到购物车":this.translate.currentLang === 'Italian' ? "Prodotto aggiunto con successo al tuo carrello":'Product added to your cart successfully', '',{
            duration:1000
          });
          this.router.navigate(['/shop/products-list-s2c']); 
        },
      );


     

    
  } 



  getFileChange(event) {
    const fileInput = this.resultInput.nativeElement as MatInput;
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      //console.log(event.target.files[0]);
      fileInput.value = file.name;
      this.form.get('product_image').setValue(file);
      //const formData = new FormData();
      this.formData.append('product_image', this.form.get('product_image').value);
    }
  }

  bar;
  barData ;
  barC="";

  onGenerateBarcode(){
    return this.productshopSerivce.generateBarcode().subscribe(
      res=>{
        this.bar = res;
        this.barData = this.bar.data;
       this.barC=this.barData;
      }, err => {
        console.log(err);;
      }
    )
   
  }

 
}
