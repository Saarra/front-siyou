
import { Component, OnInit } from '@angular/core';
import { WarhouseService } from 'src/app/shared/services/warhouse.service';
import { ActivatedRoute } from '@angular/router';
import * as XLSX from 'xlsx';
import { Router } from '@angular/router';
import { ExcelService } from 'src/app/shared/services/excel.service';

@Component({
  selector: 'app-inventory-full-details',
  templateUrl: './inventory-full-details.component.html',
  styleUrls: ['./inventory-full-details.component.scss']
})
export class InventoryFullDetailsComponent implements OnInit {
  currentId;
  currentInventory;
  currentData;
  inventoryList;
  inventoryData;
  constructor(
    private warehouseService: WarhouseService,
    private router: ActivatedRoute,
    private excelService: ExcelService,
    private route: Router

  ) {
    router.params.subscribe(params => {
      this.currentId = params.id;
    })
  }

  ngOnInit() {
    this.onGetInventoryById();
    this.onexportAsExcelFile();

  }
  onGetInventoryById() {
    return this.warehouseService.getInventoryById(this.currentId).subscribe(
      res => {
        this.currentInventory = res;
        this.currentData = this.currentInventory.data[0];
      //console.log(this.currentData)
      },
      err => {
        console.log(err);;
      }
    );
  }
  fileName = 'ExcelSheet.xlsx';

  exportexcel(): void {
    /* table id is passed over here */
    let element = document.getElementById('excel-table');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, this.fileName,{compression:true});


  }
  _inventory: {}[] = [];
  inv = {Batch_number:'',Supplier:'' , Inventory_Status: '', Warehouse: ''}; ;
  onexportAsExcelFile() {
   
       this._inventory = [];
       this.inv.Batch_number = this.currentData.batch_number;
       this.inv.Supplier = this.currentData.suppliers.supplier_name;
       this.inv.Inventory_Status = this.currentData.inventory_status;
       this.inv.Warehouse = this.currentData.warehouse.name;
        this._inventory.push(this.inv);
        for(let prod in this.currentData.products){
          var inv ={Product_Name:'',Product_Barcode:''};
          inv.Product_Name = this.currentData.products[prod].product_name;
          inv.Product_Barcode = this.currentData.products[prod].product_barcode;
          this._inventory.push(inv)

        }
      this.excelService.exportAsExcelFile(this._inventory, 'Inventory');

  }




  


  updateInv() {
    // this.redirectTo(`shop/inventory/update-inventory/${this.currentId}`);
    this.route.navigate([`/shop/inventory/update-inventory/${this.currentId}`]);

  }
  redirectTo(uri: string) {
    this.route.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      this.route.navigate([uri]));
  }


}