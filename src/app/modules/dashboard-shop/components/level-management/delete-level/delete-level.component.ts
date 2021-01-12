import { Component, OnInit, Inject } from '@angular/core';
import { LevelmembershipService } from 'src/app/shared/services/levelmembership.service';
import { MAT_DIALOG_DATA, MatDialog, MatSnackBar, MatDialogRef } from '@angular/material';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-delete-level',
  templateUrl: './delete-level.component.html',
  styleUrls: ['./delete-level.component.scss']
})
export class DeleteLevelComponent implements OnInit {

  
  currentLevel ;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private levelmembershipService : LevelmembershipService,
    private dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private router: Router,
    public translate: TranslateService,
    private dialogRef:MatDialogRef<DeleteLevelComponent>) { }

  ngOnInit() {
      this.currentLevel = this.dialogRef.componentInstance.data ;
  }

  onDeleteLevel(id: any){
    return this.levelmembershipService.DeleteLevel(id).subscribe(
      res=>{
        // alert('Level Deleted Successfully');
        // this.redirectTo('shop/level-membership-management');
        this.router.navigate(['/shop/level-membership-management']);

        //console.log(id);
        this.dialog.closeAll();
        this._snackBar.open(this.translate.currentLang === 'Chinese' ? "级别已成功删除":this.translate.currentLang === 'Italian' ? "Livello eliminato con successo":'Level Successfully Deleted', '',{          duration: 2000,
        });
      }
    )
  }
  redirectTo(uri:string){
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
    this.router.navigate([uri]));
  }

}

