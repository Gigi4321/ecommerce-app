import { Component, Inject, inject, PLATFORM_ID, signal, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { OrdersService } from '../../core/services/orders.service';
import { ToastrService } from 'ngx-toastr';
import { AddressService } from '../../core/services/address.service';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css',
})
export class CheckoutComponent implements OnInit {
  constructor(@Inject(PLATFORM_ID) private platformId: object) { }

  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly addressService = inject(AddressService);
  private readonly ordersService = inject(OrdersService);
  private readonly toastrService = inject(ToastrService);
  private readonly router = inject(Router);
  private readonly fb = inject(FormBuilder);

  cartId = signal<string>('');
  cardMethod = signal<string>('cash');
  addresses = signal<any[]>([]);
  flag = signal<boolean>(false);
  selectedAddressId = signal<string>('');

  checkOut: FormGroup = this.fb.group({
    shipingAddress: this.fb.group({
      details: ["", [Validators.required]],
      phone: ["", [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]],
      city: ["", [Validators.required]],
    })
  });

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe({
      next: params => {
        const id = params.get('id');
        if (id) {
          this.cartId.set(id);
          this.getAllAddresses();
        }
      }
    });
  }

  getAllAddresses() {
    if (isPlatformBrowser(this.platformId)) {
      this.addressService.getUserAddresses().subscribe({
        next: res => {
          this.addresses.set(res.data);
        },
        error: err => console.error('Error fetching addresses:', err)
      });
    }
  }

  selectAddress(item: any) {
    this.selectedAddressId.set(item._id);
  }

  show() {
    this.selectedAddressId.set('');
    this.flag.update(value => !value);
  }

  setMethod(method: string) {
    this.cardMethod.set(method);
  }

  submitForm() {
    console.log("hii")
    if (!this.selectedAddressId() && this.checkOut.invalid) {
      this.toastrService.warning('Please select a shipping address');
      return;
    }
    if (this.selectedAddressId()) {
      const payload = {
        shippingAddress: this.addresses().find(
          a => a._id === this.selectedAddressId()
        )
      };
      if (this.cardMethod() === 'cash') {
        this.createCashOrder(payload, this.cartId());
      }
      else if (this.cardMethod() === 'visa') {
        this.createVisaOrder(payload, this.cartId());
      } return;
    }

    else if (this.checkOut.valid) {
      const payload = {
        shippingAddress: this.checkOut.value.shipingAddress
      };
      if (this.cardMethod() === 'cash') {
        this.createCashOrder(payload, this.cartId());
      }
      else if (this.cardMethod() === 'visa') {
        this.createVisaOrder(payload, this.cartId());
      }
    }




  }

  createCashOrder(payload: any, id: string) {
    this.ordersService.cashOrder(payload, id).subscribe({
      next: res => {
        if (res.status === 'success') {
          this.router.navigate(['/orders']);
        }
      },
      error: err => console.error('Order Error:', err)
    });
  }

  createVisaOrder(payload: any, id: string) {
    this.ordersService.VisaOrder(payload, id).subscribe({
      next: res => {


        console.log(res)
        if (res.status === 'success') {
          window.open(res.session.url, '_self')
        }


      },
      error: err => console.error('Visa Error:', err)
    });
  }
}