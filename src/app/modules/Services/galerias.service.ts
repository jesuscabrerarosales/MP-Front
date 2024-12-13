import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateGaleriaDto } from '../Types/galeria/CreateGaleriaDto.model';
import { API_ENDPOINTS } from '../app-endpoints';
import { GaleriaDto } from '../Types/galeria/galeriaDto.model';
import { Observable } from 'rxjs';
import { GaleriaSelectView } from '../Types/galeria/GaleriaSelectViewDto.model';
import { GaleriaSVSelectView } from '../Types/galeria/GaleriaSVSearchDto.model';

@Injectable({
  providedIn: 'root'
})
export class GaleriasService {

  constructor(private http: HttpClient) { }

  createGaleria(galeria: CreateGaleriaDto){
    return this.http.post<HttpResponse<null>>(API_ENDPOINTS.GALERIAS.POST, galeria);
  }
  getGalerias(): Observable<GaleriaDto[]> {
    return this.http.get<GaleriaDto[]>(API_ENDPOINTS.GALERIAS.GET);
  }
  getGaleriasAdminPanelInfo(id : number): Observable<GaleriaDto> {
    return this.http.get<GaleriaDto>(`${API_ENDPOINTS.GALERIAS.GET_AP_INFO}/${id}`);
  }
  updateGaleria(id: number, galeria: GaleriaDto): Observable<HttpResponse<void>> {
    return this.http.put<HttpResponse<void>>(`${API_ENDPOINTS.GALERIAS.PUT}/${id}`, galeria);
  }
  getGaleriasName(mercadoId:number): Observable<GaleriaSelectView[]> {
    return this.http.get<GaleriaSelectView[]>(`${API_ENDPOINTS.GALERIAS.GET_NAME}/${mercadoId}`);
  }
  getGaleriasSearchByName(nombreGaleria: string): Observable<GaleriaSVSelectView[]> {
    const params = { nombreGaleria };
    return this.http.get<GaleriaSVSelectView[]>(API_ENDPOINTS.GALERIAS.GET_SEARCH_BY_NAME, { params });
  }
}
