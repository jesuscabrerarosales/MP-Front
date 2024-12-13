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
import { ActivatedRoute } from '@angular/router';
import { PuestoAPInfo } from '../../../Types/puesto/PuestoAPInfo.model';


@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [UploadFilesComponent, CreateFormLayoutComponent, FormsModule, MatFormFieldModule,
    MatInputModule, MatIconModule, MatSelectModule, ReactiveFormsModule, StyledBtnComponent, LoaderComponent],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css'
})
export class AdminEditPuestoComponent {
  @ViewChild(UploadFilesComponent) listComponent!: UploadFilesComponent;
  puestoService = inject(PuestosService);
  distritosService = inject(DistritosService);
  mercadosService = inject(MercadosService);
  galeriasService = inject(GaleriasService);
  route = inject(ActivatedRoute);

  distritos = signal<DistritoDto[]>([]);
  mercados = signal<MercadoDto[]>([]);
  galerias = signal<GaleriaDto[]>([]);

  loading = signal<boolean>(false);
  error = signal<boolean>(false);
  success = signal<boolean>(false);

  imageUrls: string[] = [];
  imageFiles: File[] = [];
  puestoId: number | null = null;

  createPuestoForm = new FormGroup({
    distrito: new FormControl<number | null>(null),
    mercado: new FormControl<number | null>(null),
    galeria: new FormControl<number | null>(null),
    ubicacion: new FormControl(""),
    nombre: new FormControl(""),
    dueno: new FormControl(""),
    productos: new FormControl(""),
    actividad: new FormControl(""),
    descripcion: new FormControl("")
  })



  async onSubmit() {
    const imagesToSend: string[] = await this.listComponent.getFilesAsBase64();
    const finalImages = [...imagesToSend, ...this.imageUrls];

    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.puestoId = id;
    if (this.puestoId === null) return;

    this.loading.set(true);
    this.error.set(false);
    this.success.set(false);

    const updatePuestoDto: PuestoAPInfo = {
      id: this.puestoId,
      idGaleria : this.createPuestoForm.value.galeria!,
      idDistrito : this.createPuestoForm.value.distrito!,
      idMercado : this.createPuestoForm.value.mercado!,
      nombre : this.createPuestoForm.value.nombre!,
      ubicacionExacta : this.createPuestoForm.value.ubicacion!,
      descripcionProductos : this.createPuestoForm.value.productos!,
      nombreDueno : this.createPuestoForm.value.dueno!,
      descripcionActividad : this.createPuestoForm.value.actividad!,
      descripcion : this.createPuestoForm.value.descripcion!,
      images : finalImages
    };
    this.puestoService.updatePuesto(this.puestoId,updatePuestoDto).subscribe({
      next: () => {
        this.loading.set(false);
        this.success.set(true);
        setTimeout(() => this.success.set(false), 4000);
      },
      error: (err) => {
        console.error('Error al actualizar el puesto: ', err);
        this.error.set(true);
        this.loading.set(false);
      }
    });
  }

  ngOnInit(): void {
    this.loadDistritos();
    this.loadMercados();
    this.loadGalerias();
    this.loadPuesto();
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

  loadPuesto(){
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if(id){
      console.log(id);
      this.puestoService.getPuestosAdminPanelInfo(id).subscribe({
        next: (puesto : PuestoAPInfo) => {
          this.createPuestoForm.patchValue({
            distrito : puesto.idDistrito,
            mercado : puesto.idMercado,
            galeria : puesto.idGaleria,
            ubicacion : puesto.ubicacionExacta,
            nombre : puesto.nombre,
            dueno : puesto.nombreDueno,
            productos : puesto.descripcionProductos,
            actividad : puesto.descripcionActividad
          });
          console.log('puesto data:', puesto);
          if (puesto && Array.isArray(puesto.images)) {
            this.imageUrls = puesto.images;
            console.log('Imagenes asignadas:', this.imageUrls);
          } else {
            console.log('No se encontraron imágenes en el mercado:', puesto);
          }
        },
        error: (err) => {
          console.error('Error al cargar el mercado:', err);
        }
      });
    }
  }
  updateImageUrls(updatedImageUrls: string[]) {
    this.imageUrls = updatedImageUrls;
  }
  updateFilesAndUrls(data: { files: File[], urls: string[] }) {
    this.imageFiles = data.files;
    this.imageUrls = data.urls;
  }
}
