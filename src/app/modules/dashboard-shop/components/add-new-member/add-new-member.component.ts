import { Component, OnInit } from '@angular/core';
import { MemberService } from 'src/app/shared/services/member.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { FormBuilder, Validators } from '@angular/forms';
import { ChainService } from 'src/app/shared/services/chain.service';
import { LevelmembershipService } from 'src/app/shared/services/levelmembership.service';
import { DatePipe } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-add-new-member',
  templateUrl: './add-new-member.component.html',
  styleUrls: ['./add-new-member.component.scss']
})
export class AddNewMemberComponent implements OnInit {
  chainList;
  chainData;
  levelList;
  levelData;
  form;
  genderSelected: string;
  genders: string[] = ['Male', 'Female'];
  gendersCH: string[] = ['男', '女'];
  gendersIT: string[] = ['Maschia', 'Femmina'];
  gendersFR: string[] = ['Homme', 'Femme'];
  activations: string[] = ['Activate', 'Desactivate'];
  activationsCH: string[] = ['激活', '停用'];
  activationsFR: string[] = ['Activation', 'Désactiver'];
  activationsIT: string[] = ['Attivazione', 'Disattivare'];
  selectedActivation: string;
  constructor(
    private memberService: MemberService,
    private router: Router,
    private snackbar: MatSnackBar,
    private formBuilder: FormBuilder,
    private chainService: ChainService,
    private levelmembershipService: LevelmembershipService,
    public datepipe: DatePipe,
    public translate: TranslateService

  ) {
  }
  ngOnInit() {
    this.form = this.formBuilder.group({
      chain_id: ['', Validators.required],
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      gender: ['', Validators.required],
      contact: ['', Validators.required],
      email: ['', Validators.required],
      card_num: ['', Validators.required],
      points: ['', Validators.required],
      level_id: ['', Validators.required],
    });
    this.ongetChainList();
    this.ongetLevelList();
    var el = document.getElementById("gender");
  }
  redirectTo(uri: string) {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      this.router.navigate([uri]));
  }
  ongetChainList() {
    return this.chainService.getChainList().subscribe(
      res => {
        this.chainList = res;
        this.chainData = this.chainList.data;
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
  onAddMember(chain_id, first_name, last_name, gender, contact, email, card_num, points, level_id) {
    if (!first_name || !last_name || !gender || !chain_id || !email || !card_num || !points || !level_id || !contact) {
      alert('please insert the required inputs')
    } else {
      var _member = {
        chain_id: chain_id,
        first_name: first_name,
        last_name: last_name,
        gender: gender,
        contact: contact,
        email: email,
        card_num: card_num,
        points: points,
        level_id: level_id,
        store_id: localStorage.getItem('store_id')
      }
      this.memberService.addNewMember(_member).subscribe(
        res => {
          this.snackbar.open(this.translate.currentLang === 'Chinese' ? "会员已成功添加":this.translate.currentLang === 'Italian' ? "Membro aggiunto con successo":'Member Added Successfully', '',
            {
              duration: 2000
            });
          this.router.navigate(['/shop/membership-management']);
        }, err => {
          console.log(err);;
        }
      );
    }
  }
  _
  submit(_card_num, _contact, _first_name, _last_name, _birthday, _level_id, _id_card, _email, _adress, _card_barcode, _remarks, _points, _expiration_date) {
    var isActive = 0;
    if (this.selectedActivation == 'Activation') {
      isActive = 1;
    }
    var birthdate = this.datepipe.transform(_birthday, 'yyyy-MM-dd');
    var expirationDate = this.datepipe.transform(_expiration_date, 'yyyy-MM-dd');
    const FullMember = {
      store_id: localStorage.getItem('store_id'),
      first_name: _first_name,
      last_name: _last_name,
      gender: this.genderSelected,
      contact: _contact,
      email: _email,
      card_num: _card_num,
      points: _points,
      level_id: _level_id,
      expiration_date: expirationDate,
      birthday: birthdate,
      remarks: _remarks,
      id_card: _id_card,
      is_active: isActive,
      card_barcode: _card_barcode
    }
    this.memberService.addNewMember(FullMember).subscribe(
      res => {
        this.snackbar.open(this.translate.currentLang === 'Chinese' ? "会员信息已成功更新":this.translate.currentLang === 'Italian' ? "Membro aggiornato con successo":'Member Updated Successfully', '',
          {
            duration: 2000
          });
        this.router.navigate(['/shop/membership-management']);
      }, err => {
        console.log(err);;
      }
    );
  }
  genderSelection(gender) {
    this.genderSelected = gender;
  }
  activationSelection(activation) {
    this.selectedActivation = activation;
  }
}
