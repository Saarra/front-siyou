import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  constructor(
    private http: HttpClient
  ) { }

  addStore(data: any){
    return this.http.post(`${environment.BaseUrlS2C}/store`, {data},{
      params: {
        token :localStorage.getItem('token')
      }
    });
  }
}
