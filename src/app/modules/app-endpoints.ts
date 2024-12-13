var apiUrl = "http://localhost:4000";
export const AUTH_URL = apiUrl + '/auth';
export const API_ENDPOINTS = {
  PUESTOS:{
    GET :  apiUrl + '/api/puestos',
    GET_AP_INFO :  apiUrl + '/api/puestos/ap-info',
    PUT: apiUrl + '/api/puestos',
    GET_PUESTO_INFO :  apiUrl + '/api/puestos/puesto-info',
    GET_SEARCH_SERVICE_PRODUCT :  apiUrl + '/api/puestos/buscar-servicio-producto',
    GET_PUESTO_BY_NAME_SIMILITUD :  apiUrl + '/api/puestos/buscar-nombre-similitud',
    GET_LAST_PUESTOS :  apiUrl + '/api/puestos/ultimos-puestos',
    GET_LAST_PUESTOS_BY_MERCADO :  apiUrl + '/api/puestos/ultimos-puestos-por-mercado',
    POST :  apiUrl + '/api/puestos',
  },
  GALERIAS:{
    GET :  apiUrl + '/api/galerias',
    GET_AP_INFO :  apiUrl + '/api/galerias/ap-info',
    PUT: apiUrl + '/api/galerias',
    GET_NAME :  apiUrl + '/api/galerias/GaleriaSelectView',
    GET_SEARCH_BY_NAME :  apiUrl + '/api/galerias/galeria-search-selectView',
    POST :  apiUrl + '/api/galerias',
  },
  MERCADOS:{
    GET :  apiUrl + '/api/mercados',
    GET_AP_INFO :  apiUrl + '/api/mercados/ap-info',
    PUT: apiUrl + '/api/mercados',
    GET_BY_ID :  apiUrl + '/api/mercados/distrito',
    GET_BY_NAME :  apiUrl + '/api/mercados/buscar-by-nombre',
    GET_NAME :  apiUrl + '/api/mercados/id-nombre',
    GET_MERCADO_INFO :  apiUrl + '/api/mercados/info',
    GET_BY_DISTRITO :  apiUrl + '/api/mercados/by-distrito',
    GET_LAST_MERCADOS :  apiUrl + '/api/mercados/ultimos',
    GET_SEARCH :  apiUrl + '/api/mercados/search',
    POST :  apiUrl + '/api/mercados',
  },
  DISTRITO:{
    GET :  apiUrl + '/api/distritos',
    GET_NAME :  apiUrl + '/api/distritos/id-nombre',
    POST :  apiUrl + '/api/distritos',
  }
};
