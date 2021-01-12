import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MyAccountService {

  constructor(private http: HttpClient) { }


  EditAcount(id,data: any){
    return this.http.post(`${environment.baseUrl}/update/user/${id}`, data,{
        params: {
          token: localStorage.getItem('token')
        }
    });
   }
}
