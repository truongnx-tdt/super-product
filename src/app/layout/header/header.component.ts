import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { headerList, HeaderList } from '../headerList';

@Component({
  selector: 'app-header',
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  //#region Properties
  isOpen = false;
  headerList: HeaderList[] = [];
  //#endregion

  //#region Constructor
  constructor() {
    this.headerList = headerList.filter(item => item.isActive);
  }
  //#endregion

  //#region Methods 

  toggleClick() {
    this.isOpen = !this.isOpen;
  }
  
  
  //#endregion
}
