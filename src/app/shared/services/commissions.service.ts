import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpErrorResponse, HttpEventType, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Commission } from '../models/commission.model';



const httpOptions = {
  headers: new HttpHeaders({'Content-Type':'application/json'})
}


@Injectable({
  providedIn: 'root'
})
export class CommissionsService {

  constructor(private http: HttpClient) { }

 

  public getallCommissions() {
    return this.http.get<Commission[]>(`${environment.baseUrl}/siyoucommissions`, {
      params: {
        token: localStorage.getItem('token')
      }
    });
  }

  public addCommissionToSupplier(){
    return this.http.post<Commission>(`${environment.baseUrl}/commissions`, {
      params: {
        token: localStorage.getItem('token')
      }
    });
  }

  public AffectCommissionToSupplier(data: any){
    return this.http.post(`${environment.baseUrl}/siyoucommissions`, data ,{
      params : {
        token: localStorage.getItem('token')
      }
    })
  }

  getCommissionShop(){
    return this.http.get(`${environment.baseUrl}/commissions/shop`, {
      params: {
        token: localStorage.getItem('token')
      }
    });
  }

  getCommissionProducts(){
    return this.http.get(`${environment.baseUrl}/commissions/items`, {
      params: {
        token: localStorage.getItem('token')
      }
    });
  }

  addShopCommission(data){
    return this.http.post(`${environment.baseUrl}/commissions`, data, {
      params:{
        token: localStorage.getItem('token')
      }
    });
  }

  addProductsCommission(data){
    return this.http.post(`${environment.baseUrl}/commissions`, data, {
      params:{
        token: localStorage.getItem('token')
      }
    });
  }
}
