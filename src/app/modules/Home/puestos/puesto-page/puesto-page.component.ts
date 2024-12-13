import { Component, inject, Input, signal } from '@angular/core';
import { PuestoInfoDto } from '../../../Types/puesto/PuestoInfoDto.model';
import { PuestosService } from '../../../Services/puestos.service';

@Component({
  selector: 'app-puesto-page',
  standalone: true,
  imports: [],
  templateUrl: './puesto-page.component.html',
  styleUrl: './puesto-page.component.css'
})
export class PuestoPageComponent {
  @Input() puestoId?: string;

  puestoInfoSignal = signal<PuestoInfoDto | null>(null);
  loadingSignal = signal<boolean>(false);
  errorSignal = signal<string | null>(null);
  imagenSplit = signal<string | null>(null);

  puestosService = inject(PuestosService);

  ngOnInit(): void {
    if (this.puestoId) {
      this.loadPuestoInfo(parseInt(this.puestoId));
    }
  }

  loadPuestoInfo(id: number): void {
    this.loadingSignal.set(true);

    this.puestosService.getPuestoInfoById(id).subscribe({
      next: (data: PuestoInfoDto) => {


        if (typeof data.imageUrls === 'string') {
          data.imageUrls = data.imageUrls.split(', ');
        }
        if (data.imageUrls.length > 0) {
          this.imagenSplit.set(data.imageUrls[0]);
        }

        this.puestoInfoSignal.set(data);
        this.loadingSignal.set(false);
      },
      error: (err) => {
        console.error('Error al obtener información del puesto:', err);
        this.errorSignal.set('Failed to load data.');
        this.loadingSignal.set(false);
      }
    });


  }
}
