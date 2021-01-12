import { AfterViewInit, Component, ViewChild, OnInit } from "@angular/core";

import {
  MatPaginator,
  MatSnackBar,
  MatSort,
  MatTableDataSource,
} from "@angular/material";
import { TranslateService } from "@ngx-translate/core";
import { UserService } from "src/app/shared/services/user.service";
import { PagerService } from "src/app/shared/services/pager.service";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "src/environments/environment";
@Component({
  selector: "app-license-management",
  templateUrl: "./license-management.component.html",
  styleUrls: ["./license-management.component.scss"],
})
export class LicenseManagementComponent implements OnInit, AfterViewInit {
  displayedColumns = [
    "shop",
    "chains",
    "cashiers",
    "managers",
    "operators",
    "start_date",
    "finish_date",
    "actions",
  ];
  allItems;
  pager: any = {};
  grid: boolean = false;
  list: boolean = false;
  LicensesLength;
  page = 1;
  licenceList;
  license;
  dataSource = new MatTableDataSource();

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;;

  constructor(
    private userService: UserService,
    private translate: TranslateService,
    private _snackBar: MatSnackBar,
    private pagerService: PagerService,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.getLicense(this.page);
    this.getLicenseList();
    this.http
      .get(`${environment.BaseUrlS2C}/licences`, {
        params: {
          token: localStorage.getItem("token")        },
      })
      .subscribe((data) => {
        // set items to json response
        this.allItems = data;
        this.LicensesLength = this.allItems.total;
        this.pager = this.pagerService.getPagerLicence(this.LicensesLength, this.page);
      });
      this.dataSource.paginator = this.paginator;
    }
    ngAfterViewInit() {
      this.dataSource.sort = this.sort;
    }
  licence;
  licenceData;


  getLicense(page?) {
    this.grid = true;
    this.list = false;

    return this.userService.getLicensegrid(page).subscribe(
      (res) => {
        this.licence = res;
        this.licenceData = this.licence.data;
        this.LicensesLength = this.licence.total;
        this.pager = this.pagerService.getPagerLicence(this.LicensesLength, page);
       },
      (err) => {
        console.log(err);
      }
    );
  }

  getLicenseList() {
    this.grid = false;
    this.list = true;
    return this.userService.getLicenseList().subscribe(
      (res) => {
        this.license = res;
        this.licenceList = this.license.data;
        this.dataSource.data = this.licenceList;
        console.log(this.licenceList)
        this.displayedColumns = [
          "shop",
          "chains",
          "cashiers",
          "managers",
          "operators",
          "start_date",
          "finish_date",
          "actions",
        ];
      },
      (err) => {
        console.log(err);
      }
    );
  }
  onDeleteLicense(id) {
    return this.userService.deleteLicence(id).subscribe((res) => {
      console.log(res);
      this._snackBar.open(
        this.translate.currentLang === "Chinese"
          ? "已删除"
          : this.translate.currentLang === "Italian"
          ? "cancellato"
          : "Deleted",
        "",
        {
          duration: 1000,
        }
      );

      this.getLicense();
    });
  }
  setPageFilter(page) {
    this.page = page;
    this.pager = this.pagerService.getPagerLicence(this.LicensesLength, page);
    this.getLicense(page);
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
