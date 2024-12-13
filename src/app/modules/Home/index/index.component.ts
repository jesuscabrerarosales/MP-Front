import { Component, signal, inject, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { Router, RouterOutlet } from '@angular/router';
import { RouterLinkWithHref } from '@angular/router';
import { DistritosService } from '../../Services/distrito.service';
import { MercadosService } from '../../Services/mercados.service';
import { MercadoCardDto } from '../../Types/mercado/MercadoCardDto.model';
import { MercadoCardComponent } from '../../Shared/components/mercado-card/mercado-card.component';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MercadoDto } from '../../Types/mercado/mercadoDto.model';

import { initFlowbite } from 'flowbite';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MercadoCardComponent, RouterOutlet, RouterLinkWithHref,
    MatSelectModule
  ],
  templateUrl: './index.component.html',
  styleUrl: './index.component.css'
})
export class IndexComponent implements AfterViewInit {
  distritosService = inject(DistritosService);
  mercadosService = inject(MercadosService);

  distritos = this.distritosService.distritosSelect;
  mercadoDto = signal<MercadoDto[]>([]);
  lastMercados = signal<MercadoCardDto[]>([]);

  @ViewChild('slider', { static: false }) slider!: ElementRef;

  constructor(private fb: FormBuilder, private router: Router) { }


  ngOnInit(): void {
    this.loadLastMercados();

    const init = async () => {
      initFlowbite()
    };
    init();
  }

  ngAfterViewInit(): void {
    this.autoScroll();
    this.initScrollFunction();
  }

  autoScroll() {
    setInterval(() => {
      if (this.slider && this.slider.nativeElement.scrollLeft !== undefined) {
        this.slider.nativeElement.scrollLeft += 1;
      }
    }, 20);
  }

  initScrollFunction() {
    const slider = this.slider.nativeElement as HTMLElement;
    let isDown = false;
    let startX: number;
    let scrollLeft: number;

    slider.addEventListener('mousedown', (e) => {
      isDown = true;
      slider.classList.add('cursor-grabbing');
      startX = e.pageX - slider.offsetLeft;
      scrollLeft = slider.scrollLeft;
    });

    slider.addEventListener('mouseleave', () => {
      isDown = false;
      slider.classList.remove('cursor-grabbing');
    });

    slider.addEventListener('mouseup', () => {
      isDown = false;
      slider.classList.remove('cursor-grabbing');
    });

    slider.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - slider.offsetLeft;
      const walk = (x - startX) * 2; // Ajusta la velocidad de desplazamiento
      slider.scrollLeft = scrollLeft - walk;
    });
  }

  onDistritoChange(distritoId: number): void {
    this.mercadosService.getMercadosById(distritoId).subscribe({
      next: (mercados: MercadoDto[]) => {
        this.mercadoDto.set(mercados);
      },
      error: (err) => {
        console.error('Error al obtener los mercados', err);
      }
    });
  }

  loadLastMercados() {
    this.mercadosService.getUltimosMercados().subscribe({
      next: (lastMercados) => {
        this.lastMercados.set(lastMercados);
      },
      error: (err) => {
        console.error('Error al cargar los nombres de los mercados', err);
      }
    });
  }



  onMercadoChange(mercadoId: number): void {
    this.router.navigate(['/mercado', mercadoId]);
  }
}
