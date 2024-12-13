import { Component, ElementRef, inject, signal, ViewChild } from '@angular/core';
import { CreateBtnComponent } from '../../../Shared/components/createbtn/createbtn.component';
import { SearchBarComponent } from '../../../Shared/components/search-bar/search-bar.component';
import { MercadoCardComponent } from '../../../Shared/components/mercado-card/mercado-card.component';
import { MercadosService } from '../../../Services/mercados.service';
import { MercadoCardDto } from '../../../Types/mercado/MercadoCardDto.model';
import { RouterLinkWithHref } from '@angular/router';

@Component({
  selector: 'app-mercados',
  standalone: true,
  imports: [CreateBtnComponent, SearchBarComponent, MercadoCardComponent, RouterLinkWithHref],
  templateUrl: './mercados.component.html',
  styleUrl: './mercados.component.css'
})
export class AdminMercadosComponent {
  @ViewChild('slider', { static: false }) slider!: ElementRef;
  mercadosService = inject(MercadosService);

  lastMercados = signal<MercadoCardDto[]>([]);

  ngOnInit(): void {
    this.loadLastMercados();
  }

  ngAfterViewInit(): void {
    this.autoScroll();
    this.initScrollFunction();
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

  searchMercadosByName(nombre: string) {
    if (nombre) {
      this.mercadosService.getMercadosSearchByName(nombre).subscribe({
        next: (result) => {
          this.lastMercados.set(result);
        },
        error: (err) => {
          console.error('Error al buscar mercados', err);
        }
      });
    } else {
      this.loadLastMercados();
    }
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
      const walk = (x - startX) * 2;
      slider.scrollLeft = scrollLeft - walk;
    });
  }

}
