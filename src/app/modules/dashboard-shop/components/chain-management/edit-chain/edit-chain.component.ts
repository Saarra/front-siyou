import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { MatSnackBar} from '@angular/material';
import { ChainService } from 'src/app/shared/services/chain.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-edit-chain',
  templateUrl: './edit-chain.component.html',
  styleUrls: ['./edit-chain.component.scss']
})
export class EditChainComponent implements OnInit {
  currentId;

  constructor(
    private router: Router,
    private _snackBar: MatSnackBar,
    private activatedRouter: ActivatedRoute,
    private chainservice : ChainService,
    public translate: TranslateService
  ) {    
     activatedRouter.params.subscribe((params) => {
    this.currentId = params.id;
  });
}

  ngOnInit() {
    this.getChainById(this.currentId)

  }
  currentChainData;
  currentChain;
  getChainById(id){
    return this.chainservice.getChainById(this.currentId).subscribe(
      (res) => {
        this.currentChain=res;
        this.currentChainData = this.currentChain.data;
      },
      (err) => {
        console.log(err);;
      }
    );
  }

  onUpdateChain(chain_name,adress, contact,chain_opening_hours,chain_close_hours,approved){
      var _store ={
        chain_name:chain_name,
        adress:adress,
        contact: contact,
        chain_opening_hours: chain_opening_hours,
        chain_close_hours : chain_close_hours,
        approved : 1,      
        store_id: localStorage.getItem('store_id')
      }

      this.chainservice.updateNewChain(this.currentId,_store).subscribe(
        res => {   ;
          this.router.navigate(['shop/chains-list']);
          this._snackBar.open(this.translate.currentLang === 'Chinese' ? "商店信息已成功更新":this.translate.currentLang === 'Italian' ? "Archivio aggiornato con successo":'Store Successfully Updated', '',{            duration: 1000,
          }); 
        }, err=>{
          console.log(err);;
        }
      );


     

    
  }
  redirectTo(uri:string){
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
    this.router.navigate([uri]));
  }
}
