import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class OnlineService {

  constructor(    private http : HttpClient
    ) {
    
   }
   getStoreId(store_name){
    return this.http.get(`${environment.baseUrlOnline}/stores/byname/${store_name}`
    );
  }
  addOnlineProducts(data){
    return this.http.post(`${environment.baseUrlOnline}/products/create/`, data
    );
  }

}
