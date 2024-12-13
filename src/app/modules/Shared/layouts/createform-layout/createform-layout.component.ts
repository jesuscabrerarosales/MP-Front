import { Component, Input } from '@angular/core';

@Component({
  selector: 'createform-layout',
  standalone: true,
  imports: [],
  templateUrl: './createform-layout.component.html',
  styleUrl: './createform-layout.component.css'
})
export class CreateFormLayoutComponent {
  @Input() title: string = "Crear"
}
