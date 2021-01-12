import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { MyAccountService } from 'src/app/shared/services/my-account.service';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { toTypeScript } from '@angular/compiler';
import { AuthenticationService } from 'src/app/core/authentication/authentication.service';
import { UserService } from 'src/app/shared/services/user.service';
@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.scss']
})
export class MyAccountComponent implements OnInit {
  form: FormGroup;
  formLog: FormGroup;
  private _unsubscribeAll: Subject<any>;
  constructor(
    private _formBuilder: FormBuilder,
    private myaccountService: MyAccountService,
    private snackar: MatSnackBar,
    private router: Router,
    private userService: UserService
  ) {
    this._unsubscribeAll = new Subject();
  }
  ngOnInit(): void {
    this.getMyInfos();
    this.form = this._formBuilder.group({
      company: [
        {
          value: 'Siyou',
        }, Validators.required
      ],
      firstName: [''],
      lastName: [''],
      address: [''],
      contact: [''],
      city: [''],
      userEmail: [''],
      postalCode: ['', [Validators.maxLength(5)]],
      country: ['']
    });
    this.formLog = this._formBuilder.group({
      email: [''],
      password: [''],
    });
  }
  user;
  getMyInfos() {
    return this.userService.getUser().subscribe(res => {
      this.user = res;
      //console.log(this.user)
    })
  }
  updateUser(_first_name, _last_name, _contact, _billing_address_1, _billing_country, _billing_city, _billing_postal_code) {
    var user = {
      first_name: _first_name,
      last_name: _last_name,
      contact: _contact,
      email: localStorage.getItem('userEmail'),
      billing_address_1: _billing_address_1,
      billing_country: _billing_country,
      billing_city: _billing_city,
      billing_postal_code: _billing_postal_code
    }
    //console.log(this.user.id, user)
    return this.myaccountService.EditAcount(this.user.id, user).subscribe(
      res => {
        localStorage.setItem('first_name', JSON.stringify(user.first_name));
        localStorage.setItem('last_name', JSON.stringify(user.last_name));
        localStorage.setItem('contact', JSON.stringify(user.contact));
        localStorage.setItem('userEmail', JSON.stringify(user.email));
        localStorage.setItem('billing_address_1', JSON.stringify(user.billing_address_1));
        localStorage.setItem('billing_country', JSON.stringify(user.billing_country));
        localStorage.setItem('billing_city', JSON.stringify(user.billing_city));
        localStorage.setItem('billing_postal_code', JSON.stringify(user.billing_postal_code));
        this.snackar.open("User updated successfully", "OK", {
          duration: 1000
        });
        alert('You need to RELOGIN')
        // this.redirectTo('/shop/login');
        this.router.navigate(['/shop/login']);

      }, err => {
        console.log(err);
      }
    )
  }
  redirectTo(uri: string) {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      this.router.navigate([uri]));
  }
  EditAcountt(first_name, last_name, contact, billing_address_1, billing_country, billing_city, billing_postal_code, userEmail) {
    if (!first_name || !last_name || !contact || !billing_address_1 || !billing_country || !billing_city || !billing_postal_code || !userEmail) {
      alert('please insert the required inputs')
    } else {
      var _profile = {
        first_name: first_name,
        last_name: last_name,
        contact: contact,
        billing_address_1: billing_address_1,
        billing_country: billing_country,
        billing_city: billing_city,
        billing_postal_code: billing_postal_code,
        userEmail: userEmail
      }
    }
  }
}
