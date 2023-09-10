import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

 transform(value: any, arg: any) : any{
  if(arg === '') return value; 
  const resultadoLibros = [];
   for(const libro of value){
    if(libro.titulo.toLowerCase().indexOf(arg.toLowerCase()) > -1){
      resultadoLibros.push(libro);
    }
   };
   return resultadoLibros;
 }

}
