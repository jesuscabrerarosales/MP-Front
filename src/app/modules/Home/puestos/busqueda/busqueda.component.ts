import { Component, inject, Input, signal } from '@angular/core';
import { SearchBarComponent } from '../../../Shared/components/search-bar/search-bar.component';
import { CardComponent } from '../../../Shared/components/card/card.component';
import { PuestoDto } from '../../../Types/puesto/puestoDto.model';
import { PuestosService } from '../../../Services/puestos.service';
import { Router } from '@angular/router';
import { LoaderComponent } from '../../../Shared/components/loader/loader.component';

@Component({
  selector: 'app-busqueda',
  standalone: true,
  imports: [SearchBarComponent,CardComponent, LoaderComponent],
  templateUrl: './busqueda.component.html',
  styleUrl: './busqueda.component.css'
})
export class PuestosBusquedaComponent {
  @Input() busqueda?: string;
  @Input() mercadoId?: string;

  puestosService = inject(PuestosService);
  router = inject(Router);
  puestos = signal<PuestoDto[]>([]);
  loading = signal<boolean>(false);
  mercadoName?: string;

  ngOnInit(): void {
    if (this.busqueda && this.mercadoId) {
      this.searchPuestos(this.mercadoId, this.busqueda);
    }
  }

  searchPuestos(mercadoId: string, searchTerm: string): void {
    this.loading.set(true);
    this.puestosService.findPuestosByMercadoAndSearch(Number(mercadoId), searchTerm)
      .subscribe({
        next: (puestos) => {
          this.puestos.set(puestos);
          this.mercadoName = puestos[0]?.mercadoName || "Mercado";
          this.loading.set(false);
        },
        error: (err) => {
          console.error("Error al realizar la búsqueda de puestos:", err);
          this.loading.set(false);
        }
      });
  }

  search(value: string): void {
    if (this.mercadoId) {
      this.router.navigate(['/puestos', this.mercadoId, value]);
      this.searchPuestos(this.mercadoId, value);
    } else {
      this.router.navigate(['/']);
    }
  }

  onCardClick(puestoId: number): void {
    this.router.navigate(['/puesto', puestoId]);
  }
}
