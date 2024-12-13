import { Component, inject, signal, ViewChild } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CreateFormLayoutComponent } from '../../../Shared/layouts/createform-layout/createform-layout.component';
import { StyledBtnComponent } from '../../../Shared/components/styled-btn/styled-btn.component';
import { LoaderComponent } from '../../../Shared/components/loader/loader.component';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { CreateMercadoDto } from '../../../Types/mercado/CreateMercadoDto.model';
import { MercadosService } from '../../../Services/mercados.service';
import { UploadFilesComponent } from "../../../Shared/components/upload-files/upload-files.component";
import { CloseBtnComponent } from '../../../Shared/components/close-btn/close-btn.component';
import { DistritosService } from '../../../Services/distrito.service';
import { DistritoDto } from '../../../Types/distrito/distritoDto.model';
import { ActivatedRoute } from '@angular/router';
import { MercadoDto } from '../../../Types/mercado/mercadoDto.model';


@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [CreateFormLayoutComponent, StyledBtnComponent, LoaderComponent, UploadFilesComponent,
    MatSelectModule, ReactiveFormsModule, MatInputModule],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css'
})
export class AdminEditMercadoComponent {
  @ViewChild(UploadFilesComponent) listComponent!: UploadFilesComponent;
  mercadoService = inject(MercadosService)
  distritosService = inject(DistritosService);
  route = inject(ActivatedRoute);

  distritos = signal<DistritoDto[]>([]);
  loading = signal<boolean>(false);
  error = signal<boolean>(false);
  success = signal<boolean>(false);

  imageUrls: string[] = [];
  imageFiles: File[] = [];
  mercadoId: number | null = null;

  createMercadoForm = new FormGroup({
    distrito: new FormControl<number | null>(null),
    direccion: new FormControl(""),
    referencia: new FormControl(""),
    nombre: new FormControl(""),
    descripcion: new FormControl("", [Validators.required, Validators.maxLength(500)])
  })

  async onSubmit() {
    const imagesToSend: string[] = await this.listComponent.getFilesAsBase64();
    const finalImages = [...imagesToSend, ...this.imageUrls];

    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.mercadoId = id;
    if (this.mercadoId === null) return;

    this.loading.set(true);
    this.error.set(false);
    this.success.set(false);

    const updateMercadoDto: MercadoDto = {
      id: this.mercadoId,  // Usamos el ID del mercado actual
      descripcion: this.createMercadoForm.value.descripcion!,
      direccion: this.createMercadoForm.value.direccion!,
      idDistrito: this.createMercadoForm.value.distrito!,
      nombre: this.createMercadoForm.value.nombre!,
      referencia: this.createMercadoForm.value.referencia!,
      images: finalImages
    };

    this.mercadoService.updateMercado(this.mercadoId, updateMercadoDto).subscribe({
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
    this.loadMercado();

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

  loadMercado() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      console.log(id)
      this.mercadoService.getMercadosAdminPanelInfo(id).subscribe({
        next: (mercado: MercadoDto) => {
          this.createMercadoForm.patchValue({
            distrito: mercado.idDistrito,
            direccion: mercado.direccion,
            referencia: mercado.referencia,
            nombre: mercado.nombre,
            descripcion: mercado.descripcion
          });
          if (mercado && Array.isArray(mercado.images)) {
            this.imageUrls = mercado.images;
            console.log('Imagenes asignadas:', this.imageUrls);
          } else {
            console.log('No se encontraron imágenes en el mercado:', mercado);
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
