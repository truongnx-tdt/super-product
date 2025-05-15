import { Component } from '@angular/core';
import { DarkThemeSelectorService } from '../../layout/switch-themes.service';

@Component({
  selector: 'app-theme-toggle',
  imports: [],
  templateUrl: './theme-toggle.component.html',
  styleUrl: './theme-toggle.component.css'
})
export class ThemeToggleComponent {
  /**
   *
   */
  constructor(protected darkThemeSelectorService: DarkThemeSelectorService) {
    
  }

  toggleDarkMode() {
    if(this.darkThemeSelectorService.currentTheme() === 'dark') {
      this.darkThemeSelectorService.setLightTheme();
    } else {
      this.darkThemeSelectorService.setDarkTheme();
    }
  }
}
