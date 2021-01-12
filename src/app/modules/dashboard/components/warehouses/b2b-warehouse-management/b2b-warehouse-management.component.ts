import { Component, OnInit, ViewChild } from '@angular/core';
import { ChainService } from 'src/app/shared/services/chain.service';
import { MatPaginator, MatSort, MatTableDataSource, MatSnackBar } from '@angular/material';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Router, ActivatedRoute } from '@angular/router';
import { WarhouseService } from 'src/app/shared/services/warhouse.service';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-b2b-warehouse-management',
  templateUrl: './b2b-warehouse-management.component.html',
  styleUrls: ['./b2b-warehouse-management.component.scss']
})
export class B2bWarehouseManagementComponent implements OnInit {
  chainList;
  chainData = [];
  expandedElement: null;
  currentId;

  dataSource = new MatTableDataSource<any>(this.chainData);
  displayedColumns: string[] = ['name','first_responsible','second_responsible','actions'];

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private warehouseService : WarhouseService,
    private _snackBar: MatSnackBar,
    private router: Router,
    public translate: TranslateService,
    ) {}

  ngOnInit() {
    this.ongetWarehouseList();

  }
  warehouses;
  ongetWarehouseList() {
    return this.warehouseService.GetWarehousesesListB2B().subscribe(
      res => {
        this.chainList = res;
        this.warehouses= this.chainList.data
        //console.log(this.warehouses)
        this.dataSource = new MatTableDataSource<any>(this.warehouses);
        this.displayedColumns= ['name','first_responsible','second_responsible','actions'];

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

  onDelete(id){
    return this.warehouseService.deleteWarehouse(id).subscribe( res => {
      // this.redirectTo('warehouse-management');
      this.router.navigate(['warehouse-management']);

      this._snackBar.open(this.translate.currentLang === 'Chinese' ? "仓库已成功删除":this.translate.currentLang === 'Italian' ? "Magazzino eliminato con successo":'Warehouse Successfully Deleted', '',{        duration: 2000,
        });
this.ongetWarehouseList();
    })
  }
}
