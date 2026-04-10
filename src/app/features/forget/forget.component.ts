import { Component, inject, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/auth/services/auth.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-forget',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './forget.component.html',
  styleUrl: './forget.component.css',
})
export class ForgetComponent {
  private readonly authService=inject(AuthService)
  private readonly router=inject(Router)
  step = signal<number>(1);
  email:FormControl=new FormControl("",[Validators.required,Validators.email])
  code:FormControl=new FormControl("",[Validators.required,Validators.maxLength(6)])
  password:FormControl=new FormControl("",[Validators.required,Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/)])

  submitEmail(e:Event){
    e.preventDefault()
    if(this.email.valid){
      const emailObj ={
        email:this.email.value
      }
      this.authService.forgetPass(emailObj).subscribe({
       next:res=>{
        console.log(res)
        this.step.set(2)
       },
       error:err=>{
        console.log(err)
       }
      })
    }
    else{
      this.email.markAsTouched()
    }
  }
  submitCode(e:Event){
    console.log('before preventload')
    e.preventDefault()
    console.log('after preventload')
    if(this.code.valid){
      const codeObj={
        resetCode:this.code.value
      }
      console.log("before api")
      this.authService.verifyCode(codeObj).subscribe({
        next:res=>{
          localStorage.setItem('token',res.token)
          this.step.set(3)
          
        },
       error:err=>{
        console.log(err)
       }
      })
    }
    else{
      this.code.markAsTouched()
    }
  }
  submitPass(e:Event){
    e.preventDefault()
    if(this.password.valid){
       const newPassObj={
        email:this.email.value,
        newPassword: this.password.value
       }
       this.authService.resetNewPass(newPassObj).subscribe({
        next:res=>{
          console.log(res)
          this.router.navigate(['/'])
        },
        error:err=>{
          console.log(err)
        }
       })
    }
    else{
      this.password.markAsTouched()
    }
  }

}
