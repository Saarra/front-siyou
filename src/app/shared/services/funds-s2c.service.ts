import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { env } from 'process';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class FundsS2cService {

  constructor(
    private http: HttpClient
  ) { }

  getFundsCash(_chain_id?, _date?){
    return this.http.get(`${environment.BaseUrlS2C}/funds/cash`, {
      params:{
        token: localStorage.getItem('token'),
        chain_id: _chain_id,
        date: _date
      }
    })
  }

  getFundsCard(_chain_id?, _date?){
    return this.http.get(`${environment.BaseUrlS2C}/funds/card`, {
      params:{
        token: localStorage.getItem('token'),
        chain_id: _chain_id,
        date: _date
      }
    })
  }


  getFundsCheck(_chain_id?, _date?){
    return this.http.get(`${environment.BaseUrlS2C}/funds/check`, {
      params:{
        token: localStorage.getItem('token'),
        chain_id: _chain_id,
        date: _date
      }
    })
  }

  getFundsCheckStatistics(_chain_id?, _date?){
    return this.http.get(`${environment.BaseUrlS2C}/funds/statistic/check`, {
      params:{
        token: localStorage.getItem('token'),
        chain_id: _chain_id,
        date: _date
      }
    });
  }

  getFundsCashStatistics(_chain_id?, _date?){
    return this.http.get(`${environment.BaseUrlS2C}/funds/statistic/cash`, {
      params:{
        token: localStorage.getItem('token'),
        chain_id: _chain_id,
        date: _date
      }
    })
  }


  getFundsCardStatistics(_chain_id?, _date?){
    return this.http.get(`${environment.BaseUrlS2C}/funds/statistic/card`, {
      params:{
        token: localStorage.getItem('token'),
        chain_id: _chain_id,
        date: _date
      }
    })
  }
  addFundsPaymentMethod(data){
    return this.http.post(`${environment.BaseUrlS2C}/payment/fund`,data, {
      params:{
        token: localStorage.getItem('token')
      }
    })
  }

  getPurchasedFund(){
    return this.http.get(`${environment.BaseUrlS2C}/payment/fund/list`, {
      params:{
        token: localStorage.getItem('token'),
      }
    })
  }
  getPurchasedFundById(id){
    return this.http.get(`${environment.BaseUrlS2C}/payment/fund/list/${id}`, {
      params:{
        token: localStorage.getItem('token'),
      }
    })
  }
  getFiltredPurchasedFund(_chain_id?,_created_at?,_payment_method?,_finish_date?,supplier_name?,status?){
    if(_chain_id == 0 || !_chain_id){
      _chain_id = ''
    }
    if(_created_at == 0 || !_created_at){
      _created_at = ''
    }
    if(_payment_method == 0 || !_payment_method){
      _payment_method = ''
    }
     if(_finish_date == 0 || !_finish_date){
      _finish_date = ''
    }
   
    if(supplier_name == 0 || !supplier_name){
      supplier_name = ''
    }
    if(status == 0 || !status){
      status = ''
    }
    return this.http.get(`${environment.BaseUrlS2C}/payment/fund/list`, {
      params:{
        token: localStorage.getItem('token'),
        chain_id:_chain_id,
        created_at:_created_at,
        payment_method:_payment_method,
        finish_date:_finish_date,
        supplier_name:supplier_name,
        status :status
      }
    })
  }
editPurchasedFund(data,id){
  return this.http.post(`${environment.BaseUrlS2C}/payment/fund/${id}`, data , {
    params:{
      token: localStorage.getItem('token')
    }
  })
}
deletePurchasedFund(id){
  return this.http.delete(`${environment.BaseUrlS2C}/payment/fund/${id}` ,{
    params:{
      token: localStorage.getItem('token')
    }
  })
}
cancelPurchasedFund(id,data?){
  return this.http.post(`${environment.BaseUrlS2C}/payment/fund/cancel/${id}` ,data ,{
    params:{
      token: localStorage.getItem('token')
    }
  })
}
getPaymentMethod(chain_id?){
  return this.http.get(`${environment.BaseUrlS2C}/payment/method`, {
    params:{
      token: localStorage.getItem('token'),
      chain_id:chain_id
    }
  })
}
addPaymentMethod(data){
  return this.http.post(`${environment.BaseUrlS2C}/payment/method`,data, {
    params:{
      token: localStorage.getItem('token')
    }
  })
}
deletePaymentMethod(id){
  return this.http.delete(`${environment.BaseUrlS2C}/payment/method/${id}` ,{
    params:{
      token: localStorage.getItem('token')
    }
  })
}
editPaymentMethod(data,id){
  return this.http.post(`${environment.BaseUrlS2C}/payment/method/${id}`, data , {
    params:{
      token: localStorage.getItem('token')
    }
  })
}
getPaymentMethodById(id){
  return this.http.get(`${environment.BaseUrlS2C}/payment/method/${id}`, {
    params:{
      token: localStorage.getItem('token'),
    }
  })
}
getFiltredPurchasedFundB2B(_created_at?,_payment_method?,_finish_date?){

  if(_created_at == 0 || !_created_at){
    _created_at = ''
  }
  if(_payment_method == 0 || !_payment_method){
    _payment_method = ''
  }
   if(_finish_date == 0 || !_finish_date){
    _finish_date = ''
  }
 
 
  return this.http.get(`${environment.baseUrl}/payment/fund/list`, {
    params:{
      token: localStorage.getItem('token'),
      created_at:_created_at,
      payment_method:_payment_method,
      finish_date:_finish_date,
    }
  })
}
getPurchasedFundB2B(){
  return this.http.get(`${environment.baseUrl}/payment/fund/list`, {
    params:{
      token: localStorage.getItem('token')
    }
  })
}
getstatFunds(data){
  return this.http.post(`${environment.BaseUrlS2C}/stat/fund`,data, {
    params:{
      token: localStorage.getItem('token')
    }
  })
}

getStatFunds(data: any){
  return this.http.post(`${environment.BaseUrlS2C}/stat/fund`, data, {
    params:{
      token: localStorage.getItem('token')
    }
  });
}
getStatFundsPur(data: any){
  return this.http.post(`${environment.BaseUrlS2C}/stat/fund/purchase`, data, {
    params:{
      token: localStorage.getItem('token')
    }
  });
}
}
