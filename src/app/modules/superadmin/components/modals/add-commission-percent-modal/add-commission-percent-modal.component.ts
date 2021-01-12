import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CommissionsService } from 'src/app/shared/services/commissions.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-commission-percent-modal',
  templateUrl: './add-commission-percent-modal.component.html',
  styleUrls: ['./add-commission-percent-modal.component.scss']
})
export class AddCommissionPercentModalComponent implements OnInit {

  user_data : any;

  constructor(public dialogRef: MatDialogRef<AddCommissionPercentModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private commissionService : CommissionsService,
    private router : Router) { }

  ngOnInit() {
    this.user_data = this.data;
  }

  OnAffectCommissionToSupplier(id: number, commission: any){
      const _id = id
      const _commission = commission
      const comm = 
        {
          Supplier_id: _id,
          commission
        }
        return this.commissionService.AffectCommissionToSupplier(comm).subscribe(
          res => {
            alert('Commission affected successfully to this supplier');
            this.dialogRef.close('success')
            // this.redirectTo('superadmin/affect-commission')
            this.router.navigate(['superadmin/brands']);

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
