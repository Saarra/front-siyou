import { Component, OnInit, Inject } from '@angular/core';
import { LevelmembershipService } from 'src/app/shared/services/levelmembership.service';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog, MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-edit-level',
  templateUrl: './edit-level.component.html',
  styleUrls: ['./edit-level.component.scss']
})
export class EditLevelComponent implements OnInit {
  currentLevel;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    private levelmembershipService: LevelmembershipService,
    private router: Router,
    private dialogRef: MatDialogRef<EditLevelComponent>,
    private dialog: MatDialog,
    private _snackBar: MatSnackBar,
    public translate: TranslateService
  ) { }
  ngOnInit() {
    this.currentLevel = this.dialogRef.componentInstance.data;
    console.log(this.currentLevel)
  }
  onEditLevel(id: number, _level_name: string, _level_start_point: number, _level_end_point: number, _level_description: string, _level_increment_point: number) {
    if (_level_name == null) {
      _level_name = this.currentLevel.level_name;
    }
    if (_level_start_point == null) {
      _level_start_point = this.currentLevel.start_point
    }
    if (_level_end_point == null) {
      _level_end_point = this.currentLevel.end_point
    }
    if (_level_description == null) {
      _level_description = this.currentLevel.description
    }
    if (_level_increment_point == null) {
      _level_increment_point = this.currentLevel.increment_point
    }
    var _level = {
      level_name: _level_name,
      start_point: _level_start_point,
      end_point: _level_end_point,
      description: _level_description,
      increment_point: _level_increment_point
    }
    this.levelmembershipService.EditLevel(_level, id).subscribe(
      res => {
        // this.redirectTo('shop/level-membership-management');
        this.router.navigate(['/shop/level-membership-management']);

        this.dialog.closeAll();
        this._snackBar.open(this.translate.currentLang === 'Chinese' ? "级别信息已成功更新":this.translate.currentLang === 'Italian' ? "Livello aggiornato con successo":'Level Successfully Updated', '',
        {
          duration: 2000,
        });
      }, err => {
        console.log(err);;
      }
    )
  }
  redirectTo(uri: string) {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      this.router.navigate([uri]));
  }
}
