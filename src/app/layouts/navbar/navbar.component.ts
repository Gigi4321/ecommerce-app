import { isPlatformBrowser } from '@angular/common';
import { Component, computed, inject, Inject, Output, PLATFORM_ID } from '@angular/core';
import { RouterLink, RouterLinkActive } from "@angular/router";
import { AuthService } from '../../core/auth/services/auth.service';
import { CartService } from '../../core/services/cart.service';
import { EventEmitter } from 'stream';
import { Cart } from '../../shared/interfaces/cart.interface';
import { Product } from '../../shared/interfaces/product.interface';
import { WishlistService } from '../../core/services/wishlist.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  private readonly authService=inject(AuthService)
  private readonly cartService=inject(CartService)
  private readonly wishlistService=inject(WishlistService)
  userInfo:any
  
  countNum=computed(()=>this.cartService.cartCount())
  wishlistCount=computed(()=>this.wishlistService.wishlistIds().length)
  isLoged=computed(()=>this.authService.isLoged())
  constructor(@Inject(PLATFORM_ID) private platformId: any) {}
  ngOnInit(){
    if(isPlatformBrowser(this.platformId)){
      if(localStorage.getItem('token')){
      this.authService.isLoged.set(true)
      this.userInfo= JSON.parse(localStorage.getItem('user') || '{}')
    }
    this.getCartCount()
    this.wishlistService.getWishlist()
    }
    
  }


  getCartCount(){
    this.cartService.getLogedUserCart().subscribe({
      next: (res) => {
        console.log("nav =>",res.data)
       this.cartService.cartCount.set(res.data.products.length)
      },
      error: (err) => {
        console.log(err)
      }
    })
  }


  loadFlowbite(callback: (flowbite: any) => void) {
    if (isPlatformBrowser(this.platformId)) {
      import('flowbite').then(flowbite => {
        callback(flowbite);
      });
    }
  }
  signOut(){
    this.authService.signOut()
  }

}
