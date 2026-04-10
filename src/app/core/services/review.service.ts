import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${environment.baseUrl}/api/v1`;

  // Create review 
  createReview(productId: string, data: { review: string; rating: number }): Observable<any> {
    return this.http.post(`${this.baseUrl}/products/${productId}/reviews`, data);
  }

  // Get reviews for product 
  getProductReviews(productId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/products/${productId}/reviews`);
  }

  // Get all reviews
  getAllReviews(): Observable<any> {
    return this.http.get(`${this.baseUrl}/reviews`);
  }

  // Get single review
  getReviewById(reviewId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/reviews/${reviewId}`);
  }

  // Update review
  updateReview(reviewId: string, data: { review: string; rating: number }): Observable<any> {
    return this.http.put(`${this.baseUrl}/reviews/${reviewId}`, data);
  }

  // Delete review
  deleteReview(reviewId: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/reviews/${reviewId}`);
  }
}