import { Component, inject, signal } from '@angular/core';
import { DistritoSelectView } from '../../Types/distrito/DistritoSelectViewDto.model';
import { MercadoCardDto } from '../../Types/mercado/MercadoCardDto.model';
import { DistritosService } from '../../Services/distrito.service';
import { LowerCapitalizePipe } from '../../Pipes/lower-capitalize.pipe';
import { SearchBarComponent } from '../../Shared/components/search-bar/search-bar.component';
import { FormsModule } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { MercadoCardComponent } from '../../Shared/components/mercado-card/mercado-card.component';
import { LoaderComponent } from '../../Shared/components/loader/loader.component';
import { MercadosService } from '../../Services/mercados.service';

@Component({
  selector: 'app-distritos',
  standalone: true,
  imports: [MatIcon, SearchBarComponent, MercadoCardComponent, LoaderComponent,
    LowerCapitalizePipe, FormsModule],
  templateUrl: './distritos.component.html',
  styleUrl: './distritos.component.css'
})
export class DistritosComponent {
  distritosService = inject(DistritosService);
  mercadosService = inject(MercadosService);
  distritos = this.distritosService.distritosSelect;
  distritosFiltered = signal<DistritoSelectView[]>([...this.distritos()]);
  currentDistritoId = signal<number>(0)
  mercadosByDistrito = signal<MercadoCardDto[]>([]);
  loading = signal<boolean>(false);

  onChangeFilter(event: Event) {
    let input = event.target as HTMLInputElement
    this.distritosFiltered.set(this.distritos().filter(distrito =>
      distrito.nombre.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().includes(input.value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""))
    ))
  }

  loadMercadosByDistritoId(idDistrito: number){
    if (this.currentDistritoId() == idDistrito) {
      this.currentDistritoId.set(0);
      this.mercadosByDistrito.set([]);
      return
    }
    this.currentDistritoId.set(idDistrito);
    this.loading.set(true);
    this.mercadosService.getMercadosByDistritoId(idDistrito).subscribe({
      next: (mercados: MercadoCardDto[]) => {
        this.mercadosByDistrito.set(mercados || []);
        this.loading.set(false);
      },
      error: (error) => {
        console.error('Error fetching mercados:', error);
        this.loading.set(false);
      }
    });
  }
}
