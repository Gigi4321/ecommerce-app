import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {

  private readonly httpClient = inject(HttpClient)

  cashOrder(data:object,id:string): Observable<any> { 
    return this.httpClient.post(environment.baseUrl + `/api/v2/orders/${id}`,data)
  }



  VisaOrder(data:object,id:string): Observable<any> {
    return this.httpClient.post(environment.baseUrl + `/api/v1/orders/checkout-session/${id}?url=${environment.url}`,data)
  }
}
