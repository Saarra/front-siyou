import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { PurchaseService } from 'src/app/shared/services/purchase.service';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import * as pdfMake from 'pdfmake/build/pdfmake.min';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
export class Resume {
  profilePic: string;
}
@Component({
  selector: 'app-download-quick',
  templateUrl: './download-quick.component.html',
  styleUrls: ['./download-quick.component.scss']
})
export class DownloadQuickComponent implements OnInit {
  currentId;
  resume = new Resume();
  constructor(
    private router: Router,
    private _snackBar: MatSnackBar,
    private activatedRouter: ActivatedRoute,
    private purchaseService: PurchaseService
  ) {
    activatedRouter.params.subscribe((params) => {
      this.currentId = params.id;
    });
  }
  ngOnInit() {
    this.getQuickById(this.currentId)
  }
  storeName = localStorage.getItem('store_name')
  adress = localStorage.getItem('adress')
  email = localStorage.getItem('userEmail')
  contact = localStorage.getItem('phone_num1')
  generatePdf(action = 'open', order_number, supplier_name, company_name, supplier_adress, contact, products, date, tax, total, banquaire) {
    const documentDefinition = this.getDocumentDefinition(order_number, supplier_name, company_name, supplier_adress, contact, products, date, tax, total, banquaire);
    switch (action) {
      case 'open': pdfMake.createPdf(documentDefinition).open(); break;
      case 'print': pdfMake.createPdf(documentDefinition).print(); break;
      case 'download': pdfMake.createPdf(documentDefinition).download(); break;
      default: pdfMake.createPdf(documentDefinition).open(); break;
    }
  }
  getDocumentDefinition(order_number, supplier_name, company_name, supplier_adress, contact, products, date, tax, total, banquaire) {
    var TTC: number = parseFloat(total) + ((parseFloat(total) * parseFloat(tax)) / 100)
    return {
      content: [
        {
          columns: [
            [{
              text: 'Preventivo',
              style: 'preventivo'
            },
            {
              text: order_number,
              style: 'supplier'
            },],
          ]
        },
        {
          columns: [
            [
              {
                text: 'Store : ' + this.storeName,
                style: 'store'
              },
              {
                text: 'Adress : ' + this.adress,
                style: 'store'
              },
              {
                text: 'Email : ' + this.email,
                style: 'store'
              },
              {
                text: 'Contant No : ' + this.contact,
                style: 'store'
              },
              {
                text: 'Data : ' + date,
                style: 'store'
              },
            ],
            [
              {
                text: 'Company : ' + company_name,
                style: 'supplier'
              },
              {
                text: 'Supplier Name : ' + supplier_name,
                style: 'supplier'
              },
              {
                text: ' Adress : ' + supplier_adress,
                style: 'supplier'
              },
              {
                text: ' Contact : ' + contact,
                style: 'supplier'
              },
            ]
          ]
        },
        {
          text: 'Products',
          style: 'header'
        },
        {
          table: {
            widths: [30, '*', '*', 60, 70],
            body: [
              [{
                text: 'Q.tà',
                style: 'tableHeader'
              },
              {
                text: 'Articolo n.',
                style: 'tableHeader'
              },
              {
                text: 'Barcode',
                style: 'tableHeader'
              },
              {
                text: 'Prezzo unitario',
                style: 'tableHeader'
              },
              {
                text: 'Totale riga',
                style: 'tableHeader'
              },
              ],
              ...products.map(ed => {
                return [ed.product_quantity, ed.product_name, ed.product_barcode, ed.cost_price + " €", this.totalprice(ed.product_quantity, ed.cost_price) + " €"];
              }),
            ]
          }
        },
        {
          style: 'tableExample',
          table: {
            widths: ['*', '*'],
            body: [
              [{ text: 'Totale', style: 'tableHeader', colSpan: 1, alignment: 'left' }, { text: total + " €", alignment: 'center' }],
              [{ text: 'IVA(' + tax + "%)", style: 'tableHeader', colSpan: 1, alignment: 'left' }, { text: ((total * tax) / 100).toFixed(2) + " €", alignment: 'center' }],
              [{ text: 'Totale (IVA Incl.)', style: 'tableHeader', colSpan: 1, alignment: 'left' }, { text: TTC.toFixed(2) + " €", alignment: 'center' }],
            ]
          }
        },
        {
          text: ' Coordinate Bancarie:\n' + banquaire,
          style: 'store'
        },
      ],
      styles: {
        store: {
          fontSize: 10,
          bold: true,
          color: 'gray',
          alignment: 'left',
        },
        preventivo: {
          bold: true,
          fontSize: 30,
          alignment: 'right',
          color: 'black',
          margin: [0, 0, 0, 20],
          width: 150,
        },
        supplier: {
          fontSize: 10,
          bold: true,
          color: 'gray',
          alignment: 'right',
        },
        header: {
          fontSize: 18,
          bold: true,
          margin: [0, 20, 0, 10],
          decoration: 'underline'
        },
        tableHeader: {
          bold: true,
        },
        tableExample: {
          alignment: 'right',
          margin: [300, 5, 0, 15]
        },
      }
    };
  }
  totalprice(a, b) {
    return (a * b).toFixed(2);
  }
  currentOrderData;
  currentOrder;
  getQuickById(id) {
    return this.purchaseService.getPurchaseById(this.currentId).subscribe(
      (res) => {
        this.currentOrder = res;
        this.currentOrderData = this.currentOrder.data[0];
      },
      (err) => {
        console.log(err);;
      }
    );
  }
  getProfilePicObject() {
    if (this.resume.profilePic) {
      return {
        image: this.resume.profilePic,
        width: 150,
        alignment: 'left',
        margin: [0, 0, 0, 20],
      };
    }
    return null;
  }
  fileChanged(e) {
    const file = e.target.files[0];
    this.getBase64(file);
  }
  getBase64(file) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      //console.log(reader.result);
      this.resume.profilePic = reader.result as string;
    };
    reader.onerror = (error) => {
      //console.log('Error: ', error);
    };
  }
}
