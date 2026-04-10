import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BrandsService {

  private readonly httpClient = inject(HttpClient)

  getAllBrands(limit: number = 10, page: number = 1): Observable<any> {
    let params = new HttpParams()
      .set('limit', limit.toString())
      .set('page', page.toString());

    return this.httpClient.get(environment.baseUrl + `/api/v1/brands`, { params });
  }


  getSpecificProduct(id: string): Observable<any> {
    return this.httpClient.get(environment.baseUrl + `/api/v1/brands/${id}`);
  }


}
