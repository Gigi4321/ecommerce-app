import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../core/auth/services/auth.service';
import { get } from 'https';

@Component({
  selector: 'app-settings',
  imports: [ReactiveFormsModule],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css',
})
export class SettingsComponent {
  profileForm: FormGroup;
  passwordForm: FormGroup;
  private readonly authService = inject(AuthService)

  constructor(private fb: FormBuilder) {
    this.profileForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [
        Validators.required,
        Validators.pattern(/^01[0-9]{9}$/) // Egyptian format
      ]]
    });

    this.passwordForm = this.fb.group({
      currentPassword: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      rePassword: ['', [Validators.required]]
    }, { validators: this.passwordMatchValidator });
  }

  get ff() {
    return this.passwordForm.controls;
  }

  // Custom validator
  passwordMatchValidator(group: AbstractControl) {
    const pass = group.get('password')?.value;
    const rePass = group.get('rePassword')?.value;

    return pass === rePass ? null : { mismatch: true };
  }


  get f() {
    return this.profileForm.controls;
  }
  updateUser() {
    if (this.profileForm.invalid) return;

    this.authService.updateUser(this.profileForm.value).subscribe({

      next: (res) => {
        console.log('Updated:', res);
         localStorage.setItem('user', JSON.stringify(res.user))

      },

      error: (err) => {
        console.log('Error:', err);
      }
    });
  }

  changePassword() {
    if (this.passwordForm.invalid) return;

    this.authService.changePassword(this.passwordForm.value).subscribe({
      next: (res) => {
        console.log('Password updated', res);
        this.passwordForm.reset();
        this.passwordForm.updateValueAndValidity();
        localStorage.setItem('token', res.token)
        localStorage.setItem('user', JSON.stringify(res.user))
        this.authService.isLoged.set(true)
      },
      error: (err) => {
        console.log(err);
      }
    });
  }



}
