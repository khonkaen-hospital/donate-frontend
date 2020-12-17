import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'donateObjective'
})
export class DonateObjectivePipe implements PipeTransform {


  transform(value: string) {
    if (value) {
      return value;
    } else {
      return 'ไม่มีวัตถุประสงค์';
    }
  }

}
