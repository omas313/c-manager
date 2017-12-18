import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customDate'
})
export class CustomDatePipe implements PipeTransform {

  transform(value: number, time: boolean): any {
    const date = new Date(value);

    return time ? date.toLocaleString() : date.toLocaleDateString();
  }

}
