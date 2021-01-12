import { Component, OnInit } from '@angular/core';
import { CriteriaService } from 'src/app/shared/services/criteria.service';
import { Router } from '@angular/router';
import { MatDialog, MatSnackBar } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-add-criteria',
  templateUrl: './add-criteria.component.html',
  styleUrls: ['./add-criteria.component.scss']
})
export class AddCriteriaComponent implements OnInit {
  units = [];
  constructor(
    private criteriaService: CriteriaService,
    private router: Router,
    private dialog: MatDialog,
    private snackbar: MatSnackBar,
    private translate : TranslateService
  ) { }
  ngOnInit() {
    this.units;
  }
  PushUnit(data: string) {
    this.units.push(data)
    //console.log(this.units)
  }
  onAddCriteriasWithUnits(_criteria_name: string, _units) {
    var units = {
      criteria_name: _criteria_name,
      units: _units
    }
    return this.criteriaService.AddCriteriaWithUnits(units).subscribe(
      res => {
        // this.redirectTo('superadmin/criterias');
        this.router.navigate(['superadmin/criterias']);

        this.dialog.closeAll();
        this.snackbar.open(this.translate.currentLang === 'Chinese' ? "条件已成功添加":this.translate.currentLang === 'Italian' ? "Criteri aggiunti con successo":'Criteria Added Successfully', '',{
          duration: 2000
        });
      }, err => {
        console.log(err);;
      }
    );
  }
  redirectTo(uri: string) {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      this.router.navigate([uri]));
  }
}
