import { Component, Input, signal } from '@angular/core';
import { MercadoCardDto } from '../../../Types/mercado/MercadoCardDto.model';
import { RouterLinkWithHref } from '@angular/router';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'mercado-card',
  standalone: true,
  imports: [RouterLinkWithHref],
  templateUrl: './mercado-card.component.html',
  styleUrl: './mercado-card.component.css'
})
export class MercadoCardComponent {
  @Input({required: true}) mercado!: MercadoCardDto;
  @Input() redirectToPage: Boolean = true;

  constructor(private sanitizer: DomSanitizer) {}

  sanitizedImageUrl = signal <SafeUrl>("https://via.placeholder.com/400x500");



  ngOnInit(): void {
    const sanitizedUrl = this.sanitizer.bypassSecurityTrustUrl(this.mercado.imageUrl);
    this.sanitizedImageUrl.set(sanitizedUrl);
  }
}
