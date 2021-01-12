import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatSnackBar, MatDialogRef } from '@angular/material';
import { BrandsService } from 'src/app/shared/services/brands.service';
import { Router } from '@angular/router';
import { ProductsService } from 'src/app/shared/services/products.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-delete-product',
  templateUrl: './delete-product.component.html',
  styleUrls: ['./delete-product.component.scss']
})
export class DeleteProductComponent implements OnInit {

  currentProduct;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private productService: ProductsService,
    private dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private router: Router,
    public translate: TranslateService,
    private dialogRef:MatDialogRef<DeleteProductComponent>
  ) { }

  ngOnInit() {

    this.currentProduct = this.dialogRef.componentInstance.data ;

  }


  onDeleteProduct(id: any){
    return this.productService.deleteProductBaseWithItem(id).subscribe(
      res=>{
        // alert('Brand Deleted Successfully');
        // this.redirectTo('dashboard/products-list');
        this.router.navigate(['dashboard/products-list']);

        this.dialog.closeAll();
        
this._snackBar.open(this.translate.currentLang === 'Chinese' ? "产品已成功删除":this.translate.currentLang === 'Italian' ? "Prodotto eliminato con successo":'Product Successfully Deleted', '',{
     
          duration: 2000,
        });
      }
    )
  }

  redirectTo(uri:string){
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
    this.router.navigate([uri]));
  }

}
