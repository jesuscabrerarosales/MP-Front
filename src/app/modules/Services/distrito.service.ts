import { DistritoSelectView } from './../Types/distrito/DistritoSelectViewDto.model';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { API_ENDPOINTS } from '../app-endpoints';
import { DistritoDto } from '../Types/distrito/distritoDto.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DistritosService {

  distritos = signal<DistritoDto[]>([])
  distritosSelect = signal<DistritoSelectView[]>([])

  constructor(private http: HttpClient) {
    this.loadDistritos();
  }

  loadDistritos() {
    this.distritosSelect.set([
      {
          id: 150101,
          nombre: "LIMA"
      },
      {
          id: 150102,
          nombre: "ANCON"
      },
      {
          id: 150103,
          nombre: "ATE"
      },
      {
          id: 150104,
          nombre: "BARRANCO"
      },
      {
          id: 150105,
          nombre: "BREÑA"
      },
      {
          id: 150106,
          nombre: "CARABAYLLO"
      },
      {
          id: 150107,
          nombre: "CHACLACAYO"
      },
      {
          id: 150108,
          nombre: "CHORRILLOS"
      },
      {
          id: 150109,
          nombre: "CIENEGUILLA"
      },
      {
          id: 150110,
          nombre: "COMAS"
      },
      {
          id: 150111,
          nombre: "EL AGUSTINO"
      },
      {
          id: 150112,
          nombre: "INDEPENDENCIA"
      },
      {
          id: 150113,
          nombre: "JESUS MARIA"
      },
      {
          id: 150114,
          nombre: "LA MOLINA"
      },
      {
          id: 150115,
          nombre: "LA VICTORIA"
      },
      {
          id: 150116,
          nombre: "LINCE"
      },
      {
          id: 150117,
          nombre: "LOS OLIVOS"
      },
      {
          id: 150118,
          nombre: "LURIGANCHO"
      },
      {
          id: 150119,
          nombre: "LURIN"
      },
      {
          id: 150120,
          nombre: "MAGDALENA DEL MAR"
      },
      {
          id: 150121,
          nombre: "PUEBLO LIBRE"
      },
      {
          id: 150122,
          nombre: "MIRAFLORES"
      },
      {
          id: 150123,
          nombre: "PACHACAMAC"
      },
      {
          id: 150124,
          nombre: "PUCUSANA"
      },
      {
          id: 150125,
          nombre: "PUENTE PIEDRA"
      },
      {
          id: 150126,
          nombre: "PUNTA HERMOSA"
      },
      {
          id: 150127,
          nombre: "PUNTA NEGRA"
      },
      {
          id: 150128,
          nombre: "RIMAC"
      },
      {
          id: 150129,
          nombre: "SAN BARTOLO"
      },
      {
          id: 150130,
          nombre: "SAN BORJA"
      },
      {
          id: 150131,
          nombre: "SAN ISIDRO"
      },
      {
          id: 150132,
          nombre: "SAN JUAN DE LURIGANCHO"
      },
      {
          id: 150133,
          nombre: "SAN JUAN DE MIRAFLORES"
      },
      {
          id: 150134,
          nombre: "SAN LUIS"
      },
      {
          id: 150135,
          nombre: "SAN MARTIN DE PORRES"
      },
      {
          id: 150136,
          nombre: "SAN MIGUEL"
      },
      {
          id: 150137,
          nombre: "SANTA ANITA"
      },
      {
          id: 150138,
          nombre: "SANTA MARIA DEL MAR"
      },
      {
          id: 150139,
          nombre: "SANTA ROSA"
      },
      {
          id: 150140,
          nombre: "SANTIAGO DE SURCO"
      },
      {
          id: 150141,
          nombre: "SURQUILLO"
      },
      {
          id: 150142,
          nombre: "VILLA EL SALVADOR"
      },
      {
          id: 150143,
          nombre: "VILLA MARIA DEL TRIUNFO"
        }
      ])
    this.http.get<DistritoDto[]>(API_ENDPOINTS.DISTRITO.GET).subscribe({
      next: (distritos: DistritoDto[]) => {
        this.distritos.set(distritos);
        this.distritosSelect.set(distritos.map(distrito => ({
          id: distrito.id,
          nombre: distrito.nombre
        })));
      },
      error: (err) => {
        console.error('Error al cargar los distritos, usando caché');
      }
    })
  }

  getDistritos(): Observable<DistritoDto[]> {
    return this.http.get<DistritoDto[]>(API_ENDPOINTS.DISTRITO.GET);
  }
  getDistritosName(): DistritoSelectView[] {
    return this.distritos().map(distrito =>({
      id: distrito.id,
      nombre: distrito.nombre
    }))
  }
}
