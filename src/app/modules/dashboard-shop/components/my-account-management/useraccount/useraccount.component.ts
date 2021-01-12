import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Subject } from 'rxjs';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-useraccount',
  templateUrl: './useraccount.component.html',
  styleUrls: ['./useraccount.component.scss']
})
export class UseraccountComponent implements OnInit {

  

  form: FormGroup;
  profile;
  private _unsubscribeAll: Subject<any>;

 
  constructor(private userService : UserService)
  {
    
      this._unsubscribeAll = new Subject();
  }
  ngOnInit()
  {
    this.getMyInfos(); 
    this.getMyLicense();        
    }
    user;
    licence;
    getMyInfos() {
      return this.userService.getUser().subscribe(res => {
      this.user=res;
      console.log(this.user)
      })
    
    }
    getMyLicense() {
      return this.userService.getLicence().subscribe(res => {
        this.licence=res;
        })
    }
}





