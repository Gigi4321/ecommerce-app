import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WishlistService {
  private http = inject(HttpClient);
  private baseUrl = environment.baseUrl;
  wishlistIds = signal<string[]>([]);

  getWishlist(): Observable<any> {
    return this.http.get(`${this.baseUrl}/api/v1/wishlist`).pipe(
      tap((res: any) => {
        const ids = res.data.map((item: any) => item._id);
        this.wishlistIds.set(ids);
      })
    );
  }

  addToWishlist(productId: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/v1/wishlist`, { productId }).pipe(
      tap((res: any) => {
        this.wishlistIds.set(res.data);
      })
    );
  }
  removeFromWishlist(productId: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/api/v1/wishlist/${productId}`).pipe(
      tap((res: any) => {
        this.wishlistIds.set(res.data);
      })
    );
  }
}