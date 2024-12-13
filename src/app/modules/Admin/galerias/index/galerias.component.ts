import { Component, inject, signal, ChangeDetectorRef, Input} from '@angular/core';
import { CreateBtnComponent } from '../../../Shared/components/createbtn/createbtn.component';
import { SearchBarComponent } from '../../../Shared/components/search-bar/search-bar.component';
import { MercadosService } from '../../../Services/mercados.service';
import { MercadoSelectView } from '../../../Types/mercado/MercadoSelectViewDto.model';
import { GaleriasService } from '../../../Services/galerias.service';
import { GaleriaSelectView } from '../../../Types/galeria/GaleriaSelectViewDto.model';
import { MatIcon } from '@angular/material/icon';
import { LoaderComponent } from '../../../Shared/components/loader/loader.component';
import { GaleriaSVSelectView } from '../../../Types/galeria/GaleriaSVSearchDto.model';
import { RouterLinkWithHref } from '@angular/router';

@Component({
  selector: 'app-galerias',
  standalone: true,
  imports: [MatIcon, LoaderComponent, CreateBtnComponent, SearchBarComponent,RouterLinkWithHref],
  templateUrl: './galerias.component.html',
  styleUrl: './galerias.component.css'
})
export class AdminGaleriasComponent {
  mercadosService = inject(MercadosService);
  galeriasService = inject(GaleriasService);

  mercados = signal<MercadoSelectView[]>([]);
  galeriasFiltered = signal<GaleriaSelectView[]>([]);
  galeriasSVS = signal<GaleriaSVSelectView[]>([]);
  currentMercadoId = signal<number | null>(null);
  currentGaleriaId: number | null = null;
  loading = signal<boolean>(false);

  searchQuery = '';
  isSearching = false;


  constructor(private cdRef: ChangeDetectorRef) {
    this.loadMercados();
  }

  toggleGaleria(galeriaId: number) {
    this.currentGaleriaId = this.currentGaleriaId === galeriaId ? null : galeriaId;
    this.cdRef.detectChanges();
  }

  loadMercados() {
    this.mercadosService.getMercadosName().subscribe({
      next: (mercados) => this.mercados.set(mercados),
      error: (error) => console.error('Error fetching mercados:', error)
    });
  }

  loadGalerias(mercadoId: number) {
    if (this.currentMercadoId() === mercadoId) {
      this.currentMercadoId.set(null);
      this.galeriasFiltered.set([]);
      return;
    }

    this.currentMercadoId.set(mercadoId);
    this.loading.set(true);

    this.galeriasService.getGaleriasName(mercadoId).subscribe({
      next: (galerias) => {
        this.galeriasFiltered.set(galerias);
        this.loading.set(false);
      },
      error: (error) => {
        console.error('Error fetching galerias:', error);
        this.loading.set(false);
      }
    });
  }

  updateSearchQuery(event: Event) {
    const input = event.target as HTMLInputElement;
    this.searchQuery = input.value.trim();
    this.isSearching = !!this.searchQuery;

    if (this.isSearching) {
      this.galeriasService.getGaleriasSearchByName(this.searchQuery).subscribe({
        next: (galerias) => {
          this.galeriasSVS.set(galerias);
          this.mercados.set([]);
          this.cdRef.detectChanges();
        },
        error: (error) => {
          console.error('Error fetching galerias:', error);
          this.loading.set(false);
        }
      });
    } else {
      this.loadMercados();
    }
  }
}
