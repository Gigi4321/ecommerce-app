import { HttpClient, HttpContext } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly httpClient = inject(HttpClient);
  private readonly router = inject(Router);

  isLoged = signal<boolean>(false);


  signUp(data: object): Observable<any> {
    return this.httpClient.post(environment.baseUrl + `/api/v1/auth/signup`, data)
  }
  signIn(data: object): Observable<any> {
    return this.httpClient.post(environment.baseUrl + `/api/v1/auth/signin`, data)
  }
  signOut() {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    this.isLoged.set(false)
    this.router.navigate(['/login'])
  }
  forgetPass(data: object): Observable<any> {
    return this.httpClient.post(environment.baseUrl + `/api/v1/auth/forgotPasswords`, data)
  }
  verifyCode(data: object): Observable<any> {
    return this.httpClient.post(environment.baseUrl + `/api/v1/auth/verifyResetCode`, data)
  }
  resetNewPass(data: object): Observable<any> {
    return this.httpClient.put(environment.baseUrl + `/api/v1/auth/resetPassword`, data)
  }



  updateUser(data: { name: string; email: string; phone: string }): Observable<any> {
    return this.httpClient.put(`${environment.baseUrl}/api/v1/users/updateMe`, data);
  }

  changePassword(data: {
    currentPassword: string;
    password: string;
    rePassword: string;
  }): Observable<any> {

    return this.httpClient.put(
      `${environment.baseUrl}/api/v1/users/changeMyPassword`,
      data
    );
  }


}
