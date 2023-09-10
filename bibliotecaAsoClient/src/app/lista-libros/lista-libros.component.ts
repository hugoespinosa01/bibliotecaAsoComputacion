import { Component, OnInit } from '@angular/core';
import { LibroService } from '../shared/libro.service';
import { Observable } from 'rxjs';
import TimeAgo from 'javascript-time-ago';
import es from 'javascript-time-ago/locale/es';
import { Router } from '@angular/router';
import fileDownload from 'js-file-download';
import { ToastrService } from 'ngx-toastr';
import { Collection } from 'ngx-pagination';

TimeAgo.addDefaultLocale(es);
const timeAgo = new TimeAgo('es-ES');

@Component({
  selector: 'app-lista-libros',
  templateUrl: './lista-libros.component.html',
  styleUrls: ['./lista-libros.component.css'],
})
export class ListaLibrosComponent implements OnInit {
  libros: Observable<any> | any;
  router: Router = new Router();
  p: number = 1;
  filterPost = '';
  filterByAutor = '';
  filterByCategoria = '';
  catalogos: any = [];
  vistaGrid: boolean = false;

  constructor(
    private libroService: LibroService,
    private toastr: ToastrService
  ) {
    this.libroService.getCatalogo('CATEGORIA').subscribe(
      (res) => {
        this.catalogos = res;
      },
      (err) => console.log(err)
    );
  };

  cambiarVista(tipo: string) {
    if (tipo === 'list') {
      this.vistaGrid = false;
    } else {
      this.vistaGrid = true;
    }
  }

  getLibros() {
    this.libroService.getLibros().subscribe(
      (res) => {
        this.libros = res.sort((a: any, b: any) => {
          return a.id - b.id;
        });
        this.libros.map((libro: any, index: number) => {
          libro.fecha_creacion = timeAgo.format(new Date(libro.fecha_creacion));
          this.libroService.getFile(libro.archivo).subscribe(
            (res) => {
              this.libros[index].portada = URL.createObjectURL(res);
            },
            (err) => console.log(err)
          );
        });
      },
      (err) => console.log(err)
    );
  }

  showSuccess() {
    this.toastr.success('Libro eliminado con éxito!', 'Libro eliminado');
  }

  borrarLibro(uuid: string) {
    this.libroService.deleteLibro(uuid).subscribe(
      (res) => {
        console.log(res);
        this.showSuccess();
        this.getLibros();
      },
      (err) => console.log(err)
    );
  }

  descargarLibro(uuid: any, titulo: any) {
    this.libroService.downloadLibro(uuid).subscribe((res) => {
      fileDownload(res, `${titulo}.pdf`);
    });
  }

  ngOnInit(): void {
    this.getLibros();
  }
}
