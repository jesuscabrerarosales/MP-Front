import { Component, inject, signal, ViewChild } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { CreateFormLayoutComponent } from '../../../Shared/layouts/createform-layout/createform-layout.component';
import { MatInputModule } from '@angular/material/input';
import { StyledBtnComponent } from '../../../Shared/components/styled-btn/styled-btn.component';
import { LoaderComponent } from '../../../Shared/components/loader/loader.component';
import { CreateGaleriaDto } from '../../../Types/galeria/CreateGaleriaDto.model';
import { GaleriasService } from '../../../Services/galerias.service';
import { DistritosService } from '../../../Services/distrito.service';
import { DistritoDto } from '../../../Types/distrito/distritoDto.model';
import { UploadFilesComponent } from '../../../Shared/components/upload-files/upload-files.component';
import { MercadosService } from '../../../Services/mercados.service';
import { MercadoDto } from '../../../Types/mercado/mercadoDto.model';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [UploadFilesComponent, CreateFormLayoutComponent, StyledBtnComponent, LoaderComponent, MatSelectModule, ReactiveFormsModule, MatInputModule],
  templateUrl: './create.component.html',
  styleUrl: './create.component.css'
})
export class AdminCreateGaleriaComponent {
  @ViewChild(UploadFilesComponent) listComponent!: UploadFilesComponent;
  galeriaService = inject(GaleriasService)
  distritosService = inject(DistritosService);
  mercadosService = inject(MercadosService);

  distritos = signal<DistritoDto[]>([]);
  mercados = signal<MercadoDto[]>([]);

  galerias = signal([
    {value: 1, name: "El Virrey"}
  ])

  loading = signal<boolean>(false);
  error = signal<boolean>(false);
  success = signal<boolean>(false);

  createGaleriaForm = new FormGroup({
    distrito: new FormControl(null),
    mercado: new FormControl(null),
    direccion: new FormControl(""),
    nombre: new FormControl(""),
    descripcion: new FormControl("", [Validators.required, Validators.maxLength(500)])
  });

  async onSubmit() {
    this.loading.set(true);
    this.error.set(false);
    this.success.set(false);
    const createGaleriaDto : CreateGaleriaDto = {
      idDistrito : this.createGaleriaForm.value.distrito!,
      idMercado : this.createGaleriaForm.value.mercado!,
      nombre : this.createGaleriaForm.value.nombre!,
      descripcion : this.createGaleriaForm.value.descripcion!,
      direccion : this.createGaleriaForm.value.direccion!,
      images: await this.listComponent.getFilesAsBase64()
    };
    this.galeriaService.createGaleria(createGaleriaDto).subscribe({
      next: (response) =>{
        this.loading.set(false);
        setTimeout(() => {
          this.success.set(false);
        }, 4000);
        this.success.set(true);
        this.createGaleriaForm.reset();
      },
      error : (err) =>{
        this.error.set(true);
        this.loading.set(false);
      }
    });
  }

  ngOnInit(): void {
    this.loadDistritos();
    this.loadMercados();
  }

  loadDistritos() {
    this.distritosService.getDistritos().subscribe({
      next: (distritos) => {
        this.distritos.set(distritos);
      },
      error: (err) => {
        console.error('Error al cargar los distritos', err);
      }
    });
  }

  loadMercados() {
    this.mercadosService.getMercados().subscribe({
      next: (mercados) => {
        this.mercados.set(mercados);
      },
      error: (err) => {
        console.error('Error al cargar los mercados', err);
      }
    });
  }
}
