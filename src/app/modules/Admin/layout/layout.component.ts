import { Component, inject } from '@angular/core';
import { RouterLinkActive, RouterLinkWithHref, RouterOutlet } from '@angular/router';
import { SidebarPanelComponent } from '../../Shared/components/sidebar-panel/sidebar-panel.component';
import { SidebarItemComponent } from '../../Shared/components/sidebar-item/sidebar-item.component';
import { AdminService } from '../../Services/admin.service';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [SidebarPanelComponent, SidebarItemComponent, RouterOutlet, RouterLinkWithHref, RouterLinkActive],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class AdminLayoutComponent {
  adminService = inject(AdminService);
}
