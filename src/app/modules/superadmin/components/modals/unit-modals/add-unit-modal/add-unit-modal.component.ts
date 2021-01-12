import { Component, OnInit, Inject } from '@angular/core';
import { UnitService } from 'src/app/shared/services/unit.service';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar, MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { CriteriaService } from 'src/app/shared/services/criteria.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-add-unit-modal',
  templateUrl: './add-unit-modal.component.html',
  styleUrls: ['./add-unit-modal.component.scss']
})
export class AddUnitModalComponent implements OnInit {
  
  currentCriteriaUnit;
  constructor(
    @Inject (MAT_DIALOG_DATA) public data: any,
    private unitService: UnitService,
    private dialogRef: MatDialogRef<AddUnitModalComponent>,
    private router: Router,
    private snackbar: MatSnackBar,
    private criteriaService: CriteriaService,
    private dialog: MatDialog,
    private translate : TranslateService
    ) { }

  ngOnInit() {
    this.currentCriteriaUnit = this.dialogRef.componentInstance.data;
     
  }

  onAddCriteriaUnit(id: number, unit: string){
    var _CriteriaUnit={
      criteria_id: id,
      units: [unit]
    }
    this.criteriaService.AddCriteriaUnit(_CriteriaUnit).subscribe(
      res=>{
        // this.redirectTo('superadmin/criterias');
        this.router.navigate(['superadmin/criterias']);

        this.dialog.closeAll();
        this.snackbar.open(this.translate.currentLang === 'Chinese' ? "条件单位已成功添加":this.translate.currentLang === 'Italian' ? "Unità di criteri aggiunta con successo":'Criteria Unit Added Successfully', '',{          duration: 2000
        });
      }
    );
  }

  redirectTo(uri:string){
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
    this.router.navigate([uri]));
  }

}
