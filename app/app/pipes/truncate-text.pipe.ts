import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncateText'
})
export class TruncateTextPipe implements PipeTransform {

  transform(value: any, maxLength?: any): any {
    return value.length > maxLength ? value.substr(0, maxLength - 1) + '...' : value;
  }

}
