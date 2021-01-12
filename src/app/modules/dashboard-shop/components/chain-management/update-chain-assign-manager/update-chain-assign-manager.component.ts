import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatSnackBar, MatDialogRef } from '@angular/material';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ShopmanagerService } from 'src/app/shared/services/shopmanager.service';

@Component({
  selector: 'app-update-chain-assign-manager',
  templateUrl: './update-chain-assign-manager.component.html',
  styleUrls: ['./update-chain-assign-manager.component.scss']
})
export class UpdateChainAssignManagerComponent implements OnInit {

  currentChain;
  managers;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private router: Router,
    public translate: TranslateService,
    private dialog: MatDialog,
    private snackbar: MatSnackBar,
    private shopManagerService: ShopmanagerService,
    private dialogRef: MatDialogRef<UpdateChainAssignManagerComponent>
  ) { }

  ngOnInit() {
     
      this.currentChain = this.dialogRef.componentInstance.data;
    this.onGetShopManagersList();

  }
  managersData;
  onGetShopManagersList() {
    return this.shopManagerService.getShopmangerList().subscribe(
      res => {
        this.managers = res;
        this.managersData= this.managers.data

      }, err => {
        console.log(err);;
      }
    )
  }

  redirectTo(uri: string) {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      this.router.navigate([uri]));
  }

  
  submit(_chain_id, _manager_id) {
    return this.shopManagerService.assignRelation(_chain_id, _manager_id).subscribe(
      res => {
        console.log(res);
        this.router.navigate(['shop/chains-list']);
        this.dialog.closeAll();
        this.snackbar.open(this.translate.currentLang === 'Chinese' ? "店铺经理已成功添加":this.translate.currentLang === 'Italian' ? 'Manager assegnato con successo':"Manager Updated Successfully", '', {

          duration: 2000
        });
      }, err => {
        console.log(err);;
      }
    )

  }


}
