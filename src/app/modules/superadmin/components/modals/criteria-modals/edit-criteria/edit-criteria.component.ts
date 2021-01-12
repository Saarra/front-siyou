import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatSnackBar, MatDialogRef } from '@angular/material';
import { CriteriaService } from 'src/app/shared/services/criteria.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-criteria',
  templateUrl: './edit-criteria.component.html',
  styleUrls: ['./edit-criteria.component.scss']
})
export class EditCriteriaComponent implements OnInit {

  currentCriteria;
  units = [];


  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private criteriaService: CriteriaService,
    private router: Router,
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<EditCriteriaComponent>,
    private snackbar: MatSnackBar

  ) { }

  ngOnInit() {
    this.currentCriteria = this.dialogRef.componentInstance.data;
  }

  PushUnit(data: string) {
    this.units.push(data)
   
  }

  onEditCriteria(id: number, _criteria_name: string) {

   var _criteria={
    criteria_name: _criteria_name
    }
    
    return this.criteriaService.UpdateCriteria(id, _criteria).subscribe(
      res => {
        // this.redirectTo('superadmin/criterias');
        this.router.navigate(['superadmin/criterias']);

        this.dialog.closeAll();
        this.snackbar.open('Criteria Updated Successfully', 'OK', {
          duration: 2000
        });
      }
    );

  }

  redirectTo(uri: string) {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      this.router.navigate([uri]));
  }

}
