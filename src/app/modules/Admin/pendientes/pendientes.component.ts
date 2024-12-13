import { Component, inject, signal } from '@angular/core';
import { CardComponent } from '../../Shared/components/card/card.component';
import { PendientesService } from '../../Services/pendientes.service';
import { StyledBtnComponent } from '../../Shared/components/styled-btn/styled-btn.component';

@Component({
  selector: 'app-pendientes',
  standalone: true,
  imports: [CardComponent, StyledBtnComponent],
  templateUrl: './pendientes.component.html',
  styleUrl: './pendientes.component.css'
})
export class AdminPendientesComponent {
  pendientesService = inject(PendientesService)

  puestos = signal<{}[]>([]);
  mercados = signal<{}[]>([]);
  galerias = signal<{}[]>([]);

  ngOnInit() {
    this.puestos.update(_ => this.pendientesService.getPuestos())
    this.mercados.update(_ => this.pendientesService.getMercados())
    this.galerias.update(_ => this.pendientesService.getGalerias())
  }
}
