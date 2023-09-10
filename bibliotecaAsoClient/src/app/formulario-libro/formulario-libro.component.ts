import { Component, OnInit, HostBinding } from '@angular/core';
import { LibroService } from '../shared/libro.service';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-formulario-libro',
  templateUrl: './formulario-libro.component.html',
  styleUrls: ['./formulario-libro.component.css'],
})
export class FormularioLibroComponent implements OnInit {
  @HostBinding('class') classes = 'row';
  file: any;
  catalogos: any = [];
  date : moment.Moment = moment();
  libro: any = {
    id: 0,
    titulo: '',
    autor: '',
    categoria: '',
    descripcion: '',
    num_paginas: 0,
    archivo: '',
    fecha_creacion: this.date.format(),
  };
  edit: boolean = false;

  constructor(
    private libroService: LibroService,
    private toastr: ToastrService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.libroService.getCatalogo('CATEGORIA').subscribe((res) => {
      this.catalogos = res;
    });
  }
  ngOnInit(): void {
    const params = this.activatedRoute.snapshot.params;
    if (params['id']) {
      this.edit = true;
      this.libroService.getLibro(params['id']).subscribe(
        (res) => {
          this.libro = res;
          this.libroService.getFile(this.libro.archivo).subscribe(
            res => this.file = res,
            err => console.log(err)
          )
        },
        (err) => console.log(err)
      );
    }
  };

  guardarLibro() {
    let formData: FormData = new FormData();
    formData.append('archivo', this.file);
    this.libroService.uploadLibro(formData).subscribe(
      () => {
        this.showSuccessCreate();
        this.router.navigate(['/libros']);
      },
      (err) => console.log(err)
    );

    this.libroService.saveLibro(this.libro).subscribe(
      (res) => console.log(res),
      (err) => console.log(err)
    );
  }

  actualizarLibro() {
    let formData: FormData = new FormData();
    formData.append('archivo', this.file);
    this.libroService.updateFile(formData, this.libro.archivo).subscribe(
      () => {
        this.showSuccessUpdate();
        this.router.navigate(['/libros']);
      },
      (err) => console.log(err)
    );

    this.libro.fecha_creacion = this.date.format();  
    this.libroService.updateLibro(this.libro.id, this.libro).subscribe(
      (res) => console.log(res),
      (err) => console.log(err)
    );
  }

  showSuccessCreate() {
    this.toastr.success('Libro guardado con éxito!', 'Libro guardado');
  }

  showSuccessUpdate() {
    this.toastr.success('Libro actualizado con éxito!', 'Libro actualizado');
  }

  onFileChange(event: any) {
    this.file = event.target.files[0];
  }
}
