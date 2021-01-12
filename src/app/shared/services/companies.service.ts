import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CompaniesService {

  constructor(private http: HttpClient) { }

  getLogisticCompaniesList(weight: any) {
    return this.http.get(`${environment.baseUrl}/companies`, {
      params: {
        token: localStorage.getItem('token'),
        weight
      }
    });

  }
}
