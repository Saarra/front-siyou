import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog } from '@angular/material';
import { MemberService } from 'src/app/shared/services/member.service';
import { AddNewMemberComponent } from '../add-new-member/add-new-member.component';
import { LevelmembershipService } from 'src/app/shared/services/levelmembership.service';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';
import { MatSnackBar } from '@angular/material';
import { ExcelService } from 'src/app/shared/services/excel.service';
import { property } from 'lodash';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { GenerateExcelBarcodeModalComponent } from './generate-excel-barcode-modal/generate-excel-barcode-modal.component';
import { TranslateService } from '@ngx-translate/core';
import { PagerService } from "src/app/shared/services/pager.service";

@Component({
  selector: 'app-membership-management',
  templateUrl: './membership-management.component.html',
  styleUrls: ['./membership-management.component.scss']
})
export class MembershipManagementComponent implements OnInit {
  dataSource = new MatTableDataSource();
  displayedColumns = ['memberName', 'card_num', 'email', 'contact', 'points', 'date', 'level'];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  memberList;
  memberData;
  member;
  levelList;
  levelData;
  barcodes;
  barcodesData;
  memberLength;
  allItems;
  page: number = 1;
  pager: any = {};
  pager2 : any = {};
  numInit = 10;
  constructor(
    private router: Router,
    private dialog: MatDialog,
    private membershipService: MemberService,
    private levelmembershipService: LevelmembershipService,
    private snackBar: MatSnackBar,
    private excelService: ExcelService,
    public translate: TranslateService,
    private http: HttpClient,
    private pagerService: PagerService,


  ) { }
  ngOnInit() {
    this.ongetMemberList(this.page);
    this.ongetLevelList();

    this.onExportBarcode(this.numInit);


    this.http.get(`${environment.BaseUrlS2C}/Member`, {
      params: {
        token: localStorage.getItem('token'),
      }
    }).subscribe(data => {
      // set items to json response
      this.allItems = data;
      this.memberLength= this.allItems.total;
      this.pager = this.pagerService.getPager(this.memberLength, 1);

    })
  }
  openAddNewMemberModal() {
  }
  openGenerateBarcodeModal() {
    this.dialog.open(GenerateExcelBarcodeModalComponent);
  }
  zaama() {
    this.excelService.exportAsExcelFile(this.memberData, 'sample');
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  filtred = false;
  ongetMemberList(page?) {
    return this.membershipService.getMember(page).subscribe(
      res => {
        this.memberList = res;
        this.memberData = this.memberList.data;
        this.memberLength= this.memberList.total;
        this.dataSource = new MatTableDataSource(this.memberData);
        this.displayedColumns = ['memberName', 'card_num', 'email', 'contact', 'points', 'date', 'level', 'actions'];
        this.pager = this.pagerService.getPager(this.memberLength, page);

      }, err => {
        console.log(err);
      }

    );
  }


  ongetLevelList() {
    return this.levelmembershipService.getLevelList().subscribe(
      res => {
        this.levelList = res;
        this.levelData = this.levelList.data;
      }, err => {
        console.log(err);
      }
    );
  }
  membersLength
  filterMemberList(page ,_card_num?, _first_name?, _last_name?, _contact?, _level_id?,
    _gender?, _status?, _card_id?) {
      this.filtred = true;
    if (!_card_num) {
      _card_num = ''
    }
    if (!_first_name) {
      _first_name = ''
    }
    if (!_last_name) {
      _last_name = ''
    }
    if (!_contact) {
      _contact = ''
    }
    if (!_card_id) {
      _card_id = ''
    }
    if (_status == 2 || !_status) {
      _status = ''
    }
    if (_gender == 0 || !_gender) {
      _gender = ''
    }
    if (_level_id == 0 || !_level_id) {
      _level_id = ''
    }
    return this.membershipService.getMember(page,_card_num, _first_name, _last_name, _contact, _level_id,
      _gender, _status, _card_id).subscribe(
        res => {
          this.memberList = res;
          this.memberData = this.memberList.data;
          this.dataSource = new MatTableDataSource(this.memberData);
          this.membersLength= this.memberList.total;
          this.pager2 = this.pagerService.getPager(this.membersLength, page);


          this.displayedColumns = ['memberName', 'card_num', 'email', 'contact', 'points', 'date', 'level', 'actions'];
        }, err => {
          console.log(err);
        }
      );
  }
  ResetForm() {
    // this.redirectTo(`/shop/membership-management`);
    this.router.navigate(['/shop/level-membership-management']);

  }
  redirectTo(uri: string) {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      this.router.navigate([uri]));
  }
  fileName = 'ExcelSheet.xlsx';
  exportexcel(): void {
    let element = document.getElementById('excel-table');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, this.fileName,{compression:true});
  }
  _barcodes: {}[] = [];
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
      }, err => {
        console.log(err);;
      }
    )
  }
  public tabs: string[] = ['Male', 'Female'];
  data: any = [{
    eid: 'e101',
    ename: 'ravi',
    esal: 1000
  }, {
    eid: 'e102',
    ename: 'ram',
    esal: 2000
  }, {
    eid: 'e103',
    ename: 'rajesh',
    esal: 3000
  }];
  exportAsXLSX(): void {
    this.excelService.exportAsExcelFile(this._barcodes, 'sample');
  }
  onDeleteMember(id) {
    return this.membershipService.deleteMember(id).subscribe(
      res => {
        this.snackBar.open(this.translate.currentLang === 'Chinese' ? "该会员已成功删除":this.translate.currentLang === 'Italian' ? 'Membro eliminato con successo':'Member Successfully Deleted', '',{
          duration: 1000,
        });
        this.ongetMemberList();
      }), err => {
        console.log(err);;
      }
  }
  setPageFilter(page,_card_num?, _first_name?, _last_name?, _contact?, _level_id?,
    _gender?, _status?, _card_id?) {
    this.filtred = true;
    this.page = page;
    this.pager2 = this.pagerService.getPager(this.membersLength, page);
    this.filterMemberList(page,_card_num, _first_name, _last_name, _contact, _level_id,
      _gender, _status, _card_id)
}

  setPage(page: number,) {  
    // get pager object from service
    this.pager = this.pagerService.getPager(this.memberLength, page);
    this.page = page;
    this.ongetMemberList(this.page)
  }
}
