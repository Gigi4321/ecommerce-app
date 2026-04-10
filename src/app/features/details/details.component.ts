import { Component, inject, WritableSignal, signal, PLATFORM_ID, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../core/services/products.service';
import { Product } from '../../shared/interfaces/product.interface';
import { ReviewService } from '../../core/services/review.service';
import { Review } from '../../shared/interfaces/review.interface';
import { FormsModule } from '@angular/forms';
import { DateFormatPipe } from '../../shared/pipes/date-format-pipe';
import { isPlatformBrowser } from '@angular/common';
import { OurServicesComponent } from "../../our-services/our-services.component";
import { HeaderSectionComponent } from "../home/components/header-section/header-section.component";
import { CardComponent } from "../../shared/ui/card/card.component";


@Component({
  selector: 'app-details',
  imports: [FormsModule, DateFormatPipe, OurServicesComponent, HeaderSectionComponent, CardComponent],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css',
})
export class DetailsComponent {
  constructor(@Inject(PLATFORM_ID) private platformId: object) {

  }

  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly productService = inject(ProductsService);
  private readonly reviewService = inject(ReviewService);

  productDetails: WritableSignal<Product> = signal({} as Product);
  similarProducts = signal<Product[]>([]);
  productId!: string;
  currentUserName!: string;





  ngOnInit() {
    this.activatedRoute.paramMap.subscribe({
      next: parms => {
        this.productId = parms.get('id')!;
        if (!isPlatformBrowser(this.platformId)) return;
          const userData = JSON.parse(localStorage.getItem('user') || '{}');
          this.currentUserName = userData.name;
        
        this.getProductDetails();
        this.loadReviews();
        this.loadProducts();
      }
    })
  }

  // ===== Product =====
  getProductDetails() {
    this.productService.getSpecificProduct(this.productId).subscribe({
      next: res => {
        this.productDetails.set(res.data);
      },
      error: err => {
        console.log(err);
      }
    })
  }



  reviews = signal<Review[]>([]);
  isLoading = signal(false);
  isSubmitting = signal(false);

  editingId = signal<string | null>(null);

  newReview = {
    review: '',
    rating: 5
  };

  editedReview = {
    review: '',
    rating: 5
  };





  loadReviews() {
    this.isLoading.set(true);

    this.reviewService.getProductReviews(this.productId).subscribe({
      next: (res) => {
        this.reviews.set(res.data || res);
        this.isLoading.set(false);
      },
      error: () => this.isLoading.set(false)
    });
  }

  submitReview() {
    const review = this.newReview.review.trim();
    const rating = this.newReview.rating;

    if (!review || rating < 1 || rating > 5) {
      console.error('Invalid review data');
      return;
    }

    this.isSubmitting.set(true);

    this.reviewService.createReview(this.productId, { review, rating })
      .subscribe({
        next: (res) => {
          this.reviews.update(prev => [res.data, ...prev]);
          this.newReview = { review: '', rating: 5 };
          this.isSubmitting.set(false);
        },
        error: (err) => {
          console.error('Review failed:', err);
          this.isSubmitting.set(false);
        }
      });
  }

  deleteReview(id: string) {
    this.reviewService.deleteReview(id).subscribe({
      next: () => {
        this.reviews.update(prev => prev.filter(r => r._id !== id));
      }
    });
  }

  startEdit(review: Review) {
    this.editingId.set(review._id);
    this.editedReview = {
      review: review.review,
      rating: review.rating
    };
  }

  cancelEdit() {
    this.editingId.set(null);
  }

  updateReview(id: string) {
    this.reviewService.updateReview(id, this.editedReview).subscribe({
      next: (res) => {
        this.reviews.update(prev =>
          prev.map(r => r._id === id ? res.data : r)
        );
        this.editingId.set(null);
      }
    });
  }

  setRating(rating: number, target: 'new' | 'edit') {
    if (target === 'new') {
      this.newReview.rating = rating;
    } else {
      this.editedReview.rating = rating;
    }
  }

  stars(rating: number) {
    return Array.from({ length: 5 }, (_, i) => i < rating);
  }


  
  loadProducts() {
    this.isLoading.set(true);
    
    this.productService.getProducts().subscribe({
      next: (res) => {
        console.log('details',res)
         const filteredData = res.data.filter((item: any) => item.category._id === this.productDetails().category._id);  
        this.similarProducts.set(filteredData); 
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error('Products Load Error:', err);
        this.isLoading.set(false);
      }
    });
  }
}

