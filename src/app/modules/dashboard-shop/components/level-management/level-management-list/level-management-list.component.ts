import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { ChainService } from 'src/app/shared/services/chain.service';
import { LevelmembershipService } from 'src/app/shared/services/levelmembership.service';
import { DeleteLevelComponent } from '../delete-level/delete-level.component';
import { EditLevelComponent } from '../edit-level/edit-level.component';

@Component({
  selector: 'app-level-management-list',
  templateUrl: './level-management-list.component.html',
  styleUrls: ['./level-management-list.component.scss']
})
export class LevelManagementListComponent implements OnInit {

  dataSource = new MatTableDataSource();
  displayedColumns = ['level', 'start_point', 'end_point', 'description', 'increment_point', 'actions'];


  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;


  levelList;
  levelData;
  level;

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private chainService: ChainService,
    private levelmembershipService: LevelmembershipService,
  ) { }



  ngOnInit() {



    this.ongetLevelList();

    this.dataSource.paginator = this.paginator;

  }

  openAddNewLevelModal() {
    // this.dialog.open(AddNewLevelModalComponent)
  }
  
  ongetLevelList() {
    return this.levelmembershipService.getLevelList().subscribe(
      res => {

        this.levelList = res;
        this.levelData = this.levelList.data;
console.log(this.levelData)
        this.dataSource = new MatTableDataSource(this.levelData);
        this.displayedColumns = ['level', 'start_point', 'end_point', 'description', 'increment_point', 'actions'];

      

      }, err => {
        console.log(err);

      }
    );
  }
 


  openEditLevelModal(data: any) {
    
    let dialogRef = this.dialog.open(EditLevelComponent , { data });
    dialogRef.afterClosed().subscribe((res) => {
    this.ongetLevelList()
  })
}

  openDeleteLevelModal(data: any) {
    this.dialog.open(DeleteLevelComponent, { data })
  }


}
