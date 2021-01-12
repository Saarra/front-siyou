import { Component, OnInit, ViewChild } from '@angular/core';
import { ChainService } from 'src/app/shared/services/chain.service';
import { MatPaginator, MatSort, MatTableDataSource, MatSnackBar } from '@angular/material';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-warehouse',
  templateUrl: './warehouse.component.html',
  styleUrls: ['./warehouse.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed, void', style({ height: '0px', minHeight: '0', display: 'none' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
      transition('expanded <=> void', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)'))
    ])
  ],
})
export class WarehouseComponent implements OnInit {
  chainList;
  chainData = [];
  expandedElement: null;
  currentId;

  dataSource = new MatTableDataSource<any>(this.chainData);
  displayedColumns: string[] = ['name','adress','close_hours','open_hours','number','warehouse'];

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private chainService: ChainService,
    private router: Router) {}

  ngOnInit() {
    this.ongetChainList();

  }
  ongetChainList() {
    return this.chainService.getChainList().subscribe(
      res => {
        this.chainList = res;
        this.chainData = this.chainList.data;
        this.dataSource = new MatTableDataSource<any>(this.chainData);

      }, err => {
        console.log(err);

      }
    );
  }
  openAddWarehouse(id: any) {
    // this.redirectTo(`shop/warehouses/add-warehouse/${id}`);
    this.router.navigate([`shop/warehouses/add-warehouse/${id}`]);

  }
  
  redirectTo(uri: string) {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      this.router.navigate([uri]));
  }

}
