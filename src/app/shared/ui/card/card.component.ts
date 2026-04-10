import { Component, inject, input, computed, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Product } from '../../interfaces/product.interface';
import { CartService } from '../../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { RouterLink } from "@angular/router";
import { WishlistService } from '../../../core/services/wishlist.service';

@Component({
  selector: 'app-card',
  standalone: true, // تأكد أنها Standalone
  imports: [RouterLink],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
})
export class CardComponent {
  // Inputs
  card = input.required<Product>();

  // Services
  private readonly cartService = inject(CartService);
  private readonly wishlistService = inject(WishlistService);
  private readonly toastrService = inject(ToastrService);
  private readonly platformId = inject(PLATFORM_ID);


  isInWishlist = computed(() => 
    this.wishlistService.wishlistIds().includes(this.card()._id)
  );

  ngOnInit(){
  
      this.getWishList()
    
  }
  
  getWishList(){
    if (!isPlatformBrowser(this.platformId)) return;
    this.wishlistService.getWishlist().subscribe({
      next:res=>console.log(res)
    })
  }

  // ================= CART =================
  AddItemToCart(id: string) {
    if (!isPlatformBrowser(this.platformId)) return;
    if (!localStorage.getItem('token')) {
      this.toastrService.warning('Please login first', 'Fresh Cart',{progressBar:true,closeButton:true});
      return;
    }

    this.cartService.addToCart(id).subscribe({
      next: (res) => {
        this.cartService.cartCount.set(res.numOfCartItems);
        this.toastrService.success(res.message, 'Fresh Cart',{progressBar:true,closeButton:true});
      }
    });
  }

  // ================= WISHLIST =================
  toggleWishlist(id: string) {
    if (!isPlatformBrowser(this.platformId)) return;

    if (!localStorage.getItem('token')) {
      this.toastrService.warning('Please login first', 'Fresh Cart',{progressBar:true,closeButton:true});
      return;
    }

    if (this.isInWishlist()) {
      this.wishlistService.removeFromWishlist(id).subscribe({
        next: () => {
          this.toastrService.success('Removed from wishlist','Fresh Cart',{progressBar:true,closeButton:true});
        }
      });
    } else {
      this.wishlistService.addToWishlist(id).subscribe({
        next: () => {
          this.toastrService.success('Added to wishlist','Fresh Cart',{progressBar:true,closeButton:true});
        }
      });
    }
  }
}