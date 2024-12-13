export interface MercadoInfoDto {
  id: number;
  nombre: string;
  descripcion: string;
  direccion: string;
  referencia: string;
  distritoName: string;
  mercadoImageUrls: string | string[];
  galeriasRelacionadas?: string;
  galeriasProcesadas?: { id: number, nombre: string, categoria: string, imagen: string }[];
}

