import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private readonly httpClient = inject(HttpClient);
  

  getAllCategories(limit: number = 10, page: number = 1): Observable<any> {
    let params = new HttpParams()
    .set('limit', limit.toString())
    .set('page', page.toString());
    
    return this.httpClient.get(`${environment.baseUrl}/api/v1/categories`, { params });
  }
  
  getSpecificCategory(categoryId: string): Observable<any> {
    return this.httpClient.get(`${environment.baseUrl}/api/v1/categories/${categoryId}`);
  }
  getSpecificSubCategory(subCategoryId: string): Observable<any> {
    return this.httpClient.get(`${environment.baseUrl}/api/v1/subcategories/${subCategoryId}`);
  }

  getAllSubCategories(): Observable<any> {
    return this.httpClient.get(`${environment.baseUrl}/api/v1/subcategories`, {});
  }


  getSubCategoriesOnCategory(categoryId: string): Observable<any> {
    return this.httpClient.get(`${environment.baseUrl}/api/v1/categories/${categoryId}/subcategories`);
  }
 
}

