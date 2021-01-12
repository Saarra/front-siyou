import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DiscountService {

  constructor(
    private http: HttpClient
  ) { }

  getDiscountTypes(){

    return this.http.get(`${environment.baseUrl}/discount/list`, {
      params: {
        token: localStorage.getItem('token')
      }
    });
  }
  
  getDiscountList(_keyword?, _barcode?){

    if(!_keyword){
      _keyword='';
    }

    if(!_barcode){
      _barcode='';
    }
    
    return this.http.get(`${environment.baseUrl}/products/items/discount`,
    {
      params: {
        token: localStorage.getItem('token'),
        keyword: _keyword,
        barcode: _barcode
        
      }
    });
  }

  getDiscountListS2c(_chain_id?,_start_date?,_end_date?,discount?){
    if(!_chain_id || _chain_id ==0){
   _chain_id =''
     }
    if(!_start_date || _start_date ==0){
      _start_date =''
    }
    if(!_end_date || _end_date ==0){
      _end_date =''
    }
    if(!discount || discount ==0){
      discount =''
    }
    return this.http.get(`${environment.BaseUrlS2C}/promotion/web`,
    {
      params: {
        token: localStorage.getItem('token'),
        chain_id: _chain_id,
        start_date : _start_date,
        end_date : _end_date,
        discount_id : discount
      }
    });
  }

  getPromotedListS2c(_chain_id?,_start_date?,_end_date?,category_id?,barcode?,keyword?){
    if(!_chain_id || _chain_id ==0){
   _chain_id =''
     }
    if(!_start_date || _start_date ==0){
      _start_date =''
    }
    if(!_end_date || _end_date ==0){
      _end_date =''
    }
    if(!category_id || category_id ==0){
      category_id =''
    }
    if(!barcode || barcode ==0){
      barcode =''
    }
    if(!keyword || keyword ==0){
      keyword =''
    }
    return this.http.get(`${environment.BaseUrlS2C}/promotion/nm`,
    {
      params: {
        token: localStorage.getItem('token'),
        chain_id: _chain_id,
        start_date : _start_date,
        end_date : _end_date,
        category_id : category_id,
        barcode :barcode,
        keyword:keyword
      }
    });
  }

  addPromotion(data){
    return this.http.post(`${environment.baseUrl}/promotion`, data,
    {
      params: {
        token:localStorage.getItem('token')
      }
    } );
  }
  getDiscountTypesS2c(){
    return this.http.get(`${environment.BaseUrlS2C}/promotion/discount/type`,{
      params:{
        token:localStorage.getItem('token')
      }
    });
  }

  addPromotionS2c(data){
    return this.http.post(`${environment.BaseUrlS2C}/promotion`, data,
    {
      params: {
        token:localStorage.getItem('token')
      }
    } );
  }


  filterDiscountList(_keyword, _barcode){

    if(!_keyword){
      _keyword='';
    }

    if(!_barcode){
      _barcode='';
    }
    
    return this.http.get(`${environment.baseUrl}/products/items/discount`,
    {
      params: {
        token: localStorage.getItem('token'),
        keyword: _keyword,
        barcode: _barcode
      }
    });
  }
  getDiscountById(id){
    return this.http.get(`${environment.BaseUrlS2C}/promotion/list/${id}`,
    {
      params: {
        token: localStorage.getItem('token'),
      }
    });
  }
  editDiscount(id,data){
    return this.http.post(`${environment.BaseUrlS2C}/promotion/update/${id}`,data,
    {
      params: {
        token: localStorage.getItem('token'),
      }
    });
  }  

  getHistoryProduct(discount_id,_chain_id?, _category_id?, barcode?, _keyword?,start_date?,end_date?){
    if(_chain_id == 0 || !_chain_id){
      _chain_id = ''
    }
    if(_category_id == 0 || !_category_id){
      _category_id = ''
    }
    if(barcode == 0 ||!barcode){
      barcode = ''
    }
    if (_keyword == 0 || !_keyword) {
      _keyword = ''
    }
    if(start_date ==0 ||!start_date){
      start_date = ''
    }
    if(end_date ==0 ||!end_date){
      end_date = ''
    }
    if(discount_id ==0 ||!discount_id){
      discount_id = ''
    }
    return this.http.get(`${environment.BaseUrlS2C}/promotion/history`,
    {
      params: {
        token: localStorage.getItem('token'),
        chain_id : _chain_id,
        category_id: _category_id,
        barcode: barcode,
        keyword: _keyword,
        start_date:start_date,
        end_date: end_date,
        discount_id:discount_id
      }
    });
  }
  getStatdiscountQuantity(data: any){
    return this.http.post(`${environment.BaseUrlS2C}/stat/discounted/quantity`, data, {
      params:{
        token: localStorage.getItem('token')
      }
    });
  }
  
  deleteDiscount(id){
    return this.http.delete(`${environment.BaseUrlS2C}/promotion/${id}`, {
      params:{
        token: localStorage.getItem('token')
      }
    });
  }
  getHistoryPromotion(_chain_id,_category_id,barcode,start_date,end_date,data?){    
    if(_chain_id == 0 || !_chain_id){
      _chain_id = ''
    }
    if(_category_id == 0 || !_category_id){
      _category_id = ''
    }
    if(barcode == 0 ||!barcode){
      barcode = ''
    }
    if (barcode == 0 || !barcode) {
      barcode = ''
    }
    if(start_date ==0 ||!start_date){
      start_date = ''
    }
    if(end_date ==0 ||!end_date){
      end_date = ''
    }
  
    return this.http.post(`${environment.BaseUrlS2C}/promotion/history/nm`,data,
    {
      params: {
        token: localStorage.getItem('token'),
        chain_id : _chain_id,
        category_id: _category_id,
        barcode: barcode,
        start_date:start_date,
        end_date: end_date,
      }
    });
  }


}
