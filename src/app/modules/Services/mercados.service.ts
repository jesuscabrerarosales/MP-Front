import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateMercadoDto } from '../Types/mercado/CreateMercadoDto.model';
import { API_ENDPOINTS } from '../app-endpoints';
import { MercadoDto } from '../Types/mercado/mercadoDto.model';
import { Observable } from 'rxjs';
import { MercadoSelectView } from '../Types/mercado/MercadoSelectViewDto.model';
import { MercadoCardDto } from '../Types/mercado/MercadoCardDto.model';
import { MercadoInfoDto } from '../Types/mercado/MercadoInfoDto.model';

@Injectable({
  providedIn: 'root'
})
export class MercadosService {

  constructor(private http: HttpClient) { }

  getMercadosById(distritoId: number): Observable<MercadoDto[]> {
    return this.http.get<MercadoDto[]>(`${API_ENDPOINTS.MERCADOS.GET_BY_ID}/${distritoId}`);
  }
  createMercado(mercado: CreateMercadoDto){
    return this.http.post<HttpResponse<null>>(API_ENDPOINTS.MERCADOS.POST, mercado);
  }
  getMercados(): Observable<MercadoDto[]> {
    return this.http.get<MercadoDto[]>(API_ENDPOINTS.MERCADOS.GET);
  }
  getMercadosAdminPanelInfo(id: number): Observable<MercadoDto> {
    return this.http.get<MercadoDto>(`${API_ENDPOINTS.MERCADOS.GET_AP_INFO}/${id}`);
  }
  updateMercado(id: number, mercado: MercadoDto): Observable<HttpResponse<void>> {
    return this.http.put<HttpResponse<void>>(`${API_ENDPOINTS.MERCADOS.PUT}/${id}`, mercado);
  }
  getMercadosName(): Observable<MercadoSelectView[]> {
    return this.http.get<MercadoSelectView[]>(API_ENDPOINTS.MERCADOS.GET_NAME);
  }
  getUltimosMercados(): Observable<MercadoCardDto[]> {
    return this.http.get<MercadoCardDto[]>(API_ENDPOINTS.MERCADOS.GET_LAST_MERCADOS);
  }
  getMercadosByDistritoId(idDistrito: number): Observable<MercadoCardDto[]> {
    return this.http.get<MercadoCardDto[]>(`${API_ENDPOINTS.MERCADOS.GET_BY_DISTRITO}/${idDistrito}`);
  }
  getMercadosSearch(name: string): Observable<MercadoDto[]> {
    const params = { name };
    return this.http.get<MercadoDto[]>(API_ENDPOINTS.MERCADOS.GET_SEARCH, { params });
  }
  getMercadosSearchByName(nombre: string): Observable<MercadoCardDto[]> {
    const params = { nombre };
    return this.http.get<MercadoCardDto[]>(API_ENDPOINTS.MERCADOS.GET_BY_NAME, { params });
  }
  getMercadoInfoById(id: number): Observable<MercadoInfoDto> {
    return this.http.get<MercadoInfoDto>(`${API_ENDPOINTS.MERCADOS.GET_MERCADO_INFO}/${id}`);
  }
}
