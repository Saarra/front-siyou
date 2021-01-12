import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MatSnackBar } from '@angular/material';
import { ChainService } from 'src/app/shared/services/chain.service';
import { FundsS2cService } from 'src/app/shared/services/funds-s2c.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-add-payment-method',
  templateUrl: './add-payment-method.component.html',
  styleUrls: ['./add-payment-method.component.scss']
})
export class AddPaymentMethodComponent implements OnInit {

  constructor(
    private chainService: ChainService,
    private fundsS2cService: FundsS2cService,
    private _snackBar: MatSnackBar,
    public translate: TranslateService,
    private dialogRef: MatDialogRef<AddPaymentMethodComponent>,

  ) { }

  ngOnInit() {
    this.onGetChainList();

  }
  chain;
  chainData;
  onGetChainList() {
    return this.chainService.getChainList().subscribe(
      res => {
        this.chain = res;
        this.chainData = this.chain.data
      }, err => {
        console.log(err);;
      }
    );

  }
  onAddPayment(_name, _days, _chain_id) {
    if (!_name ||  !_days || !_chain_id ) {
      alert('Please insert the required inputs')
    } else {
    var pay = {
      name: _name,
      days: _days,
      chain_id: _chain_id

    }
    return this.fundsS2cService.addPaymentMethod(pay).subscribe(
      res => {
        this.dialogRef.close()
        this._snackBar.open(this.translate.currentLang === 'Chinese' ? "付款方式已成功添加":this.translate.currentLang === 'Italian' ? "Metodo di pagamento aggiunto con successo":'Payment Method Successfully Added', '',{
          duration: 1000,
        });
      }, err => {
        console.log(err);;
      }
    );
  }}

  cancel() {
    this.dialogRef.close()

  }
}
