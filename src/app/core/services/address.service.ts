import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AddressService {

  private baseUrl = `${environment.baseUrl}/api/v1/addresses`;

  private readonly http=inject(HttpClient);

 
  // GET all user addresses
  getUserAddresses(): Observable<any> {
    return this.http.get(this.baseUrl);
  }

  // GET single address
  getAddressById(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  // POST add address
  addAddress(data: {
    name: string;
    details: string;
    phone: string;
    city: string;
  }): Observable<any> {
    return this.http.post(this.baseUrl, data);
  }

  // DELETE address
  deleteAddress(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
