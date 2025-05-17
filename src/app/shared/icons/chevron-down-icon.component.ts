import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-chevron-down-icon',
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
      <path d="M19 9l-7 7-7-7"></path>
    </svg>
  `
})
export class ChevronDownIconComponent {
  @Input() width: string | number = 24;
  @Input() height: string | number = 24;
} 