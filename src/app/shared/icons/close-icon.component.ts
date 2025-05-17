import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-close-icon',
  template: `
    <svg 
      [attr.width]="width"
      [attr.height]="height"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      xmlns="http://www.w3.org/2000/svg">
      <line x1="18" y1="6" x2="6" y2="18"></line>
      <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
  `
})
export class CloseIconComponent {
  @Input() width: string | number = 24;
  @Input() height: string | number = 24;
} 