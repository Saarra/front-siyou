import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SalesmanagerService } from 'src/app/shared/services/salesmanager.service';
import { MatSpinner, MatIcon, MatTableDataSource, MatPaginator, MatSort, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-add-sales-manager',
  templateUrl: './add-sales-manager.component.html',
  styleUrls: ['./add-sales-manager.component.scss']
})
export class AddSalesManagerComponent implements OnInit {

  form: FormGroup;
  isSearch = false;
  dataSource: MatTableDataSource<any>;
  displayedColumns = ['first_name', 'last_name', 'email', 'actions'];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private formBuilder: FormBuilder, private salesmanagerService: SalesmanagerService, public dialogRef: MatDialogRef<AddSalesManagerComponent>) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  addSalesmanager(id: any) {
    this.salesmanagerService.addSalesmanagertoSupplierList(id).subscribe((res) => {
      this.dialogRef.close('success');
    }, err => {
      this.dialogRef.close('error');
    })
  }
  searchSalesManagerByEmail() {
    if (!this.form.valid) {
      return;
    }
    this.isSearch = true;
    this.salesmanagerService.getSalesManagerByEmail(this.form.value).subscribe((salesManager: any) => {
        this.dataSource = new MatTableDataSource(salesManager);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      this.isSearch = false;
    }, err => {
      console.log(err);;
      this.isSearch = false;
    })
  }

}
