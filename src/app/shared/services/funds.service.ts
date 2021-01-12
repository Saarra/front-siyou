import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FundsService {

  constructor(
    private http : HttpClient
  ) { }

  getFundsCheque(){
    
    return this.http.get(`${environment.baseUrl}/funds/check`, {
      params:{
        token : localStorage.getItem('token')
      }
    });
  }
  editPurchasedFund(data,id){
    return this.http.post(`${environment.baseUrl}/payment/fund/${id}`, data , {
      params:{
        token: localStorage.getItem('token')
      }
    })
  }
  getPurchasedFundById(id){
    return this.http.get(`${environment.baseUrl}/payment/fund/list/${id}`, {
      params:{
        token: localStorage.getItem('token'),
      }
    })
  }
  getFundsTransfert(){
    
    return this.http.get(`${environment.baseUrl}/funds/transfert`, {
      params: {
        token: localStorage.getItem('token')
      }
    });
  }

  getFundsDelivery(){

    return this.http.get(`${environment.baseUrl}/funds/delivery`, {
      params:{
        token: localStorage.getItem('token')
      }
    });

  }

  getFundById(id : number){
     
    return this.http.get(`${environment.baseUrl}/funds/${id}`, {
      params:{
        token: localStorage.getItem('token')
      }
    });
  }
  getPaymentMethod(){
    return this.http.get(`${environment.baseUrl}/payment/method`, {
      params:{
        token: localStorage.getItem('token'),
      }
    })
  }
  addPaymentMethod(data){
    return this.http.post(`${environment.baseUrl}/payment/method`,data, {
      params:{
        token: localStorage.getItem('token')
      }
    })
  }
  deletePaymentMethod(id){
    return this.http.delete(`${environment.baseUrl}/payment/method/${id}` ,{
      params:{
        token: localStorage.getItem('token')
      }
    })
  }
  editPaymentMethod(data,id){
    return this.http.post(`${environment.baseUrl}/payment/method/${id}`, data , {
      params:{
        token: localStorage.getItem('token')
      }
    })
  }
  getPaymentMethodById(id){
    return this.http.get(`${environment.baseUrl}/payment/method/list/${id}`, {
      params:{
        token: localStorage.getItem('token'),
      }
    })
  }
  getFiltredPurchasedFundB2B(_created_at?,_payment_method?,_finish_date?){
  
    if(_created_at == 0 || !_created_at){
      _created_at = ''
    }
    if(_payment_method == 0 || !_payment_method){
      _payment_method = ''
    }
     if(_finish_date == 0 || !_finish_date){
      _finish_date = ''
    }
   
   
    return this.http.get(`${environment.baseUrl}/payment/fund/list`, {
      params:{
        token: localStorage.getItem('token'),
        created_at:_created_at,
        payment_method:_payment_method,
        finish_date:_finish_date,
      }
    })
  }
  getPurchasedFundB2B(){
    return this.http.get(`${environment.baseUrl}/payment/fund/list`, {
      params:{
        token: localStorage.getItem('token')
      }
    })
  }
  deletePurchasedFund(id){
    return this.http.delete(`${environment.baseUrl}/payment/fund/${id}` ,{
      params:{
        token: localStorage.getItem('token')
      }
    })
  }
  addFundsPaymentMethod(data){
    return this.http.post(`${environment.baseUrl}/payment/fund`,data, {
      params:{
        token: localStorage.getItem('token')
      }
    })
  }
}
