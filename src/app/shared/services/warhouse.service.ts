import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { environment } from 'src/environments/environment'; 

const httpOptions = {
  headers: new HttpHeaders({'Content-Type':'application/json'})
}
@Injectable({
  providedIn: 'root'
})

export class WarhouseService {

  constructor(private http: HttpClient) { }

  GetInventoriesListBySupp(warehouse_id,supplier_id?){
    if (supplier_id == 0 || !supplier_id) {
      supplier_id = '';
    }
    if (warehouse_id == 0 || !warehouse_id) {
      warehouse_id = '';
    }
      return this.http.get(`${environment.BaseUrlS2C}/inventory/list/${warehouse_id}`, {
        params: {
          token: localStorage.getItem('token'),
          supplier_id : supplier_id,
        }
      });
  }
  GetInventoriesListByBatch(warehouse_id,batch_number?){
    if (batch_number == 0 || !batch_number) {
      batch_number = '';
    }
    return this.http.get(`${environment.BaseUrlS2C}/inventory/list/${warehouse_id}`, {
      params: {
        token: localStorage.getItem('token'),
        batch_number:batch_number
      }
    });
}
GetInventoriesList(warehouse_id){
  return this.http.get(`${environment.BaseUrlS2C}/inventory/list/${warehouse_id}`, {
    params: {
      token: localStorage.getItem('token'),
    }
  });
}
GetInventoriesListB2B(warehouse_id){
  return this.http.get(`${environment.baseUrl}/inventory/list/${warehouse_id}`, {
    params: {
      token: localStorage.getItem('token'),
    }
  });
}
  
  GetWarehousesesList(_chain_id){
    return this.http.get(`${environment.BaseUrlS2C}/warehouses/${_chain_id}`, {
      params: {
        token: localStorage.getItem('token'),
        chain_id : _chain_id
      }
    });
  }
   
  GetWarehousesesListB2B(){
    return this.http.get(`${environment.baseUrl}/warehouses/list`, {
      params: {
        token: localStorage.getItem('token'),
        //store_id: localStorage.getItem('store_id'),

            }
    });
  }

GetStatusList() {
  return this.http.get(`${environment.BaseUrlS2C}/status`,{
    params: {
      token: localStorage.getItem('token')
    }
  });
}
GetStatusListB2B() {
  return this.http.get(`${environment.baseUrl}/status`,{
    params: {
      token: localStorage.getItem('token')
    }
  });
}
GetBatchNumber() {
  return this.http.post(`${environment.BaseUrlS2C}/inventory/batch/number` , httpOptions , {
    params: {
      token: localStorage.getItem('token')
    }
  });
}
getByBatch(data) {
  return this.http.post(`${environment.BaseUrlS2C}/inventory/batchweb`, data,  {
    params: {
      token: localStorage.getItem('token') ,
    }
  });
}
GetBatchNumberB2B() {
  return this.http.post(`${environment.baseUrl}/inventory/batch/number` , httpOptions , {
    params: {
      token: localStorage.getItem('token')
    }
  });
}
getInventoryById(id){
  return this.http.get(`${environment.BaseUrlS2C}/inventory/${id}`, {
    params: {
      token: localStorage.getItem('token')
    }
  });
}
getInventoryByIdB2B(id){
  return this.http.get(`${environment.baseUrl}/inventory/${id}`, {
    params: {
      token: localStorage.getItem('token')
    }
  });
}
exportInventory(id){

  return this.http.get(`${environment.BaseUrlS2C}/inventory/${id}`,
  {
    params:{
      token: localStorage.getItem('token'),
    }
  });
}
addInventory(data:any){
  return this.http.post(`${environment.BaseUrlS2C}/inventory`,data,
  {
    params:{
      token: localStorage.getItem('token'),
    }
  });
}
addInventoryB2B(data:any){
  return this.http.post(`${environment.baseUrl}/inventory`,data,
  {
    params:{
      token: localStorage.getItem('token'),
    }
  });
}
updateInventory(id,data:any){
  return this.http.put(`${environment.BaseUrlS2C}/inventory/${id}`,data,
  {
    params:{
      token: localStorage.getItem('token'),
    }
  });
}
updateInventoryB2B(id,data:any){
  return this.http.put(`${environment.baseUrl}/inventory/${id}`,data,
  {
    params:{
      token: localStorage.getItem('token'),
    }
  });
}

getWarehouseById(id){
  return this.http.get(`${environment.BaseUrlS2C}/warehouses/list/${id}`,
  {
    params:{
      token: localStorage.getItem('token'),
    }
  });
}
addWarehouse(data){
  return this.http.post(`${environment.BaseUrlS2C}/warehouses`,data,
  {
    params:{
      token: localStorage.getItem('token'),
    }
  });
}
updateWarehouse(id,data){
  return this.http.put(`${environment.BaseUrlS2C}/warehouses/${id}`,data,
  {
    params:{
      token: localStorage.getItem('token'),
    }
  });
}

addWarehouseB2B(data){
  return this.http.post(`${environment.baseUrl}/warehouses`,data,
  {
    params:{
      token: localStorage.getItem('token'),
    }
  });
}
editWarehouseB2B(data , id){
  return this.http.post(`${environment.baseUrl}/warehouses/${id}`,data,
  {
    params:{
      token: localStorage.getItem('token'),
    }
  });
}

getwarehousebyId(id , data?){
  return this.http.post(`${environment.baseUrl}/warehouses/${id}`,data,
  {
    params:{
      token: localStorage.getItem('token')
    }
  });
}
deleteWarehouse(id){
  return this.http.delete(`${environment.baseUrl}/warehouses/${id}`, {
    params: {
      token: localStorage.getItem('token'),
    }
  });
}
}
