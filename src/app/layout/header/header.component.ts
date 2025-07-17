import { Component, HostListener, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { headerList, HeaderList } from '../headerList';
import { SettingsComponent } from '../../shared/settings/settings.component';
import { LanguageService } from '../../core/services/language.service';
import { CloseIconComponent, MenuIconComponent } from '../../shared/icons';
import { AuthService } from '../../modules/auth/auth.service';


@Component({
  selector: 'app-header',
  imports: [
    CommonModule,
    RouterModule,
    SettingsComponent,
    CloseIconComponent,
    MenuIconComponent
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  //#region Properties
  isOpen = false;
  headerList: HeaderList[] = [];
  isScrolled = false;
  //#endregion

  authService = inject(AuthService);
  //#region Constructor
  constructor(
    private languageService: LanguageService,
  ) {
    this.headerList = headerList.filter(item => item.isActive);
  }
  //#endregion

  //#region Methods 
  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = window.scrollY > 0;
  }

  toggleClick() {
    this.isOpen = !this.isOpen;
  }

  translate(key: string): string {
    return this.languageService.translate(key);
  }

  logout() {
    this.authService.logout().subscribe();
  }
  //#endregion
}
