import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SettingsComponent } from './shared/settings/settings.component';
import { SpinnerComponent } from './shared/spinner/spinner.component';
import { NotificationComponent } from "./shared/notification/notification.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SettingsComponent, SpinnerComponent, NotificationComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent implements OnInit {
  constructor() { }
  ngOnInit(): void {
  }
}