import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-edit-licence',
  templateUrl: './edit-licence.component.html',
  styleUrls: ['./edit-licence.component.scss']
})
export class EditLicenceComponent implements OnInit {

  currentLicence ;
  currentLic;
  currentId;
  constructor(
    private userService: UserService,
    public datepipe: DatePipe,
    private snackbar: MatSnackBar,
    private router: Router,
    private activatedRouter: ActivatedRoute,
    public translate: TranslateService
    ) {
      activatedRouter.params.subscribe((params) => {
        this.currentId = params.id;
      });
    }

  ngOnInit() {
    this.getShopOwners();
    this.onGetlicenseById(this.currentId);
    
  }
  onGetlicenseById(id) {
    return this.userService.getLicenseById(this.currentId).subscribe(
      (res) => {
        this.currentLicence = res;
        this.currentLic = this.currentLicence.data;
      },
      (err) => {
        console.log(err);
      }
    );
  }
  shopData;
  shopowners;
  getShopOwners() {
    return this.userService.getShopOwners().subscribe((res) => {
      this.shopowners = res;
      this.shopData = this.shopowners.data;
      console.log(this.shopData)
    });
  }
  editLicense(shop, managers ,cashiers,operators,max_chain,start_date,finish_date) {
    var start = this.datepipe.transform(start_date, "yyyy-MM-dd");
    var finish = this.datepipe.transform(finish_date, "yyyy-MM-dd");
    var license = {
      shop_owner_id : shop,
      chains : max_chain,
      cashiers : cashiers,
      managers : managers,
      operators : operators,
      start_date :start ,
      finish_date : finish
    }
    this.userService.editLicense(this.currentId,license).subscribe(res => {
        //  this.redirectTo(`add-product-commission`);
         this.snackbar.open(this.translate.currentLang === 'Chinese' ? "完成了" :this.translate.currentLang === 'Italian' ? "Fatto": 'Done', 'OK', {
           duration: 2000
         });
         this.router.navigate(["/superadmin/license-list"]);

       }, err => {
         console.log(err);;
       }
     );
     

  }
}

