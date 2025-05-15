import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-auth-layout',
  imports: [RouterOutlet],
  template: `
    <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
      <router-outlet />
    </div>
  `
})
export class AuthLayoutComponent {} 