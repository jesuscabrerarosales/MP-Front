import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'search-bar',
  standalone: true,
  imports: [MatIconModule, FormsModule, CommonModule],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css'
})
export class SearchBarComponent {
  @Input() placeholder: string = "Buscar Mercados...";
  @Input() maxWidth: string = "600px";
  @Output() onSearch = new EventEmitter<string>();
  @Input() value: string = "";

  onSearchValue() {
    this.onSearch.emit(this.value);
    this.value = "";
  }
}
