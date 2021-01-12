import { Component, OnInit, ViewChild, Inject ,ElementRef, OnChanges } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { ChainService } from 'src/app/shared/services/chain.service';
import { ShopcachierService } from 'src/app/shared/services/shopCachier.service';
import { MatDialog, MatSnackBar ,MatInput} from '@angular/material';

@Component({
  selector: 'app-edit-shop-cashier',
  templateUrl: './edit-shop-cashier.component.html',
  styleUrls: ['./edit-shop-cashier.component.scss']
})
export class EditShopCashierComponent implements OnInit {
  currentId;
  chainList;
  chainData;

  constructor(private shopcachierservice : ShopcachierService,
    private chainService: ChainService,
      private router: Router,
      private _snackBar: MatSnackBar,
      private activatedRouter: ActivatedRoute) {
        activatedRouter.params.subscribe((params) => {
          this.currentId = params.id;
        });
       }

  ngOnInit() {
    this.ongetChainList();
    this.getCashierById(this.currentId)
  }
  ongetChainList(){
    return this.chainService.getChainList().subscribe(
      res=>{
          this.chainList = res;
          this.chainData = this.chainList.data;
          //console.log(this.chainData)
      }, err =>{
        console.log(err);
           
      }
    );
}
redirectTo(uri:string){
  this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
  this.router.navigate([uri]));
}
onUpdateCashier(first_name,last_name,contact,is_active,chain_id,password){
  var cashier= {
    first_name:first_name,
    last_name:last_name,
    contact:contact,
    is_active:is_active,
    chain_id:chain_id,
    password :password
    
  }
  //console.log(cashier)
    return this.shopcachierservice.updateCashier(this.currentId,cashier).subscribe(
      res => {
        //console.log(res)
        this._snackBar.open('cachier Successfully Updated', "OK", {
          duration: 1000,
        }); 
        // this.redirectTo('shop/cashiers-list');
        this.router.navigate([`shop/cashiers-list`]);

      }, err=>{
        console.log(err);;
      }
    );


   

  }
  currentCashier;
  currentCash;
getCashierById(id){
  return this.shopcachierservice.getCashierById(this.currentId).subscribe(
    (res) => {
      this.currentCash=res;
      this.currentCashier = this.currentCash.data;
      //console.log(this.currentCashier)
    },
    (err) => {
      console.log(err);;
    }
  );
}
}
