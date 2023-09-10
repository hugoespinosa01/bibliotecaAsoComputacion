import { Component, OnInit, HostBinding } from '@angular/core';
import { LibroService } from '../shared/libro.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-consulta-libros',
  templateUrl: './consulta-libros.component.html',
  styleUrls: ['./consulta-libros.component.css']
})
export class ConsultaLibrosComponent implements OnInit{
  @HostBinding('class') classes = 'row';
  libro: any = {
    id: 0,
    titulo: '',
    autor: '',
    categoria: '',
    descripcion: '',
    num_paginas: 0,
    archivo: '',
    fecha_creacion: ''
  };
  pdfSrc: any = '';


  constructor(private libroService: LibroService, private activatedRoute: ActivatedRoute) { 

  }

  descargarLibro(){
    window.open(this.pdfSrc);
  }


  ngOnInit(): void {
    const params = this.activatedRoute.snapshot.params;
    this.libroService.getLibro(params['id']).subscribe(
      res => {
        this.libro = res;
        this.libroService.getFile(this.libro.archivo).subscribe(
          res => this.pdfSrc = URL.createObjectURL(res),
          err => console.log(err)
        )
      },
      err => console.log(err)      
    )
  };

}
