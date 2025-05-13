import { Component } from '@angular/core';
import { DarkThemeSelectorService } from '../switch-themes.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  isOpen = false;
  constructor(protected darkThemeSelectorService: DarkThemeSelectorService) {}
  
  toggleClick() {
    this.isOpen = !this.isOpen;
  }
  
  toggleDarkMode() {
    if(this.darkThemeSelectorService.currentTheme() === 'dark') {
      this.darkThemeSelectorService.setLightTheme();
    } else {
      this.darkThemeSelectorService.setDarkTheme();
    }
  }
}
