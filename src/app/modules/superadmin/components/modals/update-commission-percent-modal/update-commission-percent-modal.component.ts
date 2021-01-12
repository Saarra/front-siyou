import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AddCommissionPercentModalComponent } from '../add-commission-percent-modal/add-commission-percent-modal.component';
import { CommissionsService } from 'src/app/shared/services/commissions.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-commission-percent-modal',
  templateUrl: './update-commission-percent-modal.component.html',
  styleUrls: ['./update-commission-percent-modal.component.scss']
})
export class UpdateCommissionPercentModalComponent implements OnInit {

  user_data : any;

  constructor(public dialogRef: MatDialogRef<AddCommissionPercentModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private commissionService : CommissionsService,
    private router : Router) { }

  ngOnInit() {
    this.user_data = this.data;
  }

  OnUpdateCommissionToSupplier(id: number, commission: any){
    const _id = id
    const _commission = commission
    const comm = 
      {
        Supplier_id: _id,
        commission
      }
      return this.commissionService.AffectCommissionToSupplier(comm).subscribe(
        res => {
          alert('Commission updated successfully to this supplier');
          this.dialogRef.close('success')
          // this.redirectTo('superadmin/affect-commission')
          this.router.navigate(['superadmin/affect-commission']);

        }, err => {
          console.log(err);
        }
      )        
    
}

redirectTo(uri:string){
  this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
  this.router.navigate([uri]));
}


}
