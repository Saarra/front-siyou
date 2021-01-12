import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/services/user.service';
import { Router } from '@angular/router';
import { User } from 'src/app/shared/models/user';
@Component({
  selector: 'app-add-shop-owner',
  templateUrl: './add-shop-owner.component.html',
  styleUrls: ['./add-shop-owner.component.scss']
})
export class AddShopOwnerComponent implements OnInit {
  constructor(private userService: UserService,
    private router: Router) { }
  ngOnInit() {
  }
  onAddShopOwner(first_name, last_name, email, password) {
    if (!first_name || !last_name || !email || !password) {
      alert('please insert the required inputs')
    } else {
      var role_id = 2;
      var role = '';
      var id = null;
      var validation = 0;
      this.userService.addShopOwner({ id, first_name, last_name, email, password, role_id, role, validation } as User).subscribe(
        res => {
          alert("Shop Owner Added Successfully");
          this.router.navigate(['/superadmin/accounts-list']);
        }
      );
    }
  }
}
