import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class OrderServiceService {

  constructor(
    private http : HttpClient
  ) { }

  getShopValidOrders(){
    return this.http.get(`${environment.baseUrl}/orders/shop/valid` , {
      params: {
        token : localStorage.getItem('token')
      }
    });
  }

  getShopInvalidOrders(){
    return this.http.get(`${environment.baseUrl}/orders/shop/invalid` , {
      params: {
        token : localStorage.getItem('token')
      }
    });
  }

  getShopPaidOrders(){

    return this.http.get(`${environment.baseUrl}/orders/shop/paid` , {
      params: {
        token : localStorage.getItem('token')
      }
    });

  }

  getOrderById(id){
    return this.http.get(`${environment.baseUrl}/orders/${id}`,{
      params:{
        token: localStorage.getItem('token')
      }
    });
  }

  validatePurchaseOrder(data){
    return this.http.post(`${environment.baseUrl}/orders`, data,{
      params:{
        token: localStorage.getItem('token')
      }
    });
  }
  
  getPreOrders(){
    return this.http.get(`${environment.BaseUrlS2C}/purchase/order`,{
      params: {
        token: localStorage.getItem('token')
      }
    });
  }
  filterValidOrders(supplier?){
    return this.http.get(`${environment.baseUrl}/orders/shop/valid` , {
      params: {
        token : localStorage.getItem('token'),
        supplier_id : supplier,
            }
    });
  }
  filterInvalidOrders(supplier?){
    return this.http.get(`${environment.baseUrl}/orders/shop/invalid` , {
      params: {
        token : localStorage.getItem('token'),
        supplier_id : supplier,
            }
    });
  }
  filterPaidOrders(supplier?){
    return this.http.get(`${environment.baseUrl}/orders/shop/paid` , {
      params: {
        token : localStorage.getItem('token'),
        supplier_id : supplier,
            }
    });
  }
  filtrePreOrders(_order_ref){
    return this.http.get(`${environment.BaseUrlS2C}/purchase/order/${_order_ref}` , {
      params: {
        token : localStorage.getItem('token'),
        order_ref : _order_ref

            }
    });
  }
  
  uploadPreOrders(data){
    
    return this.http.post(`${environment.BaseUrlS2C}/purchase/upload/order`, data ,{
       params: {
             token : localStorage.getItem('token')}
       })
}





private handleError(error: any): Promise<any> {
  console.error('An error occurred', error); // for demo purposes only
  return Promise.reject(error.message || error);
}

  getOrdersCashRegister(page){
    return this.http.get(`${environment.BaseUrlS2C}/orders/list1`,{
      params: {
        token: localStorage.getItem('token'),
        page:page 
      }
    });
  }
  getStatOrdQuant(data: any){
    return this.http.post(`${environment.BaseUrlS2C}/stat/order/quantity`, data, {
      params:{
        token: localStorage.getItem('token')
      }
    });
  }
  filtreOrders(page?,_chain_id?,_payment_method_id?,startdate?,cashier_id?){
    if(_chain_id == 0 || !_chain_id){
      _chain_id = ''
    }
    if(_payment_method_id == 0 || !_payment_method_id){
      _payment_method_id = ''
    }
    if(startdate == 0 || !startdate){
      startdate = ''
    }
    if(startdate == 0 || !startdate){
      cashier_id = ''
    }
    
    return this.http.get(`${environment.BaseUrlS2C}/orders/list1`,{
      params: {
        token: localStorage.getItem('token'),
        chain_id : _chain_id,
        payment_method_id:_payment_method_id,
        start_date:startdate,
        page:page,
        cashier_id:cashier_id
        //end_date : _end_date
        
      }
    })
  }
  getPaymentTypesList(){
    return this.http.get(`${environment.BaseUrlS2C}/paymentmethods`, {
      params: {
        token: localStorage.getItem('token')
      }
    });
  }


  getStatOrderQuantity(data: any){
    return this.http.post(`${environment.BaseUrlS2C}/stat/order/quantity`, data, {
      params:{
        token: localStorage.getItem('token')
      }
    });
  }

  
  getStatOrderAmount(data: any){
    return this.http.post(`${environment.BaseUrlS2C}/stat/order/amount/shop`, data, {
      params:{
        token: localStorage.getItem('token')
      }
    });
  }
  getStatOrderAmountCashier(data: any){
    return this.http.post(`${environment.BaseUrlS2C}/stat/order/amount/cashier`, data, {
      params:{
        token: localStorage.getItem('token')
      }
    });
  }


  
}
