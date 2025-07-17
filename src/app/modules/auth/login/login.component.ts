import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

import { LanguageService } from '../../../core/services/language.service';
import { GoogleIconComponent } from '../../../shared/icons';
import { SettingsComponent } from '../../../shared/settings/settings.component';
import { NotificationService } from '../../../shared/notification/notification.service';
import { AuthService } from '../auth.service';
import { StorageService } from '../../../core/services/storage.service';


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

  private notiService = inject(NotificationService);
  private authService = inject(AuthService);
  private route = inject(Router);
  private readonly storeService = inject(StorageService);

  constructor(
    private fb: FormBuilder,
    private languageService: LanguageService
  ) {
  }

  async ngOnInit() {
    this.loginForm = this.fb.group({
      account: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.pattern(this.passwordPattern)]]
    });
  }

  translate(key: string): string {
    return this.languageService.translate(key);
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  signInWithGoogle() {
    try {
      // this.authService.loginWithGoogle('xuantruong').subscribe({
      //   next: (res) => {
      //     if (res.status !== 200) {
      //       this.notiService.error('noti', res.message);
      //       return;
      //     }
      //     this.notiService.success('noti', res.message);
      //     this.route.navigate(['/']);
      //   },
      //   error: (error) => {
      //     this.notiService.error('noti', error);
      //   }
      // });
    }
    catch (error) {
      this.notiService.error('noti', 'login_failed_message');
      return;
    }

  }

  signInWithFacebook() {
    console.log('Facebook Sign-In clicked');
  }

  onSubmit() {
    if (this.loginForm.valid) {
      try {
        this.authService.login(this.loginForm.value).subscribe({
          next: (res) => {
            if (res.status !== 200) {
              this.notiService.error('noti', res.message);
              return;
            }
            this.notiService.success('noti', res.message);
            this.route.navigate(['/']);
          },
          error: (error) => {
            this.notiService.error('noti', 'login_failed_message');
          }
        });
      } catch (error) {
        this.notiService.error('noti', 'login_failed_message');
        return;
      }
    } else {
      Object.keys(this.loginForm.controls).forEach(key => {
        const control = this.loginForm.get(key);
        control?.markAsTouched();
      });
    }
  }
}
