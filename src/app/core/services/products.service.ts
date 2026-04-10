import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private readonly httpClient = inject(HttpClient)

 getProducts(filters: any = {}): Observable<any> {
    let queryParams = new HttpParams();

    if (filters.page) queryParams = queryParams.set('page', filters.page.toString());
    if (filters.limit) queryParams = queryParams.set('limit', filters.limit.toString());
    if (filters.subcategory) queryParams = queryParams.set('subcategory', filters.category);

    return this.httpClient.get(`${environment.baseUrl}/api/v1/products`, {
      params: queryParams
    });
  }
  getSpecificProduct(productId: string): Observable<any> {
    return this.httpClient.get(environment.baseUrl + `/api/v1/products/${productId}`)
  }
}
