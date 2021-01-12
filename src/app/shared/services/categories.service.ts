import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Categories } from '../models/categories.model';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private http: HttpClient) { }

  getCategoriesSystem() {
    
    return this.http.get(`${environment.BaseUrlS2C}/Categories/system/shop`, {
      params: {
        token: localStorage.getItem('token'),
        store_id: localStorage.getItem('store_id')

      }
    });
  }
  getCategoriesS2CList() {
    return this.http.get(`${environment.BaseUrlS2C}/category/list`, {
      params: {
        token: localStorage.getItem('token')
      }
    });
  }
  getmyCategoryById(id) {
    return this.http.get(`${environment.BaseUrlS2C}/categories/${id}`, {
      params: {
        token: localStorage.getItem('token')
      }
    });
  }
  addCategoryS2C(data){
    return this.http.post(`${environment.BaseUrlS2C}/Categories`, data, {
      params: {
        token: localStorage.getItem('token')
      }
    });
  }
  editMycategories(data){
    return this.http.post(`${environment.BaseUrlS2C}/category/update`, data, {
      params: {
        token: localStorage.getItem('token')
      }
    });
  }
// choose category by shop = affect category to shop
  affectCategoryS2C(data){
    return this.http.post(`${environment.BaseUrlS2C}/Categories/assign`, data, {
      params: {
        token: localStorage.getItem('token'),
      }
    });
  }
  getCategoryCriteria(category_id: string) {
    return this.http.get(`${environment.baseUrl}/Criteria/List`, {
      params: {
        token: localStorage.getItem('token'),
        category_id
      }
    });
  }
  getCategoriesList(){
    return this.http.get<Categories[]>(`${environment.baseUrl}/categories`, {
      params: {
        token : localStorage.getItem('token')
      }
    });
  }
  //filtre : category choosed + my categories

  getCategories(){
    return this.http.get<Categories[]>(`${environment.BaseUrlS2C}/Categories/shop1`, {
      params: {
        token : localStorage.getItem('token'),
        store_id: localStorage.getItem('store_id')
      }
    });
  }

  // get list of categories chosen by shop
  getCategoriesChosen(){
    return this.http.get<Categories[]>(`${environment.BaseUrlS2C}/Categories/shop/choosen`, {
      params: {
        token : localStorage.getItem('token'),
        store_id: localStorage.getItem('store_id')
      }
    });
  }


  // get list of categories created by shop
  getMyCategoriesS2CList(){
    return this.http.get<Categories[]>(`${environment.BaseUrlS2C}/category/shop/myList`, {
      params: {
        token : localStorage.getItem('token'),
        store_id: localStorage.getItem('store_id')
      }
    });
  }


  // add category
  addCategory(data : any){
    return this.http.post(`${environment.BaseUrlS2C}/Categories`, data, {
      params: {
        token: localStorage.getItem('token')
      }
    });
  }


  addCategoryByShop(data : any){
    return this.http.post(`${environment.BaseUrlS2C}/category/add`, data, {
      params: {
        token: localStorage.getItem('token')
      }
    });
  }
  addCriteriaToCategory(data: any){
    return this.http.post(`${environment.baseUrl}/categories/criteria`, data, {
      params:{
        token: localStorage.getItem('token')
      }
    });
 }
  deleteCateogy(id: number){
    return this.http.delete(`${environment.BaseUrlS2C}/Categories/${id}`, {
      params: {
        token: localStorage.getItem('token')
      }
    });
  }

  editCategory( id ,data: any){
    return this.http.post(`${environment.BaseUrlS2C}/category/update/${id}`, data,{
      params:{
        token: localStorage.getItem('token')
      }

    });
  }
  
  getCategoriesWithCriterias(){
    return  this.http.get(`${environment.baseUrl}/Criteria/Categories`, {
      params: {
        token: localStorage.getItem('token')
      }
    });
  }
  RemoveCriteriaFromCategory(id_category: number, id_criteria: number){
    return this.http.delete(`${environment.baseUrl}/categories/${id_category}/${id_criteria}`,{
      params : {
        token: localStorage.getItem('token')
      }
    });
  }
  DeleteCategory(id){
    return this.http.delete(`${environment.BaseUrlS2C}/Categories/shop/remove/${id}`, {
      params: {
        token: localStorage.getItem('token'),
        store_id : localStorage.getItem('store_id')
      }
    });
  }
  DeleteMyCategory(id){
    return this.http.delete(`${environment.BaseUrlS2C}/category/delete/${id}`, {
      params: {
        token: localStorage.getItem('token'),
      }
    });
  }
  editSort(data : any){
    return this.http.post(`${environment.BaseUrlS2C}/categorie/updateorder`,data, {
      params: {
        token: localStorage.getItem('token'),
        categories_orders : data
      }
    });
  }

 
}
