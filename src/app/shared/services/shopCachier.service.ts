import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHandler, HttpHeaders } from "@angular/common/http";
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
}
@Injectable({
  providedIn: 'root'
})
export class ShopcachierService {
  constructor(private http: HttpClient) { }
  updateShopmanager(shopmanager: any) {
    const url = `${environment.baseUrl}/users/${shopmanager.id}`;
    return this.http.put(`${environment.baseUrl}/users`, shopmanager, httpOptions);
  }
  AddNewcachier(data: any) {
    return this.http.post(`${environment.BaseUrlS2C}/cachier`, data, {
      params: {
        token: localStorage.getItem('token'),
      }
    });
  }
  updateCashier(id, data: any) {
    return this.http.post(`${environment.BaseUrlS2C}/cachier/update/${id}`, data, {
      params: {
        token: localStorage.getItem('token'),
      }
    });
  }
  getCashierById(id) {
    return this.http.get(`${environment.BaseUrlS2C}/cachier/${id}`, {
      params: {
        token: localStorage.getItem('token'),
      }
    });
  }
  getcachiersList() {
    return this.http.get(`${environment.BaseUrlS2C}/cachiers/list`, {
      params: {
        token: localStorage.getItem('token'),
        store_id: localStorage.getItem('store_id'),
      }
    })
  }
  filtercachiersList(chain_id) {
    return this.http.get(`${environment.BaseUrlS2C}/cachiers/list`, {
      params: {
        token: localStorage.getItem('token'),
        store_id: localStorage.getItem('store_id'),
        chain_id: chain_id,
      }
    })
  }
  DeleteCashier(id) {
    return this.http.delete(`${environment.BaseUrlS2C}/cachier/delete/${id}`, {
      params: {
        token: localStorage.getItem('token'),
      }
    });
  }
}
