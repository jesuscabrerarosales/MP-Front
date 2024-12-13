import { Component } from '@angular/core';
import { RouterLinkWithHref } from '@angular/router';

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [RouterLinkWithHref],
  templateUrl: './index.component.html',
  styleUrl: './index.component.css'
})
export class AdminIndexComponent {

}
