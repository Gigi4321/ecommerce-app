import { Component, Inject, inject, PLATFORM_ID, signal } from '@angular/core';
import { Cart } from '../../shared/interfaces/cart.interface';
import { CartService } from '../../core/services/cart.service';
import { RouterLink } from "@angular/router";
import { ToastrService } from 'ngx-toastr';
import { isPlatformBrowser } from '@angular/common';
import Swal from 'sweetalert2';
import { OurServicesComponent } from "../../our-services/our-services.component";
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cart',
  imports: [RouterLink, OurServicesComponent, FormsModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }
  cartPageData = signal<Cart | null>(null)
  private readonly cartService = inject(CartService)
  private readonly toster = inject(ToastrService)


  ngOnInit() {
    if (!isPlatformBrowser(this.platformId)) return;

    this.getCartData()


  }



  getCartData() {
    this.cartService.getLogedUserCart().subscribe({
      next: (res) => {
        console.log(res.data)
        this.cartPageData.set(res.data)
      },
      error: (err) => {
        console.log(err)
      }
    })
  }



  async remove(id: string) {
    if (!isPlatformBrowser(this.platformId)) return;
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'This item will be removed from the cart permanently.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    });
    if (result.isConfirmed) {
      this.cartService.removeProductFromCard(id).subscribe({
        next: (res) => {
          this.cartPageData.set(res.data);
          this.cartService.cartCount.set(res.numOfCartItems)

          this.toster.success(
            'Product removed successfully',
            'FreshCart',
            { progressBar: true, closeButton: true }
          );
        },
        error: (err) => {
          console.error('Removal failed:', err);
        }
      });
    }
  }
  updateCount(count: number, id: string) {
    if (count < 1) return
    this.cartService.updateCount(count, id).subscribe({
      next: res => {

        this.cartPageData.set(res.data);
      }
    })
  }
  async clearCart() {
    if (!isPlatformBrowser(this.platformId)) return;
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'All items will be removed permanently.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    });
    if (result.isConfirmed) {
      this.cartService.clearCart().subscribe({
        next: (res) => {
          this.cartPageData.set(null);
          this.cartService.cartCount.set(0)

        },
        error: (err) => {
          console.error('Removal failed:', err);
        }
      });
    }

  }
}
