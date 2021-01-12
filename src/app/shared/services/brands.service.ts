import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BrandsService {

  constructor(private http : HttpClient) {}

   GetBrands(){
     return this.http.get(`${environment.baseUrl}/Brand/List`,{
       params:{
         token :localStorage.getItem('token')
       }
     });
   }
   AddNewBrand(data: any){
     return this.http.post(`${environment.baseUrl}/Brand`, data, {
       params: {
         token: localStorage.getItem('token')
       }
     });
   }
   EditBrand(data: any , id:number){
     return this.http.put(`${environment.baseUrl}/Brand/${id}`, data,{
         params: {
           token: localStorage.getItem('token')
         }
     });
    }
   DeleteBrand(id: any){
     return this.http.delete(`${environment.baseUrl}/Brand/${id}`,{
       params:{
         token: localStorage.getItem('token')
       }
     });
   }

}
