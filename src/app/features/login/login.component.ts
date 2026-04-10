import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/auth/services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  imports: [RouterLink,ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  private readonly fb=inject(FormBuilder)
  private readonly toastr=inject(ToastrService)
  private readonly authService=inject(AuthService)
  private readonly router=inject(Router)
  loginForm: FormGroup = this.fb.group({
    email: ["", [Validators.required, Validators.email]],
    password: ["", [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/)]],
  })
  signIn(){
    this.authService.signIn(this.loginForm.value).subscribe({
      next:res=>{
        console.log(res)
        localStorage.setItem('token',res.token)
        localStorage.setItem('user',JSON.stringify(res.user))
        this.router.navigate([''])
        this.authService.isLoged.set(true)
        this.toastr.success('Logged in successfully!','Fresh Cart',{
          progressBar:true,
          progressAnimation:'increasing',
          positionClass:'toast-top-right'
        })
      },
      error:err=>console.log(err)
    })
  }
  
  submitForm(e: Event) {
    e.preventDefault()
    console.log(this.loginForm.value)
    if (this.loginForm.valid) {
       this.signIn()
    }
    else {
      this.loginForm.markAllAsTouched()
    }
  }

}
