import { Component, Input, inject } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { RouterLinkActive, RouterLinkWithHref } from '@angular/router';

@Component({
  selector: 'sidebar-item',
  standalone: true,
  imports: [RouterLinkWithHref, RouterLinkActive, MatIcon],
  templateUrl: './sidebar-item.component.html',
  styleUrl: './sidebar-item.component.css'
})
export class SidebarItemComponent {
  @Input() icon: string | null = null;
  @Input({required: true}) text!: string;
  @Input() qty: number = 0;

  @Input() to: string = '';
  @Input() exact: boolean = false;
  @Input() onclick: Function = ()=>{};
}
