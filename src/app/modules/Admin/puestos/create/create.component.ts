import { CreatePuestoDto } from './../../../Types/puesto/CreatePuestoDto.model';
import { PuestosService } from './../../../Services/puestos.service';
import { Component, signal, inject, ViewChild } from '@angular/core';
import { CreateFormLayoutComponent } from '../../../Shared/layouts/createform-layout/createform-layout.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule} from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StyledBtnComponent } from '../../../Shared/components/styled-btn/styled-btn.component';
import { LoaderComponent } from '../../../Shared/components/loader/loader.component';
import { UploadFilesComponent } from '../../../Shared/components/upload-files/upload-files.component';
import { DistritoDto } from '../../../Types/distrito/distritoDto.model';
import { DistritosService } from '../../../Services/distrito.service';
import { MercadosService } from '../../../Services/mercados.service';
import { MercadoDto } from '../../../Types/mercado/mercadoDto.model';
import { GaleriasService } from '../../../Services/galerias.service';
import { GaleriaDto } from '../../../Types/galeria/galeriaDto.model';


@Component({
  selector: 'app-create',
  standalone: true,
  imports: [UploadFilesComponent, CreateFormLayoutComponent, FormsModule, MatFormFieldModule,
    MatInputModule, MatIconModule, MatSelectModule, ReactiveFormsModule, StyledBtnComponent, LoaderComponent],
  templateUrl: './create.component.html',
  styleUrl: './create.component.css'
})
export class AdminCreatePuestoComponent {
  @ViewChild(UploadFilesComponent) listComponent!: UploadFilesComponent;
  puestoService = inject(PuestosService);
  distritosService = inject(DistritosService);
  mercadosService = inject(MercadosService);
  galeriasService = inject(GaleriasService);

  distritos = signal<DistritoDto[]>([]);
  mercados = signal<MercadoDto[]>([]);
  galerias = signal<GaleriaDto[]>([]);

  loading = signal<boolean>(false);
  error = signal<boolean>(false);
  success = signal<boolean>(false);

  createPuestoForm = new FormGroup({
    distrito: new FormControl(null),
    mercado: new FormControl(null),
    galeria: new FormControl(null),
    ubicacion: new FormControl(""),
    nombre: new FormControl(""),
    dueno: new FormControl(""),
    productos: new FormControl(""),
    actividad: new FormControl("")
  })



  async onSubmit() {
    this.loading.set(true);
    this.error.set(false);
    this.success.set(false);
    const createPuestoDto : CreatePuestoDto = {
      idDistrito : this.createPuestoForm.value.distrito!,
      idMercado : this.createPuestoForm.value.mercado!,
      idGaleria : this.createPuestoForm.value.galeria!,
      nombre : this.createPuestoForm.value.nombre!,
      nombreDueno : this.createPuestoForm.value.dueno!,
      descripcionProductos : this.createPuestoForm.value.productos!,
      ubicacionExacta : this.createPuestoForm.value.ubicacion!,
      descripcionActividad : this.createPuestoForm.value.actividad!,
      images: await this.listComponent.getFilesAsBase64()
    };
    this.puestoService.createPuesto(createPuestoDto).subscribe({
      next: (response) =>{
        this.loading.set(false);
        setTimeout(() => {
          this.success.set(false);
        }, 4000);
        this.success.set(true);
        this.createPuestoForm.reset();
      },
      error : (err) =>{
        console.error('Error: ', err);
        this.error.set(true);
        this.loading.set(false);
      }
    });
  }

  ngOnInit(): void {
    this.loadDistritos();
    this.loadMercados();
    this.loadGalerias();
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

  loadGalerias() {
    this.galeriasService.getGalerias().subscribe({
      next: (galerias) => {
        this.galerias.set(galerias);
      },
      error: (err) => {
        console.error('Error al cargar las galerias', err);
      }
    });
  }
}
