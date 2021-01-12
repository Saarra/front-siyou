import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { UnitService } from 'src/app/shared/services/unit.service';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog, MatSnackBar } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-edit-unit-modal',
  templateUrl: './edit-unit-modal.component.html',
  styleUrls: ['./edit-unit-modal.component.scss']
})
export class EditUnitModalComponent implements OnInit {

  currentCriteriaUnit;

  constructor(
    @Inject (MAT_DIALOG_DATA) public data: any,
    private router: Router,
    private unitService: UnitService,
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<EditUnitModalComponent>,
    private snackbar: MatSnackBar,
    private translate : TranslateService
  ) { }

  ngOnInit() {
    this.currentCriteriaUnit = this.dialogRef.componentInstance.data;
  }

  onEditCriteriaUnit(id : number, data: string){
    var _unit_name= {unit_name: data};
    return  this.unitService.UpdateUnit(id, _unit_name).subscribe(
      res=>{
        // this.redirectTo('superadmin/criterias');
        this.router.navigate(['superadmin/criterias']);

        this.dialog.closeAll();
        this.snackbar.open(this.translate.currentLang === 'Chinese' ? "条件单位已成功更新":this.translate.currentLang === 'Italian' ? "Unità criteri aggiornata correttamente":'Criteria Unit Updated Successfully', '',{          duration: 2000
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
