import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';



export interface UserData {
  id: string;
  name: string;
  progress: string;
  color: string;
}




/** Constants used to fill up our data base. */
const COLORS: string[] = [
  'Logistician', 'Translator', 'Salesman', 'Président', 'SuperAdmin'
];
const NAMES: string[] = [
  'Maia', 'Asher', 'Olivia', 'Atticus', 'Amelia', 'Jack', 'Charlotte', 'Theodore', 'Isla', 'Oliver',
  
];

const LAST_NAMES: string[] = [
  'Maia', 'Asher', 'Olivia', 'Atticus', 'Amelia', 'Jack', 'Charlotte', 'Theodore', 'Isla', 'Oliver',
  
];

const EMAILS: string[] = [
  'ahmed@gmail.com', 'yassine@gmail.com', 'imedbenali@hotmail.com', 'ihebsalhi@gmail.com', 'imenbenali@hotmail.com'
  
];


@Component({
  selector: 'app-supplier-account-management',
  templateUrl: './supplier-account-management.component.html',
  styleUrls: ['./supplier-account-management.component.scss']
})


export class SupplierAccountManagementComponent implements OnInit {

  
 
  constructor() {
    
  }

  ngOnInit() {
    
  }


  
}