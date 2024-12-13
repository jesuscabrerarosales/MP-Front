import { Component, Input } from '@angular/core';
import { PuestoDto } from '../../../Types/puesto/puestoDto.model';

@Component({
  selector: 'puesto-card',
  standalone: true,
  imports: [],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {
  @Input() puesto!: PuestoDto;
}
