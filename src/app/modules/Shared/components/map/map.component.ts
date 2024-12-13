import { CommonModule } from '@angular/common';
import { Component, Input, OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';

declare const google: any;

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})

export class MapComponent implements OnInit {
  @Input() direccion?: string = '';
  map: any;

  ngOnInit(): void {
    if (this.direccion) {
      this.loadMap();
    }
  }

  loadMap() {
    const geocoder = new google.maps.Geocoder();

    // Geocodificación para obtener latitud y longitud
    geocoder.geocode({ address: this.direccion }, (results: any, status: string) => {
      if (status === 'OK' && results[0]) {
        const location = results[0].geometry.location;

        // Configuración del mapa
        this.map = new google.maps.Map(document.getElementById('map') as HTMLElement, {
          center: { lat: location.lat(), lng: location.lng() },
          zoom: 15,
        });

        // Añadir marcador en la ubicación
        new google.maps.Marker({
          position: { lat: location.lat(), lng: location.lng() },
          map: this.map,
        });
      } else {
        console.error('No se pudo geocodificar la dirección:', status);
      }
    });
  }
}
