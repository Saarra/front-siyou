import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { LevelmembershipService } from 'src/app/shared/services/levelmembership.service';
import { MemberService } from 'src/app/shared/services/member.service';

@Component({
  selector: 'app-shop-edit-member',
  templateUrl: './shop-edit-member.component.html',
  styleUrls: ['./shop-edit-member.component.scss']
})
export class ShopEditMemberComponent implements OnInit {
  currentMember;
  currentId;
  current;
  genderSelected : string;
  genders: string[] = ['Male', 'Female'];
  gendersCH: string[] = ['男', '女'];
  gendersIT: string[] = ['Maschia', 'Femmina'];
  gendersFR: string[] = ['Homme', 'Femme'];

  activations: string[] = ['Activate', 'Deactivate'];
  activationsCH: string[] = ['激活', '停用'];
  activationsFR: string[] = ['Activater', 'Désactiver'];
  activationsIT: string[] = ['Attivazione', 'Disattivare'];
  selectedActivation: string;
  constructor( private membershipService: MemberService , 
    public translate: TranslateService,
    private snackBar: MatSnackBar,
    private routerAct: ActivatedRoute,
    private router: Router,
    private levelmembershipService: LevelmembershipService,
    public datepipe: DatePipe,

    ) { 
      routerAct.params.subscribe(
        params=>{
          this.currentId = params.id; 
        }
      )
    }

  ngOnInit() {
    this.getMemberById(this.currentId);
    this.ongetLevelList() ;
  }
getMemberById(currentId){
      return this.membershipService.getMemberById(currentId).subscribe(
          res => {
            this.current=res;
            this.currentMember= this.current.data
          
          }), err => {
            console.log(err);;
          }
     }
     levelData;
     levelList;
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
  
  genderSelection(gender){
  
    this.genderSelected=gender;
   

  }
  activationSelection(activation){
    this.selectedActivation = activation;

    
  }
  submit(_card_num, _contact, _first_name, _last_name, _birthday, _level_id, _id_card, _email, _adress, _card_barcode, _remarks, _points, _expiration_date,gender , is_active) {
     
    var birthdate =this.datepipe.transform(_birthday, 'yyyy-MM-dd'); 
    var expirationDate= this.datepipe.transform(_expiration_date, 'yyyy-MM-dd'); 

    const FullMember={
      store_id: localStorage.getItem('store_id'),
      first_name: _first_name,
      last_name: _last_name,
      gender: gender,
      contact: _contact,
      email: _email,
      card_num: _card_num,
      points: _points,
      level_id: _level_id,
      expiration_date: expirationDate,
      birthday: birthdate,
      remarks: _remarks,
      id_card: _id_card,
      is_active: is_active,
      card_barcode: _card_barcode,
      adress:_adress
    }

    this.membershipService.updateMember(this.currentId,FullMember).subscribe(
      res => {
        ;
        this.snackBar.open(this.translate.currentLang === 'Chinese' ? "会员已成功添加":this.translate.currentLang === 'Italian' ? "Membro aggiunto con successo":'Member Added Successfully', '',
          {
            duration: 1000
          });
        this.router.navigate(['/shop/membership-management']);
      }, err => {
        console.log(err);;
      }
    );


}
}
