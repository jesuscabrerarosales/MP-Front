import { Component, inject, Input, signal } from '@angular/core';
import { SearchBarComponent } from '../../../Shared/components/search-bar/search-bar.component';
import { MercadosService } from '../../../Services/mercados.service';
import { MercadoInfoDto } from '../../../Types/mercado/MercadoInfoDto.model';
import { CardComponent } from '../../../Shared/components/card/card.component';
import { PuestosService } from '../../../Services/puestos.service';
import { PuestoDto } from '../../../Types/puesto/puestoDto.model';
import { Router } from '@angular/router';
import { MapComponent } from '../../../Shared/components/map/map.component';


@Component({
  selector: 'app-mercado-page',
  standalone: true,
  imports: [SearchBarComponent, CardComponent,MapComponent],
  templateUrl: './mercado-page.component.html',
  styleUrl: './mercado-page.component.css'
})
export class MercadoPageComponent {
  @Input() busqueda?: string;
  @Input() mercadoId?: string;

  constructor(private router: Router) {}

  mercadosService = inject(MercadosService);
  puestosService = inject(PuestosService);

  mercado = signal<MercadoInfoDto | null>(null);
  puestos = signal<PuestoDto[]>([]);
  isLoading = signal<boolean>(false);

  imagenSeleccionada = signal<string | null>(null);

  onlyOneImg = signal(false);

  ngOnInit(): void {
    if (this.mercadoId) {
      this.cargarDatosMercado(parseInt(this.mercadoId));
    }
  }

  cargarDatosMercado(mercadoId: number): void {
    this.isLoading.set(true);

    this.mercadosService.getMercadoInfoById(mercadoId).subscribe({
      next: (data: MercadoInfoDto) => {
        if (data.galeriasRelacionadas) {
          data.galeriasProcesadas = this.procesarGalerias(data.galeriasRelacionadas);
        }
        if (typeof data.mercadoImageUrls === 'string') {
          data.mercadoImageUrls = data.mercadoImageUrls.split(', ');
          if(data.mercadoImageUrls.length>1){
            this.onlyOneImg.set(true)
          }else{
            this.onlyOneImg.set(false)
          }
        }
        if (data.mercadoImageUrls.length > 0) {
          this.imagenSeleccionada.set(data.mercadoImageUrls[0]);
        }

        this.mercado.set(data);
      },
      error: (err) => {
        console.error('Error al obtener información del mercado:', err);
      }
    });


    this.puestosService.getUltimosPuestosPorMercado(mercadoId).subscribe({
      next: (response: PuestoDto[]) => {
        this.puestos.set(response);
      },
      error: (err) => {
        console.error('Error al obtener los últimos puestos:', err);
      },
      complete: () => {
        this.isLoading.set(false);
      }
    });
  }



  seleccionarImagen(url: string) {
    this.imagenSeleccionada.set(url);
  }


  procesarGalerias(galeriasStr: string): { id: number, nombre: string, categoria: string, imagen: string }[] {
    return galeriasStr.split('|').map(galeria => {
      const partes = galeria.split('%');
      if (partes.length === 4) {
        const [id, nombre, categoria, imagen] = partes;
        return { id: parseInt(id), nombre, categoria, imagen };
      }
      return { id: 0, nombre: 'Desconocido', categoria: 'Desconocido', imagen: '' };
    });
  }

  ngAfterViewInit() {
    this.initScrollFunction('galerias-container');
    this.initScrollFunction('puestos-container');
}

initScrollFunction(containerId: string) {
    const slider = document.getElementById(containerId);
    let isDown = false;
    let startX: number;
    let scrollLeft: number;

    slider?.addEventListener('mousedown', (e) => {
        isDown = true;
        slider.classList.add('cursor-grabbing');
        startX = e.pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
    });

    slider?.addEventListener('mouseleave', () => {
        isDown = false;
        slider.classList.remove('cursor-grabbing');
    });

    slider?.addEventListener('mouseup', () => {
        isDown = false;
        slider.classList.remove('cursor-grabbing');
    });

    slider?.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - slider.offsetLeft;
        const walk = (x - startX) * 2;
        slider.scrollLeft = scrollLeft - walk;
    });
}



  search(value: string) {
    if (this.mercadoId) {
      this.router.navigate(['/puestos', this.mercadoId, value]);
    } else {
      this.router.navigate(['/puestos', value]);
    }
  }

  onCardClick(puestoId: number): void {
    this.router.navigate(['/puesto', puestoId]);
  }
}



