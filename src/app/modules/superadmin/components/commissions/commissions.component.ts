import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import {  MatPaginator, MatSort } from '@angular/material';
import { CommissionsService } from 'src/app/shared/services/commissions.service';
import { DataSource } from '@angular/cdk/table';
import { Observable } from 'rxjs/Observable';
import { Commission } from 'src/app/shared/models/commission.model';


@Component({
  selector: 'app-commissions',
  templateUrl: './commissions.component.html',
  styleUrls: ['./commissions.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class CommissionsComponent implements OnInit {

  dataSource = new allCommissionsDatasource(this.commissionService);
  //dataSource = MatMatTableDataSource(Salesmanager)
  displayedColumns = ['commission_date', 'commission_amount', 'commission_percent', 'first_name', 'last_name','email', 'Deposit', 'Deposit_rest'];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  commission;
  sum_com = 0;
  sum_com_order = 0;
  sum_order_price = 0;
  num_com = 0;
  sum_deposit =0;
  sum_deposit_rest = 0;


  constructor(
    // private dialog: MatDialog ,private dialog1: MatDialog,
    private commissionService: CommissionsService,
    private changeDetectorRefs: ChangeDetectorRef
  ) {


  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  ngOnInit() {

    this.commissionService.getallCommissions().subscribe(res => {
      this.commission = res;

      for (let com of this.commission) {
        this.num_com += 1;
        this.sum_com += com.commission_amount;
        this.sum_deposit +=com.Deposit;
        this.sum_deposit_rest+=com.Deposit_rest;
        if (com.order != null) {
          // for( let ord of com.order){
          if (com.order != null) {
            this.sum_com_order += com.order.commission;
            this.sum_order_price += com.order.order_price;
          }
        }

        // }


      }
      this.changeDetectorRefs.markForCheck();

    }, err => {
      console.log(err);;

    })
    this.dataSource.paginator = this.paginator;

  }



}



export class allCommissionsDatasource extends DataSource<any>{
  paginator: MatPaginator;
  sort: MatSort;
  filter: string;


  constructor(private commissionService: CommissionsService) {

    super();

  }
  connect(): Observable<Commission[]> {
    return this.commissionService.getallCommissions();
  }
  disconnect() { };
}



