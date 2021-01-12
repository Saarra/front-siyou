import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class SupplierService {

  constructor(private http: HttpClient) { }

  getSupplierSalesManager() {
    return this.http.get(`${environment.baseUrl}/supplier/salesmanagers/shops`, {
      params: {
        token: localStorage.getItem('token')
      }
    })
  }

  getSupplierList() {
    return this.http.get(`${environment.baseUrl}/users/suppliers`, {
      params: {
        token: localStorage.getItem('token')
      }
    })
  }
  get_SupplierList() {
    return this.http.get<User[]>(`${environment.baseUrl}/siyoucommissions/GetsupplierswithCommission`, {
      params: {
        token: localStorage.getItem('token')
      }
    })
  }

  affectSalesmanagerToShop(data) {
    return this.http.post(`${environment.baseUrl}/supplier/shops`, data, {
      params: {
        token: localStorage.getItem('token')
      }
    })
  }

  updateSalesmanagerCommission(data: any) {
    return this.http.put(`${environment.baseUrl}/supplier/salesmanager`, data, {
      params: {
        token: localStorage.getItem('token')
      }
    })

  }

 
  
}
