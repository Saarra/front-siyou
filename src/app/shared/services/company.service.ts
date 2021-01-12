import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(
    private http: HttpClient
  ) { }

  getCompaniesList(){
    return this.http.get(`${environment.baseUrl}/companies`, {
      params:{
        token: localStorage.getItem('token')
      }
    });
  }
}
