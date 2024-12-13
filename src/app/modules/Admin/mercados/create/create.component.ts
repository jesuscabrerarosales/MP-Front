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

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [CreateFormLayoutComponent, StyledBtnComponent, LoaderComponent, UploadFilesComponent,
     MatSelectModule, ReactiveFormsModule, MatInputModule],
  templateUrl: './create.component.html',
  styleUrl: './create.component.css'
})

export class AdminCreateMercadoComponent {
  @ViewChild(UploadFilesComponent) listComponent!: UploadFilesComponent;
  mercadoService = inject(MercadosService)
  distritosService = inject(DistritosService);

  distritos = signal<DistritoDto[]>([]);
  // distritos = signal([
  //   {value: 1, name: "Jesus María"}
  // ]);
  loading = signal<boolean>(false);
  error = signal<boolean>(false);
  success = signal<boolean>(false);

  createMercadoForm = new FormGroup({
    distrito: new FormControl(null),
    direccion: new FormControl(""),
    referencia: new FormControl(""),
    nombre: new FormControl(""),
    descripcion: new FormControl("", [Validators.required, Validators.maxLength(500)])
  })

  async onSubmit() {
    this.loading.set(true);
    this.error.set(false);
    this.success.set(false);
    const createMercadoDto : CreateMercadoDto = {
        descripcion: this.createMercadoForm.value.descripcion!,
        direccion: this.createMercadoForm.value.direccion!,
        idDistrito: this.createMercadoForm.value.distrito!,
        nombre: this.createMercadoForm.value.nombre!,
        referencia: this.createMercadoForm.value.referencia!,
        images: await this.listComponent.getFilesAsBase64()
    }
    this.mercadoService.createMercado(createMercadoDto).subscribe({
      next: (response) =>{
        this.loading.set(false);
        setTimeout(() => {
          this.success.set(false);
        }, 4000);
        this.success.set(true);
        this.createMercadoForm.reset();
      },
      error : (err) =>{
        console.error('Error: ', err);
        this.error.set(true);
        this.loading.set(false);
      }
    })
  }

  ngOnInit(): void {
    this.loadDistritos();
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
}
