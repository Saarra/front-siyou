import { Component, OnInit } from '@angular/core';
import { WarhouseService } from 'src/app/shared/services/warhouse.service';
import { ActivatedRoute } from '@angular/router';
import * as XLSX from 'xlsx';
import { Router } from '@angular/router';
import { ExcelService } from 'src/app/shared/services/excel.service';
@Component({
  selector: 'app-b2b-inventory-full-details',
  templateUrl: './b2b-inventory-full-details.component.html',
  styleUrls: ['./b2b-inventory-full-details.component.scss']
})
export class B2bInventoryFullDetailsComponent implements OnInit {
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
  }
  onGetInventoryById() {
    return this.warehouseService.getInventoryByIdB2B(this.currentId).subscribe(
      res => {
        this.currentInventory = res;
        this.currentData = this.currentInventory.data[0];
      },
      err => {
        console.log(err);;
      }
    );
  }
  fileName = 'ExcelSheet.xlsx';
  exportexcel(): void {
    let element = document.getElementById('excel-table');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, this.fileName, {compression:true});
  }
  _inventory: {}[] = [];
  onexportAsExcelFile() {
    return this.warehouseService.getInventoryById(this.currentId).subscribe(
      res => {
        this.inventoryList = res;
        this.inventoryData = this.inventoryList.data[0];
        for (var inven in this.inventoryData) {
          var inv: [string, string, number?, string?, string?, number?, number?];
          inv = [inven,
            this.inventoryData[inven]]
          if (!(inv[0] == "products") && (!(inv[0] == "warehouse"))) {
            inv[2] = null;
            inv[3] = ""
            inv[4] = null;
            inv[5] = null;
            inv[6] = null;
          }
          else if (inv[0] == "products") {
            var produit: number = 0;
            while (produit <= this.inventoryData.products.length) {
              inv = [`product n${produit + 1}`,
              this.inventoryData.products[produit].id,
              this.inventoryData.products[produit].product_name,
              this.inventoryData.products[produit].product_barcode,
              this.inventoryData.products[produit].pivot.arrived_quantity,
              this.inventoryData.products[produit].pivot.total_quantity
              ]
              produit++;
              this._inventory.push(inv);
            }
          }
          else if (inv[0] == "warehouse") {
            inv = [`warehouse`,
              this.inventoryData.warehouse.name,
              this.inventoryData.description,
              this.inventoryData.warehouse.first_responsible,
              this.inventoryData.warehouse.seconde_responsible,
              this.inventoryData.warehouse.email
            ]
          }
          this._inventory.push(inv);
        }
        this._inventory.push(inv);
      }
      , err => {
        console.log(err);;
      }
    )
  }
  exportAsXLSX(): void {
    this.excelService.exportAsExcelFile(this._inventory, 'inventory');
  }
  updateInv() {
    // this.redirectTo(`shop/inventory/update-inventory/${this.currentId}`);
    this.route.navigate([`shop/inventory/update-inventory/${this.currentId}`]);

  }
  redirectTo(uri: string) {
    this.route.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      this.route.navigate([uri]));
  }
}
