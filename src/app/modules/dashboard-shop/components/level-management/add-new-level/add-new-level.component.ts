import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog, MatSnackBar } from '@angular/material';
import { FormBuilder, Validators } from '@angular/forms';
import { LevelmembershipService } from 'src/app/shared/services/levelmembership.service';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-add-new-level',
  templateUrl: './add-new-level.component.html',
  styleUrls: ['./add-new-level.component.scss']
})
export class AddNewLevelComponent implements OnInit {
  form: any;
  formData: any;
  constructor(
    private LevelmembershipService: LevelmembershipService,
    private router: Router,
    private dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private formBuilder: FormBuilder,
    public translate: TranslateService) {
  }
  ngOnInit() {
    this.form = this.formBuilder.group({
      level_name: ['', Validators.required],
      start_point: ['', Validators.required],
      end_point: ['', Validators.required],
      description: ['', Validators.required],
      increment_point: ['', Validators.required],
    });
  }
  toFormData<T>(formValue: T) {
    const formData = new FormData();
    for (const key of Object.keys(formValue)) {
      const value = formValue[key];
      formData.append(key, value);
    }
    return formData;
  }
  onSubmit() {
    this.formData = this.toFormData(this.form.value);
    this.LevelmembershipService.AddNewLevel(this.formData).subscribe(res => {
      // this.redirectTo('/shop/level-membership-management');
      this.router.navigate(['/shop/level-membership-management']);

      this.dialog.closeAll();
      this._snackBar.open(this.translate.currentLang === 'Chinese' ? "级别已成功添加":this.translate.currentLang === 'Italian' ? "Livello aggiunto con successo":'Level Successfully Added', '',{        duration: 2000,
      });
    }, err => {
      console.log(err);;
    });
  }
  redirectTo(uri: string) {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      this.router.navigate([uri]));
  }
}
