import { CreatePuestoDto } from './../Types/puesto/CreatePuestoDto.model';
import { Injectable } from '@angular/core';
import { API_ENDPOINTS } from './../app-endpoints';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PuestoDto } from '../Types/puesto/puestoDto.model';
import { PuestoInfoDto } from '../Types/puesto/PuestoInfoDto.model';
import { PuestoAPInfo } from '../Types/puesto/PuestoAPInfo.model';

@Injectable({
  providedIn: 'root'
})
export class PuestosService {

  constructor(private http: HttpClient) {}

  getPuestos(): Observable<PuestoDto[]> {
    return this.http.get<PuestoDto[]>(API_ENDPOINTS.PUESTOS.GET);
  }
  getPuestosAdminPanelInfo(id : number):Observable<PuestoAPInfo>{
    return this.http.get<PuestoAPInfo>(`${API_ENDPOINTS.PUESTOS.GET_AP_INFO}/${id}`);
  }
  updatePuesto(id: number, puesto: PuestoAPInfo): Observable<HttpResponse<void>> {
    return this.http.put<HttpResponse<void>>(`${API_ENDPOINTS.PUESTOS.PUT}/${id}`, puesto);
  }
  createPuesto(puesto:CreatePuestoDto){
    return this.http.post<HttpResponse<null>>(API_ENDPOINTS.PUESTOS.POST, puesto);
  }
  getPuestoInfoById(id: number): Observable<PuestoInfoDto> {
    const url = `${API_ENDPOINTS.PUESTOS.GET_PUESTO_INFO}/${id}`;
    return this.http.get<PuestoInfoDto>(url);
  }
  findPuestosByMercadoAndSearch(mercadoId: number, searchTerm: string): Observable<PuestoDto[]> {
    const url = `${API_ENDPOINTS.PUESTOS.GET_SEARCH_SERVICE_PRODUCT}?mercadoId=${mercadoId}&searchTerm=${searchTerm}`;
    return this.http.get<PuestoDto[]>(url);
  }
  getUltimosPuestosPorMercado(mercadoId: number): Observable<PuestoDto[]> {
    const url = `${API_ENDPOINTS.PUESTOS.GET_LAST_PUESTOS_BY_MERCADO}/${mercadoId}`;
    return this.http.get<PuestoDto[]>(url);
  }
  getUltimosPuestos(): Observable<PuestoDto[]> {
    return this.http.get<PuestoDto[]>(API_ENDPOINTS.PUESTOS.GET_LAST_PUESTOS);
  }
  getPuestosByNombreSimilutd(nombrePuesto: string): Observable<PuestoDto[]> {
    const url = `${API_ENDPOINTS.PUESTOS.GET_PUESTO_BY_NAME_SIMILITUD}?nombrePuesto=${nombrePuesto}`;
    return this.http.get<PuestoDto[]>(url);
}
}
