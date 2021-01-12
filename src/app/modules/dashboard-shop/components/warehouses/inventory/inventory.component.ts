import { Component, OnInit,AfterViewInit ,ViewChild} from '@angular/core';
import { WarhouseService } from 'src/app/shared/services/warhouse.service';
import { MatTableDataSource, MatPaginator, MatSort  } from '@angular/material';
import { ChainService } from 'src/app/shared/services/chain.service';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { SupplierS2cService } from 'src/app/shared/services/supplier-s2c.service';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed, void', style({ height: '0px', minHeight: '0', display: 'none' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
      transition('expanded <=> void', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)'))
    ])
  ],
})
export class InventoryComponent implements OnInit , AfterViewInit   {
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  inventoriesList;
  inventoriesData = [];
  invList;
  chain_id = localStorage.getItem('chainInit');
  warehousesList;
  warehousesData;
  chain;
  warehouse_id
  chainData;
  invenOp;
  invenVer;
  statusList;
  status;
  operator_status;
  verifier_status;
  expandedElement: null;
  displayedColumns = ['batch_number', 'operator_status', 'date', 'products', 'actions'];
  dataSource = new MatTableDataSource<any>(this.inventoriesData);
  constructor(
    private warehouseService: WarhouseService,
    private chainService: ChainService,
    private router: Router,
    private supplierS2cService: SupplierS2cService
  ) { }

  ngOnInit() {
    this.onGetWarehousesesList(this.chain_id);
   this.onGetInventoriesList(this.warhouseID);
    this.onGetChainList();
    this.onGetStatusList();
    this.onGetSuppliersList();
    this.dataSource.paginator = this.paginator;

  }
  ngAfterViewInit(){
   this.dataSource.sort = this.sort;
   }
  inventories = [];

  onGetInventoriesList(warehouse_id) {
    return this.warehouseService.GetInventoriesList(warehouse_id).subscribe(
      res => {

        this.inventoriesList = res;
        this.inventoriesList.data.forEach(element => {
          if (element.inventory_status  == 'pending') {
            this.inventories.push(element)
          }
          
        });
        this.dataSource.data = this.inventories;
        this.displayedColumns = ['batch_number', 'operator_status', 'date', 'products', 'actions'];


      }, err => {
        console.log(err);;
      }
    );
  }
  warhouseID
  onGetWarehousesesList(chain_id) {
    return this.warehouseService.GetWarehousesesList(chain_id).subscribe(
      res => {
        this.warehousesList = res;
        this.warehousesData = this.warehousesList.data;
        //console.log(this.warehousesData)
        this.warhouseID=this.warehousesData[0].id
        this.onGetInventoriesList(this.warhouseID)
      }, err => {
        console.log(err);;
      }
    );
  }
  onGetWarehousesesListbysupplier(warehouse_id, supplier_id?) {
    if (supplier_id == 0 || !supplier_id) {
      supplier_id = '';
    }
    if (warehouse_id == 0 || !warehouse_id) {
      warehouse_id = '';
    }
    return this.warehouseService.GetInventoriesListBySupp(warehouse_id, supplier_id).subscribe(
      res => {
        this.invenVer = res;
        this.inventoriesData = this.invenVer.data;
        this.dataSource = new MatTableDataSource<any>(this.inventoriesData);
        this.displayedColumns = ['batch_number', 'operator_status', 'date', 'products', 'actions'];
      }, err => {
        console.log(err);;
      }
    );
  }

  onGetChainList() {

    return this.chainService.getChainList().subscribe(
      res => {
        this.chain = res;
        this.chainData = this.chain.data

      }, err => {
        console.log(err);;
      }
    );

  }
  supp;
  suppList;
  onGetSuppliersList() {
    return this.supplierS2cService.GetSuppliersListS2C().subscribe(
      res => {
        this.supp = res;
        this.suppList = this.supp.data;
      }, err => {
        console.log(err);;
      }
    );
  }
  onGetStatusList() {
    return this.warehouseService.GetStatusList().subscribe(
      res => {

        this.status = res;
        this.statusList = this.status.data;


      }, err => {
        console.log(err);;
      }
    );
  }


  redirectTo(uri: string) {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      this.router.navigate([uri]));
  }



  openInventoryFullDetails(id: any) {
    // this.redirectTo(`shop/inventory/inventory-full-detail/${id}`);
    this.router.navigate([`shop/inventory/inventory-full-detail/${id}`]);

  }



  updateInv(id: any) {
    this.router.navigate([`shop/inventory/update-inventory/${id}`]);

    // this.redirectTo(`shop/inventory/update-inventory/${id}`);
  }

inventoryBatch;
  onAddBatchInventory(batchNum) {
    var batch = {
      batch_number : batchNum
    }
    return this.warehouseService.getByBatch(batch).subscribe(
      res => {
        this.inventoriesList = res;
        this.inventoriesData = this.inventoriesList.data;
        this.dataSource = new MatTableDataSource<any>(this.inventoriesData);
        this.displayedColumns = ['batch_number', 'operator_status', 'date', 'products', 'actions'];
      }, err => {
        console.log(err);;
      }
    );;
  }
}

