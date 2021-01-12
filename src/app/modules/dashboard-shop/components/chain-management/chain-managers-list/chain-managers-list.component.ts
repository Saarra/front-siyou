import { MatDialogRef, MatSnackBar } from '@angular/material';
import { Component, OnInit, Inject } from '@angular/core';
import { ChainService } from 'src/app/shared/services/chain.service';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { DialogData } from '../chains-list/chains-list.component';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-chain-managers-list',
  templateUrl: './chain-managers-list.component.html',
  styleUrls: ['./chain-managers-list.component.scss']
})
export class ChainManagersListComponent implements OnInit {
  image = "https://www.cmu.edu/chemistry/people/staff/images/no-image.png";
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private chainService: ChainService,
    private router: Router,
    private _snackBar: MatSnackBar,
    public translate: TranslateService,
    public dialogRef: MatDialogRef<ChainManagersListComponent>,
  ) { }

  ngOnInit() {
  }
  onEditManager(id) {
    this.dialogRef.close();
    this.router.navigate([`shop/edit-shopmanager/${id}`]);

    // this.redirectTo(`shop/edit-shopmanager/${id}`);

  }
  redirectTo(uri: string) {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      this.router.navigate([uri]));
  }

  onBlock(id) {
    return this.chainService.blockManager(id).subscribe(
      res => {
        this._snackBar.open(this.translate.currentLang === 'Chinese' ? "Manager Blocked Successfully" : this.translate.currentLang === 'Italian' ? "Manager Blocked Successfully" : "Manager Blocked Successfully", "OK", {
          duration: 2000,
        });
        this.dialogRef.close();

      }, err => {
        console.log(err);;
      }
    );
  }
}
