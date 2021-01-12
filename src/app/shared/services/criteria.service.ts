import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Criteria } from '../models/criteria.model';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class CriteriaService {
  constructor(private http: HttpClient) { }
  GetCriteriaList() {
    return this.http.get<Criteria[]>(`${environment.baseUrl}/Criteria/List`, {
      params: {
        token: localStorage.getItem('token')
      }
    });
  }
  AddCriteriaWithUnits(data: any) {
    return this.http.post(`${environment.baseUrl}/Criteria`, data, {
      params: {
        token: localStorage.getItem('token')
      }
    });
  }
  AddCriteriaUnit(data: any) {
    return this.http.post(`${environment.baseUrl}/Criteria/Unit`, data, {
      params: {
        token: localStorage.getItem('token')
      }
    });
  }
  UpdateCriteria(id: number, data: any) {
    return this.http.put(`${environment.baseUrl}/Criteria/${id}`, data, {
      params: {
        token: localStorage.getItem('token')
      }
    });
  }
  deleteCriteria(id: number) {
    return this.http.delete(`${environment.baseUrl}/Criteria/${id}`, {
      params: {
        token: localStorage.getItem('token')
      }
    });
  }
}
