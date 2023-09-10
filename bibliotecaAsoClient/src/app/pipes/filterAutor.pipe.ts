import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterByAutor',
})
export class FilterByAutorPipe implements PipeTransform {
  transform(value: any, arg: any): any {
    if (arg === '') return value;
    const resultadoLibros = [];
    for (const libro of value) {
      if (libro.autor.toLowerCase().indexOf(arg.toLowerCase()) > -1) {
        resultadoLibros.push(libro);
      }
    }
    return resultadoLibros;
  }
};
