import { Component, inject, Input, signal } from '@angular/core';
import { MercadosService } from '../../Services/mercados.service';
import { MercadoCardDto } from '../../Types/mercado/MercadoCardDto.model';
import { LoaderComponent } from "../../Shared/components/loader/loader.component";
import { MercadoCardComponent } from "../../Shared/components/mercado-card/mercado-card.component";

@Component({
  selector: 'app-busqueda',
  standalone: true,
  imports: [LoaderComponent, MercadoCardComponent],
  templateUrl: './busqueda.component.html',
  styleUrl: './busqueda.component.css'
})
export class BusquedaComponent {
  @Input({ required: true }) busqueda!: string;

  mercadosService = inject(MercadosService);
  isLoading = signal(false);
  resultados = signal<MercadoCardDto[]>([]);

  ngOnChanges(): void {
    if (this.busqueda) {
      this.realizarBusqueda(this.busqueda);
    }
  }

  realizarBusqueda(nombre: string): void {
    this.isLoading.set(true);

    this.mercadosService.getMercadosSearchByName(nombre).subscribe({
      next: (resultados) => {
        setTimeout(() => {
          this.isLoading.set(false);
        }, 100);
        this.resultados.set(resultados);
      },
      error: (err) => {
        setTimeout(() => {
          this.isLoading.set(false);
        }, 100);
      }
    });
  }
}

