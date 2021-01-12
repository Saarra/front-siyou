import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHandler, HttpHeaders } from "@angular/common/http";
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
}
@Injectable({
  providedIn: 'root'
})
export class ShopoperatorService {
  constructor(private http: HttpClient) { }
  AddNewShopoperator(data: any) {
    return this.http.post(`${environment.BaseUrlS2C}/operator`, data, {
      params: {
        token: localStorage.getItem('token'),
        store_id: localStorage.getItem('store_id')
      }
    });
  }
  getShopoperatorList() {
    return this.http.get(`${environment.BaseUrlS2C}/operators/list`, {
      params: {
        token: localStorage.getItem('token'),
        store_id: localStorage.getItem('store_id'),
      }
    })
  }
  getShopoperotorById(id) {
    return this.http.get(`${environment.BaseUrlS2C}/operator/${id}`, {
      params: {
        token: localStorage.getItem('token'),
      }
    })
  }
  updateOperator(id, data: any) {
    return this.http.post(`${environment.BaseUrlS2C}/operator/update/${id}`, data, {
      params: {
        token: localStorage.getItem('token'),
      }
    });
  }
}
