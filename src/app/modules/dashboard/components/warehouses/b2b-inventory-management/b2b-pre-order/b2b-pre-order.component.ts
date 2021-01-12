import { Component, OnInit, ViewChild, ElementRef, Inject } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { OrderServiceService } from 'src/app/shared/services/order-service.service';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialog, MatSnackBar, MatDialogRef, MatInput } from '@angular/material';
import { WarhouseService } from 'src/app/shared/services/warhouse.service';
import { SupplierS2cService } from 'src/app/shared/services/supplier-s2c.service';
import { FormBuilder, Validators } from '@angular/forms';
import * as XLSX from 'xlsx';
type AOA = any[][];
@Component({
  selector: 'app-b2b-pre-order',
  templateUrl: './b2b-pre-order.component.html',
  styleUrls: ['./b2b-pre-order.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0', visibility: 'hidden' })),
      state('expanded', style({ height: '*', visibility: 'visible' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class B2bPreOrderComponent implements OnInit {
  @ViewChild('resultInput', { static: false }) resultInput: ElementRef;
  orderList: any;
  orderInit: any;
  expandedElement: null;
  orderDisplayedColumns = ['order_date', 'order_price', 'shop_owner', 'statut', 'actions'];
  selectedFile: File;
  orderLength = 0;
  sumOrder = 0;
  maxOrderPrice;
  maxOrderDate;
  minOrderPrice;
  minOrderDate;
  lastOrder;
  lastOrderPrice;
  lastOrderDate;
  fileToUpload: File = null;
  form;
  formData;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private orderService: OrderServiceService,
    private warehouseService: WarhouseService,
    private supplierService: SupplierS2cService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private router: Router,
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<B2bPreOrderComponent>
  ) {
    this.formData = new FormData();
  }
  ngOnInit() {
    this.form = this.formBuilder.group({
      order_price: ['', Validators.required],
      supplier_id: ['', Validators.required],
      statut_id: ['', Validators.required],
      products: [''],
    })
  }
  dataa: AOA = [[1, 2], [3, 4]];
  wopts: XLSX.WritingOptions = { bookType: 'xlsx', type: 'array' };
  suppliersList;
  suppliersData;
  onGetSuppliersList() {
    return this.supplierService.GetSuppliersListS2C().subscribe(
      res => {
        this.suppliersList = res;
        this.suppliersData = this.suppliersList.data;
      }, err => {
        console.log(err);;
      }
    );
  }
  status;
  statusList
  onGetStatusList() {
    return this.warehouseService.GetStatusList().subscribe(
      res => {
        this.status = res;
        this.statusList = this.status.data;
      }, err => {
        console.log(err);;
      }
    );
  }
  onGetPreOrders() {
    return this.orderService.getPreOrders().subscribe(
      res => {
        this.orderInit = res;
        this.orderList = this.orderInit.data;
        for (let el of this.orderList) {
          this.orderLength += 1;
          this.sumOrder += el.order_price;
        }
        let max = 0;
        this.orderList.forEach(oneData => {
          if (oneData.order_price > max) {
            max = oneData.order_price;
            this.maxOrderPrice = oneData.order_price;
            this.maxOrderDate = oneData.order_date
          }
        });
        this.lastOrder = this.orderList[this.orderList.length - 1];
        this.lastOrderPrice = this.lastOrder.order_price;
        this.lastOrderDate = this.lastOrder.order_date;
      }
    )
  }
  onFileSelect(event) {
    this.selectedFile = event.target.files[0];
  }
  openOrderFullDetails(id: any) {
    // this.redirectTo(`shop/order-full-details/${id}`);
    this.router.navigate([`shop/order-full-details/${id}`]);

  }
  redirectTo(uri: string) {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      this.router.navigate([uri]));
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.orderList.filter = filterValue.trim().toLowerCase();
    if (this.orderList.paginator) {
      this.orderList.paginator.firstPage();
    }
  }
  getFileChange(event) {
    const fileInput = this.resultInput.nativeElement as MatInput;
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      fileInput.value = file.name;
      this.form.get('products').setValue(file);
      this.formData.append('products', this.form.get('products').value);
    }
  }
  onUploadFile() {
    this.dialogRef.close({ data: this.dataa })
  }
  toFormData<T>(formValue: T) {
    const formData = new FormData();
    for (const key of Object.keys(formValue)) {
      const value = formValue[key];
      formData.append(key, value);
    }
    return formData;
  }
  clickCancel() {
    this.dialogRef.close();
  }
  onFileChange(evt: any) {
    this.dataa = []
    const target: DataTransfer = <DataTransfer>(evt.target);
    if (target.files.length !== 1) throw new Error('Cannot use multiple files');
    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      const bstr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];
      this.dataa = <AOA>(XLSX.utils.sheet_to_json(ws, { header: 0 }));
    };
    reader.readAsBinaryString(target.files[0]);
  }
}
