import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PurchaseService {

  constructor(
    private http: HttpClient
  ) { }

  getPurchasedProdsList(){
    return this.http.get(`${environment.baseUrl}/products/purchased/list`, {
      params: {
        token: localStorage.getItem('token')
      }
    });
  }
  getPurchaseById(id){
    return this.http.get(`${environment.BaseUrlS2C}/quick/purchase/${id}`, {
      params: {
        token: localStorage.getItem('token')
      }
    });
  }


  addPurchasedQuick(data:any){
    return this.http.post(`${environment.BaseUrlS2C}/quick/purchase`, data,  {
      params:{
        token: localStorage.getItem('token')
      } 
    });
  }
  confirmPurchasedQuick(id:any,data?:any){
    return this.http.post(`${environment.BaseUrlS2C}/quick/purchase/confirm/${id}`, data,  {
      params:{
        token: localStorage.getItem('token')
      } 
    });
  }
  addpurchasetostock(id,data?:any){
    return this.http.post(`${environment.BaseUrlS2C}/quick/purchase/stock/${id}`, data,  {
      params:{
        token: localStorage.getItem('token')
      } 
    });
  }


  deleteOderQuick(id:any,data?:any) {
    return this.http.post(`${environment.BaseUrlS2C}/quick/purchase/order/delete/${id}`, data,  {
      params:{
        token: localStorage.getItem('token')
      } 
    });
  }
  editPurchasedQuick(id:any,data?:any){
    return this.http.post(`${environment.BaseUrlS2C}/quick/purchase/product/update/${id}`, data,  {
      params:{
        token: localStorage.getItem('token')
      } 
    });
  }
}
