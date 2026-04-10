import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AddressService } from '../../../core/services/address.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-address',
  imports: [ReactiveFormsModule],
  templateUrl: './address.component.html',
  styleUrl: './address.component.css',
})
export class AddressComponent {
    private readonly fb=inject(FormBuilder)
    private readonly addressService=inject(AddressService)
    addresses=signal<any[]>([])
  

    addressForm: FormGroup = this.fb.group({
    name: ["", [Validators.required]],
    details: ["", [Validators.required]],
    city: ["", [Validators.required]],
    phone: ["", [Validators.required, Validators.pattern(/^[\+]?[0-9]{10,14}$/)]],
  })
  addAddress(e:Event){
    e.preventDefault()
    if(this.addressForm.valid){
      this.addressService.addAddress(this.addressForm.value).subscribe({
        next:res=>{
          console.log(res)
          this.addresses.set(res.data)
          this.addressForm.reset()
        },
        error:err=>console.log(err)
      })
    }
    else{
      this.addressForm.markAllAsTouched()
    }

    
  }
  getAllAddresses(){
    this.addressService.getUserAddresses().subscribe({
      next:res=>{
        console.log(res)
        this.addresses.set(res.data)
      },
      error:err=>console.log(err)
    })
  }
  deleteAddress(id: string) {
  Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to undo this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#16a34a',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!',
    cancelButtonText: 'Cancel'
  }).then((result) => {
    if (result.isConfirmed) {
      this.addressService.deleteAddress(id).subscribe({
        next: (res) => {
          Swal.fire({
            icon: 'success',
            title: 'Deleted!',
            text: 'Address has been removed.',
            timer: 1500,
            showConfirmButton: false
          });
          this.getAllAddresses();
        },
        error: (err) => {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Something went wrong'
          });
          console.log(err);
        }
      });

    }

  });
}
  
  ngOnInit(){
    this.getAllAddresses()
  }
}
