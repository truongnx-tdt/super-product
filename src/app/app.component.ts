import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SettingsComponent } from './shared/settings/settings.component';
import { SpinnerComponent } from './shared/spinner/spinner.component';
import { NotificationComponent } from "./shared/notification/notification.component";
import { HeadService } from './core/services/head.service';
import { Event, RouterEvent, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SettingsComponent, SpinnerComponent, NotificationComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  private headService = inject(HeadService);
  constructor(private router: Router) { }
  ngOnInit(): void {
    this.router.events.pipe(
      filter((e: Event | RouterEvent): e is RouterEvent => e instanceof RouterEvent)
    ).subscribe((e: RouterEvent) => {
      switch (e.url) {
        case '/':
          this.headService.setTitleAndDescription('home_title', 'home_subtitle', 'logo_tdt_color.png')
          break;
        case '/auth/login':
          this.headService.setTitleAndDescription("login_title", "login_subtitle", "password.png");
          break;
        case '/auth/signup':
          this.headService.setTitleAndDescription("signup_title", "signup_subtitle", "icons8-sign-up-50.png");
          break;
        case '/about':
          this.headService.setTitleAndDescription("about_title", "about_mission", "logo_tdt_white.png");
          break;
        default:
          break;
      }

    });
  }
}
