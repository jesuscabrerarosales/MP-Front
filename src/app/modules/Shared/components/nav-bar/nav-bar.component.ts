import { Component, signal } from '@angular/core';
import { Router, RouterLinkActive, RouterLinkWithHref } from '@angular/router';
import { SearchBarComponent } from '../search-bar/search-bar.component';

@Component({
  selector: 'nav-bar',
  standalone: true,
  imports: [SearchBarComponent,
    RouterLinkWithHref, RouterLinkActive],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {
  hideContent = signal<boolean>(true);

  constructor(private router: Router) {}

  toggleContent = () => {
    console.log("toggle");
    this.hideContent.update(v => !v)
  }

  onChangeRoute = () => {
    this.hideContent.set(true)
  }

  search(value: string) {
    this.router.navigate(['/busqueda', value]);
  }
}
