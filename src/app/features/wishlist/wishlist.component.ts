import { Component, Inject, inject, PLATFORM_ID, signal } from '@angular/core';
import { OurServicesComponent } from "../../our-services/our-services.component";
import { WishlistService } from '../../core/services/wishlist.service';
import { Product } from '../../shared/interfaces/product.interface';
import { ToastrService } from 'ngx-toastr';
import { isPlatformBrowser } from '@angular/common';
import { CartService } from '../../core/services/cart.service';
import { RouterLink } from "@angular/router";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-wishlist',
  imports: [OurServicesComponent, RouterLink],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.css',
})
export class WishlistComponent {

  private readonly wishlistService=inject(WishlistService)
  private readonly cartService=inject(CartService)
  private readonly toastrService=inject(ToastrService)
  wishlistProducts=signal<Product[]>([])
   private readonly platformId = inject(PLATFORM_ID);
  ngOnInit(){
    if(isPlatformBrowser(this.platformId)){
      this.getWishList()
    }
  }
  
  getWishList(){
    if (!isPlatformBrowser(this.platformId)) return;
      this.wishlistService.getWishlist().subscribe({
        next:res=>{
          this.wishlistProducts.set(res.data)
        }  
      })
      
    }
 remove(id: string) {
  if (!isPlatformBrowser(this.platformId)) return;

  Swal.fire({
    title: 'Are you sure?',
    text: 'This item will be removed from your wishlist',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Yes, remove it'
  }).then((result) => {
    if (result.isConfirmed) {

      Swal.fire({
        title: 'Removing...',
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        }
      });

      this.wishlistService.removeFromWishlist(id).subscribe({
        next: () => {
          Swal.fire({
            icon: 'success',
            title: 'Removed!',
            text: 'Item has been removed successfully'
          });
          this.getWishList();
        },
        error: () => {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Something went wrong'
          });
        }
      });

    }
  });
}

    AddItemToCart(id: string) {
    if (!isPlatformBrowser(this.platformId)) return;

    this.cartService.addToCart(id).subscribe({
      next: (res) => {
        this.cartService.cartCount.set(res.numOfCartItems);
        this.toastrService.success(res.message, 'Fresh Cart');
      }
    });
  }
}
