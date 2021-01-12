import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class SalesmanagerService {
  constructor(private http: HttpClient) { }
  getSalesManagerByEmail(data: any) {
    return this.http.post(`${environment.baseUrl}/supplier/salesmanager/search`, data, {
      params: {
        token: localStorage.getItem('token')
      }
    });
  }
  getAvailableShops(data) {
    return this.http.post(`${environment.baseUrl}/supplier/shop/search`, data, {
      params: {
        token: localStorage.getItem('token')
      }
    });
  }
  addSalesmanagertoSupplierList(salesmanager_id: any) {
    return this.http.post(`${environment.baseUrl}/supplier/salesmanager`, { salesmanager_id }, {
      params: {
        token: localStorage.getItem('token')
      }
    });
  }
}
