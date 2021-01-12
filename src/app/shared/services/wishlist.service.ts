import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  constructor(
    private http: HttpClient
  ) { }

  getWishlist(){
    return this.http.get(`${environment.baseUrl}/products/wish/list`, {
      params:{
        token: localStorage.getItem('token')
      }
    });
  }


  
}
