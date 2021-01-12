import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHandler, HttpHeaders } from "@angular/common/http";
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
}
@Injectable({
  providedIn: 'root'
})
export class ShopmanagerService {
  constructor(private http: HttpClient) { }
  getallshopmanagers() {
    return this.http.get(`${environment.baseUrl}/users/GetUserByRole/4`)
  }
  saveShopmanager(shopmanager: any) {
    return this.http.post(`${environment.baseUrl}/addshopmanager`, shopmanager, httpOptions);
  }
  updateShopmanager(shopmanager: any) {
    const url = `${environment.baseUrl}/users/${shopmanager.id}`;
    return this.http.put(`${environment.baseUrl}/users`, shopmanager, httpOptions);
  }
  AddNewShopmanager(data: any) {
    return this.http.post(`${environment.BaseUrlS2C}/manager`, data, {
      params: {
        token: localStorage.getItem('token'),
        store_id: localStorage.getItem('store_id')
      }
    });
  }
  getShopmangerList() {
    return this.http.get(`${environment.BaseUrlS2C}/managers/list`, {
      params: {
        token: localStorage.getItem('token'),
        store_id: localStorage.getItem('store_id'),
      }
    })
  }
  getShopmangerById(id) {
    return this.http.get(`${environment.BaseUrlS2C}/manager/${id}`, {
      params: {
        token: localStorage.getItem('token'),
      }
    })
  }
  assignRelation(_chain_id, _manager_id) {
    return this.http.put(`${environment.BaseUrlS2C}/Chain/Manager`, {},
      {
        params: {
          token: localStorage.getItem('token'),
          chain_id: _chain_id,
          manager_id: _manager_id
        }
      });
  }
  getSupplierShopManagers() {
    return this.http.get(`${environment.baseUrl}/dashboard/shops`, {
      params: {
        token: localStorage.getItem('token')
      }
    });
  }
  updateManager(id, data: any) {
    return this.http.post(`${environment.BaseUrlS2C}/manager/update/${id}`, data, {
      params: {
        token: localStorage.getItem('token'),
      }
    });
  }
}
