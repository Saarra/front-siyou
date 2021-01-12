import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog, MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { MemberService } from 'src/app/shared/services/member.service';
import { LevelmembershipService } from 'src/app/shared/services/levelmembership.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-invalid-members-list',
  templateUrl: './invalid-members-list.component.html',
  styleUrls: ['./invalid-members-list.component.scss']
})
export class InvalidMembersListComponent implements OnInit {
  dataSource = new MatTableDataSource();
  displayedColumns = ['memberName', 'gender', 'card_num', 'email','contact', 'points', 'date', 'level', 'activate' ];


  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;


  memberList;
  memberData;
  member;
  levelList;
  levelData;

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private membershipService: MemberService,
    private levelmembershipService: LevelmembershipService,
    private snackbar: MatSnackBar,
    public translate: TranslateService

  ) { }

  ngOnInit() {
    // this.ongetMemberList();
    this.filterMemberList();

    this.ongetLevelList();


    this.dataSource.paginator = this.paginator;

  }
  openAddNewMemberModal() {
    // this.dialog.open(AddNewMemberComponent)
  }


  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  ongetMemberList() {
    return this.membershipService.getMember().subscribe(
      res => {

        this.memberList = res;

      


        this.memberData = this.memberList.data;

        this.dataSource = new MatTableDataSource(this.memberData);



        this.displayedColumns =  ['memberName', 'gender', 'card_num', 'email','contact', 'points', 'date', 'level','activate' ];
   

     
      }, err => {
        console.log(err);

      }
    );
  }


  ongetLevelList() {
    return this.levelmembershipService.getLevelList().subscribe(
      res => {
        this.levelList = res;
        this.levelData = this.levelList.data;

      }, err => {
        console.log(err);

      }
    );
  }


  filterMemberList(_card_num?, _first_name?, _last_name?, _contact?, _level_id?,
    _gender?, _card_id?){
     
      if(!_card_num){
        _card_num = ''
      }
      if(!_first_name){
        _first_name = ''
      }
      if(!_last_name){
        _last_name = ''
      }
      if(!_contact){
        _contact = ''
      }
      if(!_card_id){
        _card_id = ''
      }

     

      if(_gender == 0 || !_gender){
        _gender = ''
      }
      if(_level_id == 0 || !_level_id){
        _level_id = ''
      }


      return this.membershipService.getInvalidMembers(_card_num, _first_name, _last_name, _contact, _level_id,
        _gender, _card_id).subscribe(
        res => {
  
          this.memberList = res;
  
  
  
          this.memberData = this.memberList.data;
  
          this.dataSource = new MatTableDataSource(this.memberData);
  
  
          this.displayedColumns =  ['memberName', 'gender', 'card_num', 'email','contact', 'points', 'date', 'level' ,'activate'];
  
        }, err => {
          console.log(err);
  
        }
      );
      



      

    
      
  }

  ResetForm(){
    // this.redirectTo(`/shop/invalid-members`);
    this.router.navigate(['/shop/invalid-members']);

  }

  redirectTo(uri:string){
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
    this.router.navigate([uri]));
 }

 onActivateMember(id){
  
   return this.membershipService.activateMember(id).subscribe(
     res=>{
      this.router.navigate(['/shop/invalid-members']);
      this.snackbar.open(this.translate.currentLang === 'Chinese' ? "该会员已成功确认":this.translate.currentLang === 'Italian' ? 'Membro convalidato con successo':'Member Validated Successfully', '',{

           duration: 2000
         });
     }, err => {
       console.log(err);;
     }
   );
 }


}
