import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class AdvertisementService {

  constructor(private http : HttpClient) { }

  GetPhotos(_chain_id?){
    return this.http.get(`${environment.BaseUrlS2C}/ads`,{
      params:{
        token :localStorage.getItem('token'),
        chain_id : _chain_id
      }
    });
  }
  addPhotos(_chain_id,data){
    return this.http.post(`${environment.BaseUrlS2C}/ads`,data,{
      params:{
        token :localStorage.getItem('token'),
        chain_id : _chain_id
      }
    });
  }
  deleteImage(id){
    return this.http.delete(`${environment.BaseUrlS2C}/ads/${id}`,{
      params:{
        token :localStorage.getItem('token'),
      }
    });
  }


  addPhotosSuper(data){
    return this.http.post(`${environment.BaseUrlS2C}/ads`,data,{
      params:{
        token :localStorage.getItem('token'),
      }
    });
  }

}
