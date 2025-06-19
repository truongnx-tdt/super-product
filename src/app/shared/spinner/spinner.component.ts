import { Component, inject } from '@angular/core';
import { LoaderService } from './loader.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-spinner',
  imports: [CommonModule],
  templateUrl: './spinner.component.html',
  styleUrl: './spinner.component.css'
})
export class SpinnerComponent {
  protected loader = inject(LoaderService);

}
