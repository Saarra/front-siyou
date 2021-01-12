import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatPaginator, MatSort, MatDialog, MatTableDataSource, MatSnackBar } from '@angular/material';
import { User } from 'src/app/shared/models/user';
import { SalesmanagerService } from 'src/app/shared/services/salesmanager.service';
import { AddSalesManagerComponent } from '../../modals/sales-manager/add-sales-manager/add-sales-manager.component';
import { SupplierService } from 'src/app/shared/services/supplier.service';
import { MediaMatcher } from '@angular/cdk/layout';
import { AffectSalesManagerComponent } from '../../modals/sales-manager/affect-sales-manager/affect-sales-manager.component';
import { EditSalesManagerComponent } from '../../modals/sales-manager/edit-sales-manager/edit-sales-manager.component';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-salesmanager',
  templateUrl: './salesmanager.component.html',
  styleUrls: ['./salesmanager.component.scss']
})
export class SalesmanagerComponent implements OnInit {
  mobileQuery: MediaQueryList;
  dataSource: MatTableDataSource<any>;
  displayedColumns = ['first_name', 'last_name', 'email', 'shop', 'commission_value', 'actions'];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  salesmanager: any;
  currentSalesmanager: User;
  salesmanagerList: any = [];
  constructor(private dialog: MatDialog,
    private salemanagerService: SalesmanagerService,
    private supplierService: SupplierService,
    private snackBar: MatSnackBar,
    private media: MediaMatcher,
    public translate: TranslateService,
    private changeDetectorRefs: ChangeDetectorRef) {
  }
  getSupplierSalesmanager() {
    this.supplierService.getSupplierSalesManager().subscribe((salesmanagerList: any) => {
      this.salesmanagerList = salesmanagerList
      this.dataSource = new MatTableDataSource(salesmanagerList);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }
  ngOnInit() {
    this.mobileQuery = this.media.matchMedia('(max-width: 600px)');
    this.getSupplierSalesmanager();
  }
  refresh() {
    this.changeDetectorRefs.detectChanges();
  }
  openEditSalesManagerModal(data: any) {
    const dialogRef = this.dialog.open(EditSalesManagerComponent, {
      width: '400px',
      height: '600px',
      maxHeight: '650px',
      data
    });
    dialogRef.afterClosed().subscribe(data => {
      this.snackBar.open(data === 'success' && this.translate.currentLang === 'Chinese' ? '销售经理已成功更新' :data === 'success' && this.translate.currentLang === 'English' ?  'Salesmanager updated Successfully!' : 'Error While Updating Salesmanager', '', {
        duration: 1500,
        verticalPosition: 'bottom',
        horizontalPosition: 'right'
      }).afterDismissed().subscribe(snackbarClosed => {
        this.getSupplierSalesmanager();
      })
    })
  }
  openAddSalesManagerModal() {
    const dialogRef = this.dialog.open(AddSalesManagerComponent, {
      width: '1200px',
      maxHeight: '600px'
    });
    dialogRef.afterClosed().subscribe(data => {
      if (data === 'success') {
        this.snackBar.open(this.translate.currentLang === 'Chinese' ? "销售经理已成功添加" :this.translate.currentLang === 'Italian' ? "Addetto alle vendite aggiunto con successo" :'Salesmanager Added Successfully!', '', {
          duration: 1000,
          horizontalPosition: this.mobileQuery.matches ? "center" : "left",
          verticalPosition: "bottom",
          panelClass: ['snackbar']
        }).afterDismissed().subscribe(() => {
          window.location.reload();
        })
      } else {
        this.snackBar.open(this.translate.currentLang === 'Chinese' ? "添加销售经理出现错误" :this.translate.currentLang === 'Italian' ? "Errore durante l'aggiunta di Salesmanager" :'Error while adding Salesmanager', '', {
          duration: 1000,
          horizontalPosition: this.mobileQuery.matches ? "center" : "left",
          verticalPosition: "bottom",
          panelClass: ['snackbar']
        })
      }
    })
  }
  affectSalesManagerToShop(index: number) {
    const dialogRef = this.dialog.open(AffectSalesManagerComponent, {
      width: '1200px',
      maxHeight: '600px',
      data: {
        salesmanagerList: this.salesmanagerList,
        index
      }
    });
    dialogRef.afterClosed().subscribe(res => {
      this.snackBar.open(res === 'success' ? 'Shop Affected Successfully!' : 'Error while affecting Shop, please try again', '', {
        verticalPosition: 'bottom',
        horizontalPosition: 'right',
        duration: 1500,
        panelClass: ['snackbar']
      }).afterDismissed().subscribe(dismissed => {
        if (res === 'success') {
          this.getSupplierSalesmanager();
        }
      })
    })
  }
  closeAddSalesManagerPopup() {
    this.dialog.closeAll();
  }
}
