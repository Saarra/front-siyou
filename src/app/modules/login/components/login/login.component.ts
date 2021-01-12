import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AuthenticationService } from 'src/app/core/authentication/authentication.service';
import { Router } from '@angular/router';
import { MDCSnackbar } from '@material/snackbar';
import { MatSnackBarRef, MatSnackBar } from '@angular/material';
import { MediaMatcher } from '@angular/cdk/layout';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  mobileQuery: MediaQueryList;
  form: FormGroup;
  hide = true;
  links = ['Email Login', 'Phone Login'];
  activeLink = this.links[0];
  constructor(private formBuilder: FormBuilder,
    private authService: AuthenticationService, private router: Router,
    public translate: TranslateService,
    private snackBar: MatSnackBar, media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 1200px)');
  }
  ngOnInit() {
    this.form = this.formBuilder.group({
      email: [''],
      password: [''],
    });
  }
  signIn() {
    const spinner = document.getElementById('loadingSpinner') as HTMLElement;
    spinner.style.display = 'unset';
   
  

    this.authService.login(this.form.value).subscribe((res: any) => {
      localStorage.setItem('token', res.access_token);
      localStorage.setItem('userEmail', res.user.email);
      localStorage.setItem('first_name', res.user.first_name);
      localStorage.setItem('last_name', res.user.last_name);
      localStorage.setItem('phone_num1', res.user.phone_num1);
      localStorage.setItem('adress', res.user.adress);
      localStorage.setItem('img_url', res.user.img_url);
      localStorage.setItem('chain_id', res.user.chain_id);
      // localStorage.setItem('add_product', "1");
      // localStorage.setItem('discount', "1");
      // localStorage.setItem('statistics', "1");
      // localStorage.setItem('inventory', "1");
      // localStorage.setItem('my_wishlist', "1");
      // localStorage.setItem('add_new_shop_manager', "no");
      switch (res.user.role.name) {
        case 'Supplier':
          this.router.navigate(['/overview']);
          break;
        case 'Shop_Owner':
          this.authService.loginS2C(this.form.value).subscribe((res: any) => {
            localStorage.setItem('token', res.access_token);
            localStorage.setItem('userEmail', res.user.email);
            localStorage.setItem('first_name', res.user.first_name);
            localStorage.setItem('last_name', res.user.last_name);
            localStorage.setItem('phone_num1', res.user.contact);
            localStorage.setItem('adress', res.user.adress);
            localStorage.setItem('img_url', res.user.img_url);
            localStorage.setItem('store_id', res.user.store_id);
            localStorage.setItem('chain_id', res.user.chain_id);
            // localStorage.setItem('add_product', "1");
            // localStorage.setItem('inventory', "1");
            // localStorage.setItem('my_wishlist', "1");
            // localStorage.setItem('discount', "1");
            // localStorage.setItem('statistics', "1");
            // localStorage.setItem('store_name', res.user.store_name);
            // localStorage.setItem('add_new_shop_manager', "allow");
            this.router.navigate(['/shop/shopoverview']);
          })
          break;
        case 'SalesManager':
          this.router.navigate(['/salesmanager']);
          break;
        case 'Super_Admin':
          this.router.navigate(['/superadmin']);
          break;
      }
    }, err => {
      console.log(err);
      this.authService.loginS2C(this.form.value).subscribe((res: any) => {
        localStorage.setItem('token', res.access_token);
        localStorage.setItem('userEmail', res.user.email);
        localStorage.setItem('first_name', res.user.first_name);
        localStorage.setItem('last_name', res.user.last_name);
        localStorage.setItem('phone_num1', res.user.phone_num1);
        localStorage.setItem('adress', res.user.adress);
        localStorage.setItem('img_url', res.user.img_url);
        localStorage.setItem('store_id', res.user.store_id);
        // localStorage.setItem('add_product', res.user.user_menu[0].add_product);
        // localStorage.setItem('inventory', res.user.user_menu[0].inventory);
        // localStorage.setItem('my_wishlist', res.user.user_menu[0].my_wishlist);
        // localStorage.setItem('discount', res.user.user_menu[0].affect_discount);
        // localStorage.setItem('statistics', res.user.user_menu[0].statistics);
        // localStorage.setItem('add_new_shop_manager', "no");
        this.router.navigate(['/shop/useraccount']);

      }, err => {
       
        this.snackBar.open(this.translate.currentLang === 'Chinese' ? "无效访问":this.translate.currentLang === 'Italian' ? "Credenziali non valide":'Invalid Credentials', '',{
          verticalPosition: 'top',
          horizontalPosition: 'right',
          duration: 1000,
          panelClass: ['loginSnackbar']
        });
        spinner.style.display = 'none';
      })
    });
  }
}
