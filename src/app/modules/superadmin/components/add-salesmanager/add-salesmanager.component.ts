import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/services/user.service';
import { Router } from '@angular/router';
import { User } from 'src/app/shared/models/user';

@Component({
  selector: 'app-add-salesmanager',
  templateUrl: './add-salesmanager.component.html',
  styleUrls: ['./add-salesmanager.component.scss']
})
export class AddSalesmanagerComponent implements OnInit {

  constructor( 
    private userService: UserService,
    private router : Router
  ) { }

  ngOnInit() {
  }

  
  onAddSalesManager(first_name, last_name, email, password){
    if (!first_name || !last_name || !email || !password) {
      alert('please insert the required inputs')
    } else {
      // this.roleId=1;
      var role_id = 2;
      var role = '';
      var id=null;
      var validation = 0;
      this.userService.addSalesManager({ id, first_name, last_name, email, password, role_id, role, validation }  as User).subscribe(
        res => {
          

          // this.toastr.success('Your account has been successfully created');
          alert("Sales Manager Added Successfully");
          this.router.navigate(['/superadmin/accounts-list']); 
   
        }
      );



    }
  }

}
