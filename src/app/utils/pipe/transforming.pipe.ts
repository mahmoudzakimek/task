import { Pipe, PipeTransform } from '@angular/core';
import { TitleCasePipe as AngularTitleCasePipe } from '@angular/common';

@Pipe({
  name: 'appTitleCase'
})
export class TitleCasePipe implements PipeTransform {
  angularTitleCase = new AngularTitleCasePipe();
  transform(value: any, ...args: any[]): any {
    const property = args[0];
    const isValidProperty = property && typeof property === 'string';
    if (typeof value === 'string') {
      // if the value we have to transform is a simple string
      return this.angularTitleCase.transform(value);
    } else if (Array.isArray(value)) {
      // if the value we have to transform is an array
      return value.map((item) => {
        // if the current item in the array is a simple string, we transform it
        if (typeof item === 'string') {
          return this.angularTitleCase.transform(item);
        } else if (isValidProperty && item[property]) {
          // if the item in the array is an object and we have the property in the object, we transform item
          item[property] = this.angularTitleCase.transform(item[property]);
        }
        return item;
      });
    }
    return value;
  }
}