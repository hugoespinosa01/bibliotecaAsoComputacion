import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterByCategoria',
})
export class FilerByCategoriaPipe implements PipeTransform {
  transform(value: any, arg: any): any {
    if (arg === '') return value;
    const resultadoLibros = [];
    for (const libro of value) {
      if (libro.categoria.indexOf(arg) > -1) {
        resultadoLibros.push(libro);
      }
    }
    return resultadoLibros;
  }
};
