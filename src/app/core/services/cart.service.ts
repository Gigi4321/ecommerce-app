import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private readonly httpClient = inject(HttpClient)
  cartCount=signal<number>(0)

  addToCart(id:string): Observable<any> {
    return this.httpClient.post(environment.baseUrl + `/api/v2/cart`, {
      productId:id
    })
  }
  getLogedUserCart():Observable<any>{
    return this.httpClient.get(environment.baseUrl+`/api/v2/cart`)
  }
  removeProductFromCard(id:string):Observable<any>{
    return this.httpClient.delete(environment.baseUrl+`/api/v2/cart/${id}`)
  }

  updateCount(countNum:number,id:string):Observable<any>{
    return this.httpClient.put(environment.baseUrl+`/api/v2/cart/${id}`,{count:countNum})
  }
  clearCart():Observable<any>{
    return this.httpClient.delete(environment.baseUrl+`/api/v2/cart`)
  }

  applyCoupon(couponName: string): Observable<any> {
  return this.httpClient.put(
    `${environment.baseUrl}/api/v2/cart/applyCoupon`,
    { couponName }
  );
}


}
