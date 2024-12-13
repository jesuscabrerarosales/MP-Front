import { Component, Input } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'close-btn',
  standalone: true,
  imports: [MatIcon, MatButtonModule],
  templateUrl: './close-btn.component.html',
  styleUrl: './close-btn.component.css'
})
export class CloseBtnComponent {
}
