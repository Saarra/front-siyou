import { Component, OnInit, ViewChild, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { BrandsService } from 'src/app/shared/services/brands.service';
import { AddBrandModalComponent } from '../modals/add-brand-modal/add-brand-modal.component';
import { EditBrandModalComponent } from '../modals/edit-brand-modal/edit-brand-modal.component';
import { DeleteBrandModalComponent } from '../modals/delete-brand-modal/delete-brand-modal.component';
@Component({
  selector: 'app-brands-management',
  templateUrl: './brands-management.component.html',
  styleUrls: ['./brands-management.component.scss']
})
export class BrandsManagementComponent implements OnInit, AfterViewInit {
  dataSource = new MatTableDataSource();
  displayedColumns = ['brand_logo', 'brand_name', 'actions'];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  brand;
  user;
  sum_brand = 0;
  constructor(
    private brandService: BrandsService,
    private router: Router,
    private dialog: MatDialog
  ) {
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  ngOnInit() {
    this.brandService.GetBrands().subscribe(
      res => {
        this.brand = res;
        this.dataSource.data = this.brand;
        for (let _brand of this.brand) {
          this.sum_brand += 1;
        }
      }, err => {
        console.log(err);;
      }
    )
    this.dataSource.paginator = this.paginator;
  }
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }
  openAddNewBrandModal() {
    this.dialog.open(AddBrandModalComponent)
  }
  openEditBrandModal(data: any) {
    this.dialog.open(EditBrandModalComponent, { data })
  }
  openDeleteBrandModal(data: any) {
    this.dialog.open(DeleteBrandModalComponent, { data })
  }
  redirectTo(uri: string) {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      this.router.navigate([uri]));
  }
  getLogoUrl(brand_logo: string) {
    return brand_logo;
  }
}
