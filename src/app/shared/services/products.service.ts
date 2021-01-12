import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpErrorResponse, HttpEventType, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  // SERVER_URL = 'http://localhost:8000';
  constructor(private http: HttpClient) { }

  public upload(data) {
    const uploadURL = `${environment.baseUrl}/products`;
    const headers = new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json'
    });

    return this.http.post<any>(`${environment.baseUrl}/products/upload`, data, {
      reportProgress: true,
      observe: 'events'
    }).pipe(map((event) => {

      switch (event.type) {

        case HttpEventType.UploadProgress:
          const progress = Math.round(100 * event.loaded / event.total);
          return { status: 'progress', message: progress };
        case HttpEventType.Sent:
          return 'sent';
        case HttpEventType.Response:
          return event;
        default:
          return `Unhandled event: ${event.type}`;
      }
    })
    );
    // return this.http.post(uploadURL, data, {
    //   observe: 'body'
    // });
  }

  uploadImage(data) {
    return this.http.post(`${environment.baseUrl}/image`, data, {
      reportProgress: true,
      observe: 'events'
    })
  }

  deleteImage(id: any) {
    return this.http.delete(`${environment.baseUrl}/image/${id}`);
  }
  public addProduct(data) {
    return this.http.post(`${environment.baseUrl}/products`, data, {
      observe: 'body',
      params: {
        token: localStorage.getItem('token')
      }
    });
  }

  addNewProduct(data: any) {
    return this.http.post(`${environment.baseUrl}/products/addNewProd`, data, {
      params: {
        token: localStorage.getItem('token')
      }
    });
  }

  public getSupplierProductsList() {
    return this.http.get(`${environment.baseUrl}/products/supplier`, {
      params: {
        token: localStorage.getItem('token')
      }
    });
  }

  public getProductsList() {
    return this.http.get(`${environment.baseUrl}/products/productList`, {
      params: {
        token: localStorage.getItem('token')
      }
    });
  }


  public getNewProductsList() {
    return this.http.get(`${environment.baseUrl}/products/productList`, {
      params: {
        token: localStorage.getItem('token')
      }
    })
  }

  public getFilteredProductsList(data) {
    return this.http.get(`${environment.baseUrl}/products/filter`, {
      params: {
        ...data,
        token: localStorage.getItem('token')
      }
    });
  }

  getSalesManagerProductList() {
    return this.http.get(`${environment.baseUrl}/products/salesmanager`, {
      params: {
        token: localStorage.getItem('token')
      }
    });
  }

  addProductManagement(data) {
    return this.http.post(`${environment.baseUrl}/addNewProd`, data, {
      observe: 'body',
      params: {
        token: localStorage.getItem('token')
      }
    })
  }

  getFullProductList(_keyword?, _barcode?){
    return this.http.get(`${environment.baseUrl}/products/productList`, 
    {
      params: {
        token : localStorage.getItem('token'),
        keyword: _keyword,
        barcode: _barcode
      }
    });
  }

  deleteProductBaseWithItem(id: any){

    return this.http.delete(`${environment.baseUrl}/products/deleteProd/${id}`,
    {
      params: {
        token: localStorage.getItem('token')
      }
    });

  }

  deleteProductItemOnly(id: any){
     
    return this.http.delete(`${environment.baseUrl}/products/deleteItem/${id}`,
    {
      params: {
        token: localStorage.getItem('token')
      }
    });
  }

  getProductItem(id:any){
    return this.http.get(`${environment.baseUrl}/products/Item/${id}`,{
      params: {
        token: localStorage.getItem('token')
      }
    });
  }

  getLastAddedProducts(){
    return this.http.get(`${environment.baseUrl}/dashboard/lastAdded`,{
      params: {
        token: localStorage.getItem('token')
      }
    });
  }

  getProductsByDiscount(){

    return this.http.get(`${environment.baseUrl}/dashboard/discount`,{
      params: {
        token: localStorage.getItem('token')
      }
    });

  }

  getBestSellersProducts(){
    return this.http.get(`${environment.baseUrl}/dashboard/bestSeller`,{
      params: {
        token: localStorage.getItem('token')
      }
    });

  }

  getAllProductsItems(_keyword?, _barcode?){

    if(!_keyword){
      _keyword = ''
    }

    
    if(!_barcode){
      _barcode = ''
    }
     
    
    return this.http.get(`${environment.baseUrl}/products/items`,{
      params: {
        token: localStorage.getItem('token'),
        keyword: _keyword,
        barcode: _barcode
      }
    });

  }

  editProductItem(id: number, data: any){
    return this.http.put(`${environment.baseUrl}/products/item/${id}`, data, {
      params:{
        token: localStorage.getItem('token')
      }
    });
  }


 

}
