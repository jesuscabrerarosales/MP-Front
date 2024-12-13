import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PendientesService {

  constructor() { }

  getPuestos() {
    return [
      {}, {}, {}
    ]
  }

  getGalerias() {
    return [
      {}, {}
    ]
  }

  getMercados() {
    return [
      {}, {}, {}, {}, {}, {}, {}, {}, {}
    ]
  }
}
