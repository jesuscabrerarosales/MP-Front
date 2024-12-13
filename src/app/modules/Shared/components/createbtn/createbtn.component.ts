import { Component, Input } from '@angular/core';
import { RouterLinkWithHref } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'create-btn',
  standalone: true,
  imports: [RouterLinkWithHref, MatButtonModule, MatIconModule, ],
  templateUrl: './createbtn.component.html',
  styleUrl: './createbtn.component.css'
})
export class CreateBtnComponent {
  @Input() icon = "add";
  @Input() text = "Crear"
  @Input() to = "";
}
