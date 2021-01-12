import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChainService {

  constructor(
    private http: HttpClient
  ) { }

  getChainList(){
    return this.http.get(`${environment.BaseUrlS2C}/Chain/List`, {
      params: {
        token: localStorage.getItem('token'),
        store_id: localStorage.getItem('store_id'),

      }
    })
  }
  blockManager(id, data?){
  return this.http.post(`${environment.BaseUrlS2C}/manager/deactivate/${id}`,data , {
    params: {
      token: localStorage.getItem('token'),
    }
  })
}
  getChainsList(){
    return this.http.get(`${environment.BaseUrlS2C}/chains`, {
      params: {
        token: localStorage.getItem('token'),
        store_id: localStorage.getItem('store_id'),

      }
    })
  }
  AddNewChain(data: any){
    return this.http.post(`${environment.BaseUrlS2C}/Chain`, data, {
      params: {
        token: localStorage.getItem('token'),
        store_id: localStorage.getItem('store_id')

      }
    })

  }
  updateNewChain(id,data: any){
    return this.http.post(`${environment.BaseUrlS2C}/Chain/${id}`, data, {
      params: {
        token: localStorage.getItem('token'),
      }
    })

  }
  getChainById(id){
    return this.http.get(`${environment.BaseUrlS2C}/Chain/List/${id}`, {
      params: {
        token: localStorage.getItem('token'),
      }
    })
  }

}
