import { Component } from '@angular/core';

@Component({
  selector: 'app-menu-icon',
  standalone: true,
  template: `
    <svg class="w-7 h-7 dark:fill-white" fill="#000" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path>
    </svg>
  `
})
export class MenuIconComponent {} 