import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { LanguageService } from '../../../core/services/language.service';
import { GoogleIconComponent } from '../../../shared/icons';
import { SettingsComponent } from '../../../shared/settings/settings.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    GoogleIconComponent,
    SettingsComponent
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  showPassword = false;
  passwordPattern = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/; // At least 8 characters, 1 uppercase, 1 lowercase, 1 number, 1 special character

  constructor(
    private fb: FormBuilder,
    private languageService: LanguageService
  ) {
  }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.pattern(this.passwordPattern)]],
      remember: [false]
    });
  }

  translate(key: string): string {
    return this.languageService.translate(key);
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  signInWithGoogle() {
    // TODO: Implement Google Sign-In
    console.log('Google Sign-In clicked');
  }

  signInWithFacebook() {
    // TODO: Implement Facebook Sign-In
    console.log('Facebook Sign-In clicked');
  }

  onSubmit() {
    if (this.loginForm.valid) {
      console.log('Form submitted:', this.loginForm.value);
      // TODO: Implement login logic
    } else {
      // Mark all fields as touched to trigger validation display
      Object.keys(this.loginForm.controls).forEach(key => {
        const control = this.loginForm.get(key);
        control?.markAsTouched();
      });
    }
  }
}
