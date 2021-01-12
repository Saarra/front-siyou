import { Component, OnInit, Output,Input,EventEmitter } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from "@angular/common/http";
import { Shopmanager } from "src/app/shared/models/shopmanager.model";
import { ShopmanagerService } from "src/app/shared/services/shopmanager.service";
// import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-add-shopmanager',
  templateUrl: './add-shopmanager.component.html',
  styleUrls: ['./add-shopmanager.component.scss']
})
export class AddShopmanagerComponent implements OnInit {

  shopmanager : Shopmanager;
  @Output() newsalesmanager : EventEmitter<Shopmanager> = new EventEmitter();
  @Input() currentShopmanager: Shopmanager; 

  constructor(
    // private toastr : ToastrService,
    private shopmanagerService : ShopmanagerService) { }

  ngOnInit() {
  }

  addshopmanager(first_name, last_name, email,password){
    const role_id =4;
    if (!first_name || !last_name || !email || !password){
      alert('please insert the required inputs')
    }else{
      this.shopmanagerService.saveShopmanager({first_name, last_name, email,password, role_id } as Shopmanager).subscribe(
        salesmanager => {

        }
      );
    }
  }
 

}