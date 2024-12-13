import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'lowerCapitalize',
  standalone: true
})
export class LowerCapitalizePipe implements PipeTransform {
  transform(value: string): string {
    return value[0].toUpperCase() + value.slice(1).toLowerCase();
  }
}
