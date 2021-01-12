import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatSnackBar, MatDialogRef } from '@angular/material';
import { ProductsService } from 'src/app/shared/services/products.service';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-delete-product-item',
  templateUrl: './delete-product-item.component.html',
  styleUrls: ['./delete-product-item.component.scss']
})
export class DeleteProductItemComponent implements OnInit {

  currentProduct;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private productService: ProductsService,
    private dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private router: Router,
    public translate: TranslateService,
    private dialogRef:MatDialogRef<DeleteProductItemComponent>
  ) { }

  ngOnInit() {

    this.currentProduct = this.dialogRef.componentInstance.data ;
  }

  
  onDeleteProductItem(id: any){
    return this.productService.deleteProductItemOnly(id).subscribe(
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
