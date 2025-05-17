import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { headerList, HeaderList } from '../headerList';
import { SettingsComponent } from '../../shared/settings/settings.component';
import { LanguageService } from '../../core/services/language.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, SettingsComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  //#region Properties
  isLoggedIn = false;
  isOpen = false;
  headerList: HeaderList[] = [];
  //#endregion

  //#region Constructor
  constructor(private languageService: LanguageService) {
    this.headerList = headerList.filter(item => item.isActive);
  }
  //#endregion

  //#region Methods 

  toggleClick() {
    this.isOpen = !this.isOpen;
  }
  
  translate(key: string): string {
    return this.languageService.translate(key);
  }
  
  //#endregion
}
