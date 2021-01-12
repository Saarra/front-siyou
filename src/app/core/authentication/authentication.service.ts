import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class AuthenticationService {
  // login for B2S

  constructor(private http: HttpClient) {}
  login(data) {
    return this.http.post(`${environment.baseUrl}/login`, data);
  }

  // login for S2C

  loginS2C(data) {
    return this.http.post(`${environment.BaseUrlS2C}/login`, data);
  }

  // Reset Password Link
  sendResetPasswordLink(data) {
    return this.http.post(`${environment.BaseUrlS2C}/password/email`, data);
  }

  // Reset Password
  resetPassword(data) {
    return this.http.post(`${environment.BaseUrlS2C}/password/reset`, data);
  }
}
