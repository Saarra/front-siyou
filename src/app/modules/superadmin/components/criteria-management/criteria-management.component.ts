import { Component, OnInit } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { CriteriaService } from 'src/app/shared/services/criteria.service';
import { MatTableDataSource, MatSnackBar, MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { DeleteCriteriaComponent } from '../modals/criteria-modals/delete-criteria/delete-criteria.component';
import { EditCriteriaComponent } from '../modals/criteria-modals/edit-criteria/edit-criteria.component';
import { EditUnitModalComponent } from '../modals/unit-modals/edit-unit-modal/edit-unit-modal.component';
import { DeleteUnitModalComponent } from '../modals/unit-modals/delete-unit-modal/delete-unit-modal.component';
import { AddUnitModalComponent } from '../modals/unit-modals/add-unit-modal/add-unit-modal.component';
import { AddCriteriaComponent } from '../modals/criteria-modals/add-criteria/add-criteria.component';
@Component({
  selector: 'app-criteria-management',
  templateUrl: './criteria-management.component.html',
  styleUrls: ['./criteria-management.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0', visibility: 'hidden' })),
      state('expanded', style({ height: '*', visibility: 'visible' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class CriteriaManagementComponent implements OnInit {
  orderList: any;
  expandedElement: null;
  orderDisplayedColumns = ['name', 'created_at', 'updated_at', 'actions'];
  criteriaList: any;
  constructor(
    private criteriaService: CriteriaService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private router: Router) { }

  ngOnInit() {
    this.onGetCriteriaList();
  }
  onGetCriteriaList(){
    return  this.criteriaService.GetCriteriaList().subscribe(
      res=>{
         this.criteriaList=res;
      }
    );
  }

  openAddCriteriaWithUnits(){
    this.dialog.open(AddCriteriaComponent)
  }

  
  openAddCriteriaUnit(data: any){
    this.dialog.open(AddUnitModalComponent, {data});
    

  }
  openEditCriteriaModal(data: any){
    this.dialog.open(EditCriteriaComponent, {data})

  }
  openDeleteCriteriaModal(data: any){
    this.dialog.open(DeleteCriteriaComponent, {data})
  }
  openEditUnitModal(data : any){
    this.dialog.open(EditUnitModalComponent, {data})

  }
  openDeleteUnitModal(data: any){
    this.dialog.open(DeleteUnitModalComponent, {data})
    
  }
}
