import { Component, Input } from '@angular/core';
@Component({
  selector: 'sidebar-panel',
  standalone: true,
  imports: [],
  templateUrl: './sidebar-panel.component.html',
  styleUrl: './sidebar-panel.component.css'
})
export class SidebarPanelComponent {
  @Input() name: string = "";
}
