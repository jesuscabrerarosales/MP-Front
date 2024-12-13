import { Component, inject, signal } from '@angular/core';
import { CreateBtnComponent } from '../../../Shared/components/createbtn/createbtn.component';
import { SearchBarComponent } from '../../../Shared/components/search-bar/search-bar.component';
import { CardComponent } from '../../../Shared/components/card/card.component';
import { StyledBtnComponent } from '../../../Shared/components/styled-btn/styled-btn.component';
import { PuestosService } from '../../../Services/puestos.service';
import { PuestoDto } from '../../../Types/puesto/puestoDto.model';
import { RouterLinkWithHref } from '@angular/router';

@Component({
  selector: 'app-puestos',
  standalone: true,
  imports: [RouterLinkWithHref, CreateBtnComponent, SearchBarComponent,CardComponent,StyledBtnComponent],
  templateUrl: './puestos.component.html',
  styleUrl: './puestos.component.css'
})
export class AdminPuestosComponent {
  puestosService = inject(PuestosService);

  puesto = signal<PuestoDto[]>([]);

  ngOnInit(): void {
    this.cargarDatos();
  }

  cargarDatos(): void {
    this.puestosService.getUltimosPuestos().subscribe({
      next: (response: PuestoDto[]) => {
        this.puesto.set(response);
      },
      error: (err) => {
        console.error('Error al obtener los últimos puestos:', err);
      }
    });
  }

  buscarPuestos(nombrePuesto: string): void {
    if (nombrePuesto.trim()) {
      this.puestosService.getPuestosByNombreSimilutd(nombrePuesto).subscribe({
        next: (response: PuestoDto[]) => {
          this.puesto.set(response);
        },
        error: (err) => {
          console.error('Error al buscar los puestos por nombre:', err);
        }
      });
    } else {
      this.cargarDatos();
    }
  }
}
