import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CoreModule } from './core/core.module';
import { LayoutModule } from './layout/layout.module';
import { ThemeToggleComponent } from './shared/theme-toggle/theme-toggle.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CoreModule, LayoutModule, ThemeToggleComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'super-product';
}
