import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CoreModule } from './core/core.module';
import { LayoutModule } from './layout/layout.module';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CoreModule, LayoutModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'super-product';
  ngOnInit() {
    
  }
}
