import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { minLength } from '@angular/forms/signals';
import { Router, RouterLink } from "@angular/router";
import { AuthService } from '../../core/auth/services/auth.service';


@Component({
  selector: 'app-register',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  private readonly fb = inject(FormBuilder)
  private readonly authService=inject(AuthService)
  private readonly router=inject(Router)
  registerForm: FormGroup = this.fb.group({
    name: ["", [Validators.required, Validators.minLength(3)]],
    email: ["", [Validators.required, Validators.email]],
    password: ["", [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/)]],
    rePassword: ["", [Validators.required]],
    phone: ["", [Validators.required, Validators.pattern(/^[\+]?[0-9]{10,14}$/)]],
  }, { validators: this.confirmPass })

  submitForm(e: Event) {
    e.preventDefault()
    console.log(this.registerForm.value)
    if (this.registerForm.valid) {
       this.signUp()
    }
    else {
      this.registerForm.markAllAsTouched()
    }
  }
  confirmPass(group: AbstractControl) {
    const pass = group.get('password')?.value;
    const rePass = group.get('rePassword')?.value;

    if (pass !== rePass && rePass !== '') {
      group.get('rePassword')?.setErrors({ mismatch: true });
      return { mismatch: true };
    }

    return null;
  }
  signUp(){
    this.authService.signUp(this.registerForm.value).subscribe({
      next:res=>{
        this.router.navigate(['/login'])
      },
      error:err=>console.log(err)
    })
  }

}
