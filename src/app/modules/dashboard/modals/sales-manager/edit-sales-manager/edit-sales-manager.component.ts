import { Component, OnInit, Input, EventEmitter, Output, Inject, ChangeDetectorRef } from '@angular/core';
import { HttpClient, HttpHandler, HttpHeaders } from "@angular/common/http";
import { SalesmanagerService } from "src/app/shared/services/salesmanager.service";
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SupplierService } from 'src/app/shared/services/supplier.service';
@Component({
  selector: 'app-edit-sales-manager',
  templateUrl: './edit-sales-manager.component.html',
  styleUrls: ['./edit-sales-manager.component.scss']
})
export class EditSalesManagerComponent implements OnInit {
  sales_manager: any;
  salesmanager: any;
  currentSalesmanager: any;
  form: FormGroup
  constructor(private salesmanagerService: SalesmanagerService,
    private http: HttpClient,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<EditSalesManagerComponent>,
    private changeDetectorRefs: ChangeDetectorRef, private formBuilder: FormBuilder,
    private supplierService: SupplierService
  ) {
  }
  ngOnInit() {
    this.currentSalesmanager = this.dialogRef.componentInstance.data;
    this.form = this.formBuilder.group({
      first_name: [{ value: this.currentSalesmanager.first_name, disabled: true }],
      last_name: [{ value: this.currentSalesmanager.last_name, disabled: true }],
      email: [{ value: this.currentSalesmanager.email, disabled: true }],
      commission_amount: [this.currentSalesmanager.commission_amount, [Validators.max(100), Validators.min(0)]]
    })
  }
  updateSalesManagerCommission() {
    const data = {};
    Object.assign(data, { shop_owner_id: this.currentSalesmanager.shop_owners[0].id, salesmanager_id: this.currentSalesmanager.id, commission_amount: this.form.get('commission_amount').value });
    //console.log(data);
    this.supplierService.updateSalesmanagerCommission(data).subscribe(result => {
      this.dialogRef.close('success');
    }, err => {
      this.dialogRef.close('error');
    })
  }
}
