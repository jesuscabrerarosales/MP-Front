import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import { RouterLinkWithHref } from '@angular/router';
import { initFlowbite } from 'flowbite';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, MatSlideToggleModule, MatButtonModule, RouterLinkWithHref],
  template: '<router-outlet />',
})
export class AppComponent {
  title = 'mercadosPeru - que';

  ngOnInit(): void {
    initFlowbite();
  }
}
