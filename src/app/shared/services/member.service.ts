import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpErrorResponse, HttpEventType, HttpHeaders , HttpClientModule} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Member}from '../models/member.model';

import { Observable } from "rxjs/Observable";


@Injectable({
  providedIn: 'root'
})



export class MemberService {


 
  

  constructor(private http: HttpClient) { }


  addMember(member : Member): Observable<Member>{
    return this.http.post<Member>(`${environment.BaseUrlS2C}/Member`, member,
    {
      params:{
        token: localStorage.getItem('token'),
        store_id: localStorage.getItem('store_id')

      }
    });
  }


  addNewMember(member : any){
    
    return this.http.post<Member>(`${environment.BaseUrlS2C}/Member`, member,
    {
      params:{
        token: localStorage.getItem('token'),
        store_id: localStorage.getItem('store_id')

      }
    });
  }
  updateMember(id,member : any){
    return this.http.post<Member>(`${environment.BaseUrlS2C}/Member/update/${id}`, member,
    {
      params:{
        token: localStorage.getItem('token'),
        store_id: localStorage.getItem('store_id')
      }
    });
  }

  getMember(page?,_card_num?, _first_name?, _last_name?, _contact?, _level_id?,
    _gender?, _status?, _card_id?){

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

      if(_status == 2 || !_status){
        _status = ''
      }

      if(_gender == 0 || !_gender){
        _gender = ''
      }
      if(_level_id == 0 || !_level_id){
        _level_id = ''
      }
    return this.http.get(`${environment.BaseUrlS2C}/Member`, 
     
    {
      params:{
        page : page,
        token : localStorage.getItem('token'),
        store_id: localStorage.getItem('store_id'),
        card_num: _card_num,
        first_name : _first_name,
        last_name: _last_name,
        contact: _contact,
        level_id: _level_id,
        gender: _gender,
        status: _status,
        card_id: _card_id


      }
    }
    );

    
  }

  
  getInvalidMembers(_card_num?, _first_name?, _last_name?, _contact?, _level_id?,
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
    return this.http.get(`${environment.BaseUrlS2C}/Member/invalid`, 
     
    {
      params:{
        token : localStorage.getItem('token'),
        store_id: localStorage.getItem('store_id'),
        card_num: _card_num,
        first_name : _first_name,
        last_name: _last_name,
        contact: _contact,
        level_id: _level_id,
        gender: _gender,
        card_id: _card_id


      }
    }
    );

    
  }

  activateMember(id : any){
    
    return this.http.put(`${environment.BaseUrlS2C}/Member/${id}`,{},
    {
      params:{
        token: localStorage.getItem('token')
      }
    });
  }

  // http://siyou.tn/s2c/members/cart 


  exportBarcode(num){
    
    return this.http.get(`${environment.BaseUrlS2C}/members/cart`,
    {
      params:{
        token: localStorage.getItem('token'),
        store_id: localStorage.getItem('store_id'),
        num_cards: num

      }
    });
  }

  deleteMember(id){
    return this.http.delete(`${environment.BaseUrlS2C}/Member/${id}` ,
    {params:{token: localStorage.getItem('token')}});
  }
  getMemberById(id){
    return this.http.get(`${environment.BaseUrlS2C}/Member/list/${id}`,
    {params:{token: localStorage.getItem('token')}});
  }
 

}
