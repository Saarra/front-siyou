import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(
    private http: HttpClient
  ) { }

  getPaymentTypesList(){
    return this.http.get(`${environment.baseUrl}/payment/list`, {
      params: {
        token: localStorage.getItem('token')
      }
    });
  }
}
