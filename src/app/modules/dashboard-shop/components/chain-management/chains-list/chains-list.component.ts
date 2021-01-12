import { Component, OnInit, ViewChild, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { ChainService } from 'src/app/shared/services/chain.service';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog } from '@angular/material';
import { AddChainAssignManagerComponent } from '../add-chain-assign-manager/add-chain-assign-manager.component';
import { UpdateChainAssignManagerComponent } from '../update-chain-assign-manager/update-chain-assign-manager.component';
import { ChainManagersListComponent } from '../chain-managers-list/chain-managers-list.component';


export interface DialogData {
  manager: any,
  manager2: any,
  manager3: any,

}
@Component({
  selector: 'app-chains-list',
  templateUrl: './chains-list.component.html',
  styleUrls: ['./chains-list.component.scss']
})
export class ChainsListComponent implements OnInit {

  chainsList;
  chainData;

  displayedColumns = ['chain_name', 'adress', 'contact', 'manager', 'details'];
  dataSource = new MatTableDataSource<any>();

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;


  constructor(
    private chainService: ChainService,
    private dialog: MatDialog,




  ) { }

  ngOnInit() {

    this.getChainsList();
    this.dataSource.paginator = this.paginator;

  }
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }
  getChainsList() {
    return this.chainService.getChainsList().subscribe(
      res => {
        this.chainsList = res;
        this.chainData = this.chainsList.data

        this.displayedColumns = ['chain_name', 'adress', 'contact', 'manager' ,'details'];
        this.dataSource.data = this.chainData;


      }, err => {
        console.log(err);;
      }
    );
  }

  openListManagers(manager, manager2, manager3): void {
    const dialogRef = this.dialog.open(ChainManagersListComponent, {
      data: { manager: manager, manager2: manager2, manager3: manager3 }
    });
    dialogRef.afterClosed().subscribe(res => {
      this.getChainsList()
    })
  }


  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openAssignManager(data: any) {
    this.dialog.open(AddChainAssignManagerComponent, { data });

  }

  openUpdateAssignManager(data: any) {

    this.dialog.open(UpdateChainAssignManagerComponent, { data })


  }
}