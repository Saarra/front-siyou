import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Product } from '../models/product.model';
@Injectable({
  providedIn: 'root'
})
export class ProductsS2cService {
  constructor(private http: HttpClient) { }
  getReturnedProducts(_chain_id?, _supplier_id?, _barcode?) {
    return this.http.get(`${environment.BaseUrlS2C}/Product/return`, {
      params: {
        token: localStorage.getItem('token'),
        chain_id: _chain_id,
        supplier_id: _supplier_id,
        barcode: _barcode
      }
    });
  }
  deleteProductquick(data, id) {
    return this.http.post(`${environment.BaseUrlS2C}/quick/purchase/product/delete/${id}`, data, {
      params: {
        token: localStorage.getItem('token')
      }
    });
  }
  getQuickPurProducts(_chain_id?, _supplier_id?, order_number?, orderDate?, status?) {
    return this.http.get(`${environment.BaseUrlS2C}/quick/purchase`, {
      params: {
        token: localStorage.getItem('token'),
        chain_id: _chain_id,
        supplier_id: _supplier_id,
        order_number: order_number,
        date: orderDate,
        status: status
      }
    });
  }
  getStatKPIS(data) {
    return this.http.post(`${environment.BaseUrlS2C}/stat/kpi`, data, {
      params: {
        token: localStorage.getItem('token')
      }
    });
  }
  getTopProduct(data) {
    return this.http.post(`${environment.BaseUrlS2C}/sale/top/products`, data, {
      params: {
        token: localStorage.getItem('token'),
      }
    });
  }
  getStatProducts(data) {
    return this.http.post(`${environment.BaseUrlS2C}/stat/products`, data, {
      params: {
        token: localStorage.getItem('token'),
      }
    });
  }
  getAllSuppliersProducts() {
    return this.http.get(`${environment.baseUrl}/products/shop/list`, {
      params: {
        token: localStorage.getItem('token')
      }
    });
  }
  getAllSuppProdsWithItems() {
    return this.http.get(`${environment.baseUrl}/products/shop/all`, {
      params: {
        token: localStorage.getItem('token'),
      }
    });
  }
  filterProductsList(category?, brand?, supplier?, _barcode?) {
    return this.http.get(`${environment.baseUrl}/products/shop/all`, {
      params: {
        token: localStorage.getItem('token'),
        category_id: category,
        brand_id: brand,
        supplier_id: supplier,
        barcode: _barcode,
      }
    });
  }
  getProductsBestSellersOfSupplier(id) {
    return this.http.get(`${environment.baseUrl}/products/best/seller/${id}`, {
      params: {
        token: localStorage.getItem('token')
      }
    });
  }
  addProductToWhishlist(data) {
    return this.http.post(`${environment.baseUrl}/products/favorit`, data, {
      params: {
        token: localStorage.getItem('token')
      }
    });
  }
  getProductofMyWhishlist() {
    return this.http.get(`${environment.baseUrl}/products/wish/list`, {
      params: {
        token: localStorage.getItem('token')
      }
    })
  }
  getPurchasedProducts(supp_id) {
    return this.http.get(`${environment}/products/purchased`, {
      params: {
        token: localStorage.getItem('token'),
        supplier_id: supp_id
      }
    });
  }
  getProdByBar(_chain_id?, barcode?) {
    if (_chain_id == 0 || !_chain_id) {
      _chain_id = ''
    }
    if (barcode == 0 || !barcode) {
      barcode = ''
    }
    return this.http.get(`${environment.BaseUrlS2C}/Product`, {
      params: {
        token: localStorage.getItem('token'),
        store_id: localStorage.getItem('store_id'),
        chain_id: _chain_id,
        item_barcode: barcode,
      },
    });
  }
  getProdsListPurshS2C(page,_chain_id, supplier_id,keyword?) {
    if (_chain_id == 0 || !_chain_id) {
      _chain_id = ''
    }
    if (supplier_id == 0 || !supplier_id) {
      supplier_id = ''
    }
    if (page == 0 || !page) {
      page = ''
    }
    if (keyword == 0 || !keyword) {
      keyword = ''
    }
    
    return this.http.get(`${environment.BaseUrlS2C}/Product/all`, {
      params: {
        token: localStorage.getItem('token'),
        chain_id: _chain_id,
        supplier_id: supplier_id,
        page: page,
        barcode:keyword
      },
    });
  }
  getProdsListS2C(page?, _chain_id?, _category_id?, barcode?, supplier_id?, _range_id?) {
    if (_chain_id == 0 || !_chain_id) {
      _chain_id = ''
    }
    if (_category_id == 0 || !_category_id) {
      _category_id = ''
    }
    if (barcode == 0 || !barcode) {
      barcode = ''
    }
    if (supplier_id == 0 || !supplier_id) {
      supplier_id = ''
    }
    if (_range_id == 0 || !_range_id) {
      _range_id = ''
    }
    if (page == 0 || !page) {
      page = ''
    }
    return this.http.get(`${environment.BaseUrlS2C}/Product/all`, {
      params: {
        token: localStorage.getItem('token'),
        chain_id: _chain_id,
        category_id: _category_id,
        barcode: barcode,
        supplier_id: supplier_id,
        range_id: _range_id,
        page: page
      },
    });
  }
  getExpiredProdsListS2C(page?, _chain_id?, _category_id?, barcode?, supplier_id?, _range_id?, data?) {
    if (_chain_id == 0 || !_chain_id) {
      _chain_id = ''
    }
    if (_category_id == 0 || !_category_id) {
      _category_id = ''
    }
    if (barcode == 0 || !barcode) {
      barcode = ''
    }
    if (supplier_id == 0 || !supplier_id) {
      supplier_id = ''
    }
    if (_range_id == 0 || !_range_id) {
      _range_id = ''
    }
    if (page == 0 || !page) {
      page = ''
    }
    return this.http.post(`${environment.BaseUrlS2C}/Product/expiration`, data, {
      params: {
        token: localStorage.getItem('token'),
        chain_id: _chain_id,
        category_id: _category_id,
        barcode: barcode,
        supplier_id: supplier_id,
        range_id: _range_id,
        page: page
      },
    });
  }
  getwarningProdsListS2C(page?, _chain_id?, _category_id?, barcode?, supplier_id?, _range_id?, data?) {
    if (_chain_id == 0 || !_chain_id) {
      _chain_id = ''
    }
    if (_category_id == 0 || !_category_id) {
      _category_id = ''
    }
    if (barcode == 0 || !barcode) {
      barcode = ''
    }
    if (supplier_id == 0 || !supplier_id) {
      supplier_id = ''
    }
    if (_range_id == 0 || !_range_id) {
      _range_id = ''
    }
    if (page == 0 || !page) {
      page = ''
    }
    return this.http.post(`${environment.BaseUrlS2C}/Product/warn`, data, {
      params: {
        token: localStorage.getItem('token'),
        chain_id: _chain_id,
        category_id: _category_id,
        barcode: barcode,
        supplier_id: supplier_id,
        range_id: _range_id,
        page: page
      },
    });
  }
  getNotDiscountedProducts(page,chain_id, _keyword?, _barcode?) {
    return this.http.get(`${environment.BaseUrlS2C}/promotion/products`, {
      params: {
        token: localStorage.getItem('token'),
        chain_id: chain_id,
        keyword: _keyword,
        barcode: _barcode,
        page : page
      }
    });
  }
  addReturnQuantity(data) {
    return this.http.post(`${environment.BaseUrlS2C}/Product/return`, data, {
      params: {
        token: localStorage.getItem('token'),
      }
    });
  }
  editReturnQuantity(id, data) {
    return this.http.post(`${environment.BaseUrlS2C}/Product/return/${id}`, data, {
      params: {
        token: localStorage.getItem('token'),
      }
    });
  }
  deleteReturnQuantity(id) {
    return this.http.delete(`${environment.BaseUrlS2C}/Product/return/${id}`, {
      params: {
        token: localStorage.getItem('token'),
      }
    });
  }
  getProductList() {
    return this.http.get(`${environment.BaseUrlS2C}/Product/List`,
      {
        params: {
          token: localStorage.getItem('token'),
          store_id: localStorage.getItem('store_id'),
          chain_id: localStorage.getItem('chain_id'),
        }
      }
    );
  }
  addNewProduct(product: any) {
    return this.http.post(`${environment.BaseUrlS2C}/Product`, product,
      {
        params: {
          token: localStorage.getItem('token'),
        }, responseType: 'text'
      });
  }
  getProductById(id, data?) {
    return this.http.post(`${environment.BaseUrlS2C}/Product/web/${id}`, data,
      {
        params: {
          token: localStorage.getItem('token'),
        }
      }
    );
  }
  generateBarcode() {
    return this.http.get(`${environment.BaseUrlS2C}/Product/Barcode`, {
      params: {
        token: localStorage.getItem('token')
      }
    });
  }
  deleteProduct(chain_id, barcode, shop_id) {
    return this.http.delete(`${environment.BaseUrlS2C}/Product`, {
      params: {
        token: localStorage.getItem('token'),
        _chain_id: chain_id,
        _barcode: barcode,
        _shop_id: shop_id
      }
    });
  }
  getstatStock(data: any) {
    return this.http.post(`${environment.BaseUrlS2C}/stat/stock`, data, {
      params: {
        token: localStorage.getItem('token')
      }
    });
  }
  updateProduct(product: any) {
    return this.http.post(`${environment.BaseUrlS2C}/Product/update`, product,
      {
        params: {
          token: localStorage.getItem('token'),
        }, responseType: 'text'
      });
  }
  getStatProdQuant(data: any) {
    return this.http.post(`${environment.BaseUrlS2C}/stat/product/quantity1`, data, {
      params: {
        token: localStorage.getItem('token')
      }
    });
  }
  getStatTopProd(data: any) {
    return this.http.post(`${environment.BaseUrlS2C}/stat/sale/top/products`, data, {
      params: {
        token: localStorage.getItem('token')
      }
    });
  }
  getStatTopProdCat(data: any) {
    return this.http.post(`${environment.BaseUrlS2C}/stat/sale/hot/category`, data, {
      params: {
        token: localStorage.getItem('token')
      }
    });
  }
  getStatSalesTurnover(data: any) {
    return this.http.post(`${environment.BaseUrlS2C}/stat/sale/turnover`, data, {
      params: {
        token: localStorage.getItem('token')
      }
    });
  }
  getStatSalesProfit(data: any) {
    return this.http.post(`${environment.BaseUrlS2C}/stat/gross/profit1`, data, {
      params: {
        token: localStorage.getItem('token')
      }
    });
  }
}
