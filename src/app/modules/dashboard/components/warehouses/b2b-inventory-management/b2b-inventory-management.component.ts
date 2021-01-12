import { Component, OnInit } from '@angular/core';
import { WarhouseService } from 'src/app/shared/services/warhouse.service';
import { MatTableDataSource } from '@angular/material';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { SupplierService } from 'src/app/shared/services/supplier.service';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-b2b-inventory-management',
  templateUrl: './b2b-inventory-management.component.html',
  styleUrls: ['./b2b-inventory-management.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed, void', style({ height: '0px', minHeight: '0', display: 'none' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
      transition('expanded <=> void', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)'))
    ])
  ],
})
export class B2bInventoryManagementComponent implements OnInit {
  inventoriesList;
  inventoriesData;
  invList;
  warehousesList;
  warehousesData;
  warehouse_id
  chainData;
  invenOp;
  invenVer;
  statusList;
  status;
  operator_status;
  verifier_status;
  expandedElement: null;
  displayedColumns = ['batch_number', 'suppliers','operator_status', 'date', 'products', 'actions'];
  dataSource = new MatTableDataSource<any>(this.inventoriesData);
  constructor(
    private warehouseService: WarhouseService,
    private router: Router,
    private supplierService : SupplierService
    ) { }

  ngOnInit() {
    this.onGetWarehousesesList();
    this.onGetInventoriesList(this.warehouse_id);
    this.onGetStatusList();
    this.onGetSuppliersList();
  }
 
  onGetInventoriesList(warehouse_id) {
    return this.warehouseService.GetInventoriesListB2B(warehouse_id).subscribe(
      res => {

        this.inventoriesList = res;
        this.inventoriesData = this.inventoriesList.data;
        //console.log(this.inventoriesData)
        this.dataSource = new MatTableDataSource<any>(this.inventoriesData);    
        this.displayedColumns = ['batch_number', 'suppliers','operator_status', 'date', 'products', 'actions'];

        
      }, err => {
        console.log(err);;
      }
    );
  }
  onGetWarehousesesList() {
    return this.warehouseService.GetWarehousesesListB2B().subscribe(
      res => {
        this.warehousesList = res;
        //console.log(this.warehousesList)
        this.warehousesData = this.warehousesList.data;
        this.displayedColumns = ['batch_number','suppliers','operator_status', 'date', 'products', 'actions'];

      }, err => {
        console.log(err);;
      }
    );
  }
  onGetWarehousesesListbysupplier(warehouse_id,supplier_id?){
    if (supplier_id == 0 || !supplier_id) {
      supplier_id = '';
    }
    if (warehouse_id == 0 || !warehouse_id) {
      warehouse_id = '';
    }
    return this.warehouseService.GetInventoriesListBySupp(warehouse_id,supplier_id).subscribe(
      res => {
        this.invenVer = res;
        this.inventoriesData = this.invenVer.data;
        this.dataSource = new MatTableDataSource<any>(this.inventoriesData);    
        this.displayedColumns = ['batch_number','suppliers','operator_status', 'date', 'products', 'actions'];
      }, err => {
        console.log(err);;
      }
    );
  }

  supp;
  suppList;
  onGetSuppliersList() {
    return this.supplierService.getSupplierList().subscribe(
      res => {
        this.supp = res;
      }, err => {
        console.log(err);;
      }
    );
  }
  onGetStatusList() {
    return this.warehouseService.GetStatusListB2B().subscribe(
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
    // this.redirectTo(`inventory/${id}`);
    this.router.navigate([`inventory/${id}`]);

  }



  updateInv(id: any) {
    // this.redirectTo(`inventory/edit-inventory/${id}`);
    this.router.navigate([`inventory/edit-inventory/${id}`]);

  }

  



  onGetInventoryByBatch(warehouse_id,batch) {
    if (batch == 0 || !batch) {
      batch = '';
    }
    if (warehouse_id == 0 || !warehouse_id) {
      warehouse_id = '';
    }
    return this.warehouseService.GetInventoriesListByBatch(warehouse_id,batch).subscribe(
      res => {
        this.invenVer = res;
        this.inventoriesData = this.invenVer.data;
        this.displayedColumns = ['batch_number','suppliers','operator_status', 'date', 'products', 'actions'];
        this.dataSource = new MatTableDataSource<any>(this.inventoriesData);    

      }, err => {
        console.log(err);;
      }
    );

  }
}


