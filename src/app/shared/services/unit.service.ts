import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Unit } from '../models/unit.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UnitService {

  constructor(private http: HttpClient) { }
  

  GetUnit(){
    return  this.http.get<Unit>(`${environment.baseUrl}/Criteria/Unit`, {
      params: {
        token: localStorage.getItem('token')
      }
    });
  }
  UpdateUnit(id:number, data:any){
    return  this.http.put(`${environment.baseUrl}/Criteria/${id}/Unit`, data,{
      params: {
        token: localStorage.getItem('token')
      }
    });
  }
  DeleteUnit(id:number){
    return this.http.delete(`${environment.baseUrl}/Criteria/${id}/Unit`, {
      params :{
        token: localStorage.getItem('token')
      }
    });
  }
}
