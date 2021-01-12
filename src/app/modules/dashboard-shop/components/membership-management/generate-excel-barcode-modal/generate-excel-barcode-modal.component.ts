import { Component, OnInit } from '@angular/core';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';
import { ExcelService } from 'src/app/shared/services/excel.service';
import { property } from 'lodash';
import { MemberService } from 'src/app/shared/services/member.service';
import { LevelmembershipService } from 'src/app/shared/services/levelmembership.service';
import { MatDialog } from '@angular/material';
@Component({
  selector: 'app-generate-excel-barcode-modal',
  templateUrl: './generate-excel-barcode-modal.component.html',
  styleUrls: ['./generate-excel-barcode-modal.component.scss']
})
export class GenerateExcelBarcodeModalComponent implements OnInit {
  barcodes;
  barcodesData;
  _barcodes: {}[] = [];
  constructor(
    private excelService: ExcelService,
    private membershipService: MemberService,
    private levelmembershipService: LevelmembershipService,
    private dialog: MatDialog
  ) { }
  ngOnInit() {
  }
  onExportBarcode(num) {
    return this.membershipService.exportBarcode(num).subscribe(
      res => {
        this.barcodes = res;
        this.barcodesData = this.barcodes.data
        for (let barcode in this.barcodesData) {
          var bar = { Name: '', Barcode: '' };
          bar.Name = barcode;
          bar.Barcode = this.barcodesData[barcode];
          this._barcodes.push(bar);
        }
        this.dialog.closeAll();
        this.excelService.exportAsExcelFile(this._barcodes, 'sample');
      }, err => {
        console.log(err);;
      }
    )
  }
  exportAsXLSX(): void {
    this.excelService.exportAsExcelFile(this._barcodes, 'sample');
  }
}
