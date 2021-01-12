import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { CriteriaService } from 'src/app/shared/services/criteria.service';
import { MatDialogRef, MatSnackBar, MAT_DIALOG_DATA, MatDialog } from '@angular/material';

@Component({
  selector: 'app-delete-criteria',
  templateUrl: './delete-criteria.component.html',
  styleUrls: ['./delete-criteria.component.scss']
})
export class DeleteCriteriaComponent implements OnInit {
  currentCriteria;

  constructor(
    @Inject (MAT_DIALOG_DATA) public data: any,
    private router: Router,
    private criteriaService: CriteriaService,
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<DeleteCriteriaComponent>,
    private snackbar: MatSnackBar
  ) { }

  ngOnInit() {
    this.currentCriteria = this.dialogRef.componentInstance.data;
  }

  onDeleteCriteria(id : number){
    return  this.criteriaService.deleteCriteria(id).subscribe(
      res=>{
        // this.redirectTo('superadmin/criterias');
        this.router.navigate(['superadmin/criterias']);

        this.dialog.closeAll();
        this.snackbar.open('Criteria Successfully Deleted', 'OK', {
          duration: 2000
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
