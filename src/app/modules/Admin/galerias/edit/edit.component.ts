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
import { ActivatedRoute } from '@angular/router';
import { GaleriaDto } from '../../../Types/galeria/galeriaDto.model';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [UploadFilesComponent, CreateFormLayoutComponent, StyledBtnComponent, LoaderComponent, MatSelectModule, ReactiveFormsModule, MatInputModule],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css'
})
export class AdminEditGaleriaComponent {
  @ViewChild(UploadFilesComponent) listComponent!: UploadFilesComponent;
  galeriaService = inject(GaleriasService)
  distritosService = inject(DistritosService);
  mercadosService = inject(MercadosService);
  route = inject(ActivatedRoute);

  distritos = signal<DistritoDto[]>([]);
  mercados = signal<MercadoDto[]>([]);

  galerias = signal([
    {value: 1, name: "El Virrey"}
  ])

  loading = signal<boolean>(false);
  error = signal<boolean>(false);
  success = signal<boolean>(false);

  imageUrls: string[] = [];
  imageFiles: File[] = [];
  galeriaId: number | null = null;

  createGaleriaForm = new FormGroup({
    distrito: new FormControl<number | null>(null),
    mercado: new FormControl<number | null>(null),
    direccion: new FormControl(""),
    nombre: new FormControl(""),
    descripcion: new FormControl("", [Validators.required, Validators.maxLength(500)])
  });

  async onSubmit() {
    const imagesToSend: string[] = await this.listComponent.getFilesAsBase64();
    const finalImages = [...imagesToSend, ...this.imageUrls];

    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.galeriaId = id;
    if (this.galeriaId === null) return;

    this.loading.set(true);
    this.error.set(false);
    this.success.set(false);

    const updateGaleriaDto: GaleriaDto = {
      id: this.galeriaId,
      idMercado : this.createGaleriaForm.value.mercado!,
      nombre : this.createGaleriaForm.value.nombre!,
      idDistrito : this.createGaleriaForm.value.distrito!,
      direccion : this.createGaleriaForm.value.direccion!,
      descripcion : this.createGaleriaForm.value.descripcion!,
      images : finalImages
    };
    this.galeriaService.updateGaleria(this.galeriaId,updateGaleriaDto).subscribe({
      next: () => {
        this.loading.set(false);
        this.success.set(true);
        setTimeout(() => this.success.set(false), 4000);
      },
      error: (err) => {
        console.error('Error al actualizar el mercado: ', err);
        this.error.set(true);
        this.loading.set(false);
      }
    });
  }

  ngOnInit(): void {
    this.loadDistritos();
    this.loadMercados();
    this.loadGaleria();
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

  loadGaleria(){
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if(id){
      console.log(id)
      this.galeriaService.getGaleriasAdminPanelInfo(id).subscribe({
        next: (galeria : GaleriaDto) =>{
          this.createGaleriaForm.patchValue({
            mercado : galeria.idMercado,
            distrito : galeria.idDistrito,
            nombre : galeria.nombre,
            direccion : galeria.direccion,
            descripcion : galeria.descripcion
          });
          console.log(galeria.images);
          if(galeria && Array.isArray(galeria.images)){
            this.imageUrls = galeria.images;
            console.log('Imagenes asignadas:', this.imageUrls);
          } else {
            console.log('No se encontraron imágenes en el mercado:', galeria);
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
