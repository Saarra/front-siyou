import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar, MatDialog } from '@angular/material';
import { UnitService } from 'src/app/shared/services/unit.service';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-delete-unit-modal',
  templateUrl: './delete-unit-modal.component.html',
  styleUrls: ['./delete-unit-modal.component.scss']
})
export class DeleteUnitModalComponent implements OnInit {

  currentCriteriaUnit;

  constructor(
    @Inject (MAT_DIALOG_DATA) public data: any,
    private unitService: UnitService,
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<DeleteUnitModalComponent>,
    private snackbar: MatSnackBar,
    private router: Router,
    private translate : TranslateService
    
    ) { }

  ngOnInit() {
    this.currentCriteriaUnit = this.dialogRef.componentInstance.data;
  }

  onDeleteUnit(id: number){
    return this.unitService.DeleteUnit(id).subscribe(
      res=>{
        //  this.redirectTo('superadmin/criterias');
         this.router.navigate(['superadmin/criterias']);

         this.dialog.closeAll();
         this.snackbar.open(this.translate.currentLang === 'Chinese' ? "条件单位已成功删除":this.translate.currentLang === 'Italian' ? "Unità di criteri eliminata correttamente":'Criteria Unit Deleted Successfully', '',{           duration: 2000
         });

      }, err=>{
        console.log(err);;
      }
    );
  }

  redirectTo(uri:string){
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
    this.router.navigate([uri]));
  }

}
