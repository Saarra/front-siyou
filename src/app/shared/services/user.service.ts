import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpEvent,
  HttpErrorResponse,
  HttpEventType,
  HttpHeaders,
} from "@angular/common/http";
import { environment } from "src/environments/environment";
import { User } from "../models/user";
import { Licence } from "../models/licence";
import { Observable } from "rxjs/Observable";

const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" }),
};

@Injectable({
  providedIn: "root",
})
export class UserService {
  constructor(private http: HttpClient) {}

  public addProduct(data) {
    return this.http.post(`${environment.baseUrl}/products`, data, {
      observe: "body",
      params: {
        token: localStorage.getItem("token"),
      },
    });
  }

  public getallusers() {
    return this.http.get<User[]>(`${environment.baseUrl}/all`, {
      params: {
        token: localStorage.getItem("token"),
      },
    });
  }

  public getUser() {
    return this.http.get<User[]>(`${environment.BaseUrlS2C}/infos`, {
      params: {
        token: localStorage.getItem("token"),
      },
    });
  }
  public getLicence() {
    return this.http.get<Licence[]>(`${environment.BaseUrlS2C}/user/licence`, {
      params: {
        token: localStorage.getItem("token"),
      },
    });
  }
  public getLicensegrid(page?) {
    return this.http.get<Licence[]>(`${environment.BaseUrlS2C}/licences`, {
      params: {
        token: localStorage.getItem("token"),
        page : page
      },
    });
  }
  public getLicenseList() {
    return this.http.get<Licence[]>(`${environment.BaseUrlS2C}/licence`, {
      params: {
        token: localStorage.getItem("token"),
      },
    });
  }
  public getLicenseById(id) {
    return this.http.get<Licence[]>(`${environment.BaseUrlS2C}/licence/${id}`, {
      params: {
        token: localStorage.getItem("token"),
      },
    });
  }
  public editLicense(id,data) {
    return this.http.put(`${environment.BaseUrlS2C}/licence/${id}`,data,
      {
        params: {
          token: localStorage.getItem("token"),
        },
      }
    );
  }
  public getShopOwners() {
    return this.http.get(`${environment.BaseUrlS2C}/shopowners`, {
      params: {
        token: localStorage.getItem("token"),
      },
    });
  }
  public deleteLicence(id) {
    return this.http.delete<Licence[]>(
      `${environment.BaseUrlS2C}/licence/${id}`,
      {
        params: {
          token: localStorage.getItem("token"),
        },
      }
    );
  }

  public getallInvalidusers() {
    return this.http.get<User[]>(`${environment.baseUrl}/getInvalidUsers`, {
      params: {
        token: localStorage.getItem("token"),
      },
    });
  }

  public getallInvalidusersLast() {
    return this.http.get<User[]>(`${environment.baseUrl}/getInvalidUsersLast`, {
      params: {
        token: localStorage.getItem("token"),
      },
    });
  }
  public getValidUsers() {
    return this.http.get<User[]>(`${environment.baseUrl}/getValidUsers`, {
      params: {
        token: localStorage.getItem("token"),
      },
    });
  }

  public validateUser(id: number) {
    return this.http.put<User>(
      `${environment.baseUrl}/validateUser/${id}`,
      {},
      {
        params: {
          token: localStorage.getItem("token"),
        },
      }
    );
  }

  addNewSupplier(data: any) {
    return this.http.post(`${environment.baseUrl}/addSupplier`, data, {
      params: {
        token: localStorage.getItem("token"),
      },
    });
  }

  addSupplierS2C(data: any) {
    return this.http.post(`${environment.BaseUrlS2C}/supplier`, data, {
      params: {
        token: localStorage.getItem("token"),
        store_id: localStorage.getItem("store_id"),
      },
    });
  }
  updateSupplierS2C(data: any, id: any) {
    return this.http.put(`${environment.BaseUrlS2C}/supplier/${id}`, data, {
      params: {
        token: localStorage.getItem("token"),
        store_id: localStorage.getItem("store_id"),
      },
    });
  }

  addSupplier(user: User): Observable<User> {
    return this.http.post<User>(
      `${environment.baseUrl}/addSupplier`,
      user,
      httpOptions
    );
  }
  addSalesManager(user: User): Observable<User> {
    return this.http.post<User>(
      `${environment.baseUrl}/addSalesManager`,
      user,
      httpOptions
    );
  }
  addShopOwner(user: User): Observable<User> {
    return this.http.post<User>(
      `${environment.baseUrl}/addShop_Owner`,
      user,
      httpOptions
    );
  }
  BlockUser(id: number) {
    return this.http.put<User>(
      `${environment.baseUrl}/block/${id}`,
      {},
      {
        params: {
          token: localStorage.getItem("token"),
        },
      }
    );
  }
  DeleteUser(id: number) {
    return this.http.delete<User>(`${environment.baseUrl}/${id}`, {
      params: {
        token: localStorage.getItem("token"),
      },
    });
  }
  signUpShopOwner(data: any) {
    return this.http.post(`${environment.BaseUrlS2C}/SignUp`, data, {
      params: {
        token: localStorage.getItem("token"),
      },
    });
  }

  signUp(data: any) {
    return this.http.post(`${environment.baseUrl}/sign_up`, data, {
      params: {
        token: localStorage.getItem("token"),
      },
    });
  }

  getallroles(id) {
    return this.http.get(`${environment.baseUrl}/users/GetUserByRole/${id}`);
  }
}
