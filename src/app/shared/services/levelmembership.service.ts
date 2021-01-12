import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LevelmembershipService {

  constructor(
    private http: HttpClient
  ) { }

  getLevelList(){
    return this.http.get(`${environment.BaseUrlS2C}/level/list`, {
      params: {
        token: localStorage.getItem('token'),
        store_id: localStorage.getItem('store_id')
      }
    });
  }
  AddNewLevel(data: any){
    return this.http.post(`${environment.BaseUrlS2C}/level`, data, {
      params: {
        token: localStorage.getItem('token'),
        store_id: localStorage.getItem('store_id')

      }
    });
  }
  EditLevel(data: any , id:number){
    return this.http.put(`${environment.BaseUrlS2C}/level/${id}`, data,{

        params: {
          token: localStorage.getItem('token')  ,       
          store_id: localStorage.getItem('store_id')

        }
    });
   }
  DeleteLevel(id: any){
    return this.http.delete(`${environment.BaseUrlS2C}/level/${id}`,{
      params:{
        token: localStorage.getItem('token'),
        store_id: localStorage.getItem('store_id')

      }
    });
  }
}
