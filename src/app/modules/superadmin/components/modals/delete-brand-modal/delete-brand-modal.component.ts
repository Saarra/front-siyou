import { Component, OnInit, Inject } from '@angular/core';
import { BrandsService } from 'src/app/shared/services/brands.service';
import { MatDialog, MatSnackBar, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-delete-brand-modal',
  templateUrl: './delete-brand-modal.component.html',
  styleUrls: ['./delete-brand-modal.component.scss']
})
export class DeleteBrandModalComponent implements OnInit {
  
  currentBrand ;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private brandService: BrandsService,
    private dialog: MatDialog,
    private _snackBar: MatSnackBar,
    public translate: TranslateService,
    private router: Router,
    private dialogRef:MatDialogRef<DeleteBrandModalComponent>) { }

  ngOnInit() {
      this.currentBrand = this.dialogRef.componentInstance.data ;
  }

  onDeleteBrand(id: any){
    return this.brandService.DeleteBrand(id).subscribe(
      res=>{
        // this.redirectTo('superadmin/brands');
        this.router.navigate(['superadmin/brands']);

        this.dialog.closeAll();

        this._snackBar.open(this.translate.currentLang === 'Chinese' ? "品牌已成功删除":this.translate.currentLang === 'Italian' ? "Brand eliminato con successo":'Brand Successfully Deleted', '',{
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
