export class Libro {
  constructor(
    public id: number,
    public titulo: string,
    public descripcion: string,
    public categoria: string,
    public autor: string,
    public num_paginas: number,
    public archivo: '',
    public fecha_creacion: any,
    ) {}
}
