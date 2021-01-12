import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  orderSubject = new BehaviorSubject(null);
  constructor(private http: HttpClient) { }

  makeOrder(data: any) {
    return this.http.post(`${environment.baseUrl}/orders`, data, {
      params: {
        token: localStorage.getItem('token')
      }
    });
  }

  getShopOrders() {
    return this.http.get(`${environment.baseUrl}/orders/shop`, {
      params: {
        token: localStorage.getItem('token')
      }
    });
  }

  getSupplierOrders() {
    return this.http.get(`${environment.baseUrl}/orders/supplier`, {
      params: {
        token: localStorage.getItem('token')
      }
    });

  }


  getSalesmanagerOrders() {
    return this.http.get(`${environment.baseUrl}/orders/salesmanager`, {
      params: {
        token: localStorage.getItem('token')
      }
    });
  }

  subscribeToOrderUpdate(): BehaviorSubject<any> {
    return this.orderSubject;
  }

  updateOrderStatus(status, id) {
    return this.http.put(`${environment.baseUrl}/orders/${id}`, { status }, {
      params: {
        token: localStorage.getItem('token')
      }
    });
  }

  getInvalidOrders(){
    return this.http.get(`${environment.baseUrl}/orders/invalid`,
    {
      params: {
        token: localStorage.getItem('token')
      }
    });
  }

  getValidOrders(){
    return this.http.get(`${environment.baseUrl}/orders/valid`,
    {
      params:{
         token: localStorage.getItem('token')
    }} 
    );
  }

  getPaidOrders(){
    return this.http.get(`${environment.baseUrl}/orders/paid`,
    {
      params:{
         token: localStorage.getItem('token')
    }} 
    );
  }
  
  validateOrder(id:number, status: any){
    return this.http.put(`${environment.baseUrl}/orders/${id}`, status,
    {
      params: {
        token: localStorage.getItem('token')
        
      }
    });
  }

  getOrderById(id){
    return this.http.get(`${environment.baseUrl}/orders/${id}`,{
      params:{
        token: localStorage.getItem('token')
      }
    });
  }
}
