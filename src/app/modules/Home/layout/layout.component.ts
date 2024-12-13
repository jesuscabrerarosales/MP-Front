import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavBarComponent } from '../../Shared/components/nav-bar/nav-bar.component';

@Component({
  selector: 'home-layout',
  standalone: true,
  imports: [RouterOutlet, NavBarComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class HomeLayoutComponent {

}
