import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CoreModule } from './core/core.module';
import { LayoutModule } from './layout/layout.module';
import { SettingsComponent } from './shared/settings/settings.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CoreModule, LayoutModule, SettingsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'super-product';
}
