import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class SupplierS2cService {
  constructor(private http: HttpClient) {}

  GetSuppliersList() {
    return this.http.get(`${environment.baseUrl}/products/suppliers/list`, {
      params: {
        token: localStorage.getItem("token"),
      },
    });
  }
  GetSuppliersListS2C() {
    return this.http.get(`${environment.BaseUrlS2C}/suppliers`, {
      params: {
        token: localStorage.getItem("token"),
      },
    });
  }

  //get all suppliers to choose supplier
  GetAllSuppliersListS2C() {
    return this.http.get(`${environment.BaseUrlS2C}/suppliers/system`, {
      params: {
        token: localStorage.getItem("token"),
      },
    });
  }

  //get list of suppliers chosen by shop
  GetChosenSuppliers() {
    return this.http.get(`${environment.BaseUrlS2C}/suppliers/shop/choosen`, {
      params: {
        token: localStorage.getItem("token"),
      },
    });
  }
  //get list of suppliers created by shop
  GetAddedSuppliers() {
    return this.http.get(`${environment.BaseUrlS2C}/suppliers/shop/myList`, {
      params: {
        token: localStorage.getItem("token"),
      },
    });
  }

  getSupplierInfosWithProducts(id) {
    return this.http.get(`${environment.baseUrl}/products/overview/${id}`, {
      params: {
        token: localStorage.getItem("token"),
      },
    });
  }

  //get supplier by id
  getSupplierById(id) {
    return this.http.get(`${environment.BaseUrlS2C}/supplier/${id}`, {
      params: {
        token: localStorage.getItem("token"),
      },
    });
  }

  AssignSuppliers(data) {
    return this.http.post(`${environment.BaseUrlS2C}/suppliers/assign`, data, {
      params: {
        token: localStorage.getItem("token"),
      },
    });
  }
  DeleteSupplierS2C(id) {
    return this.http.delete(
      `${environment.BaseUrlS2C}/suppliers/remove/${id}`,
      {
        params: {
          token: localStorage.getItem("token"),
          store_id: localStorage.getItem("store_id"),
        },
      }
    );
  }
  DeleteSupplierSuper(id) {
    return this.http.delete(`${environment.BaseUrlS2C}/supplier/delete/${id}`,
      {
        params: {
          token: localStorage.getItem("token"),
        },
      }
    );
  }
  DeleteMySupplier(id) {
    return this.http.delete(`${environment.BaseUrlS2C}/suppliers/delete/${id}`,
      {
        params: {
          token: localStorage.getItem("token"),
        },
      }
    );
  }
//for superadmin
  GetAllShopSuppliers(page?,shop_owner_id?) {
    
    if (shop_owner_id == 0 || !shop_owner_id) {
      shop_owner_id = '';
    }
    return this.http.get(`${environment.BaseUrlS2C}/suppliers/shopowners`, {
      params: {
        token: localStorage.getItem("token"),
        page : page,
        shop_owner_id :shop_owner_id
      },
    });
  }
  addSuppliersystem(data:any){
    return this.http.post(`${environment.BaseUrlS2C}/supplier`, data, 
    {
      params: {
        token:localStorage.getItem('token'),
      }
    });
  }
}
