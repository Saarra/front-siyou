import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  

  constructor(private http : HttpClient) {}

  GetStats(){
    return this.http.get(`${environment.BaseUrlS2C}/dashboard`,{
      params:{
        token :localStorage.getItem('token')
      }
    });
  }
}
