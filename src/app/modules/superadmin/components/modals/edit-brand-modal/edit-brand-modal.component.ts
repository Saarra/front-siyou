import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog, MatSnackBar } from '@angular/material';
import { BrandsService } from 'src/app/shared/services/brands.service';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-edit-brand-modal',
  templateUrl: './edit-brand-modal.component.html',
  styleUrls: ['./edit-brand-modal.component.scss']
})
export class EditBrandModalComponent implements OnInit {
     
  currentBrand;
     
    constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    private brandService: BrandsService,
    private router: Router,
    private dialogRef: MatDialogRef<EditBrandModalComponent>,
    private dialog : MatDialog,
    private _snackBar: MatSnackBar,
    public translate: TranslateService
    ) { }

  ngOnInit() {
    this.currentBrand = this.dialogRef.componentInstance.data;
  }
  onEditBrand(_brand_id: number,_brand_name:string, _brand_logo:string){
    var _brand={
      // brand_id: _brand_id,
      brand_name: _brand_name,
      brand_logo: _brand_logo
    }
    this.brandService.EditBrand(_brand, _brand_id).subscribe(
      res =>{
        // alert('Brand Updated Successfully');
        // this.redirectTo('superadmin/brands');
        this.router.navigate(['superadmin/brands']);

        this.dialog.closeAll();
        this._snackBar.open(this.translate.currentLang === 'Chinese' ? "品牌信息已成功更新":this.translate.currentLang === 'Italian' ? "Brand aggiornato con successo":'Brand Successfully Updated', '',{ 
                   duration: 2000,

        });

      },err=>{
        console.log(err);;
      }
    )
  }
  redirectTo(uri:string){
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
    this.router.navigate([uri]));
  }

}
