import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../core/services/language.service';

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent {
  private languageService = inject(LanguageService);

  translate(key: string): string {
    return this.languageService.translate(key);
  }
}
