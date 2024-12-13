import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'styled-btn',
  standalone: true,
  imports: [MatButtonModule, CommonModule],
  templateUrl: './styled-btn.component.html',
  styleUrl: './styled-btn.component.css'
})
export class StyledBtnComponent {
  @Input() outlined: boolean = false;
  @Input() type: string = "button";
  @Input() onclick: Function = () => {console.log("hola")};
}
