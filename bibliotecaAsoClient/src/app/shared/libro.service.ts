import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LibroService {
  API_URI = 'http://localhost:3000/api';
  private _refresh$ = new Subject<void>();

  constructor(private http: HttpClient) {}


  getLibros(): Observable<any> {  
    return this.http.get(`${this.API_URI}/libros`);
  }

  getFile(uuid: string) {
    return this.http.get(`${this.API_URI}/libros/getFile/${uuid}`, {
      responseType: 'blob',
    });
  }

  getLibro(id: number) {
    return this.http.get(`${this.API_URI}/libros/${id}`);
  }

  deleteLibro(uuid: string) {
    return this.http.delete(`${this.API_URI}/libros/${uuid}`).pipe(
      tap(() => {
        this._refresh$.next();
      })
    );
  }

  saveLibro(libro: any) {
    return this.http.post(`${this.API_URI}/libros/`, libro);
  }

  uploadLibro(archivo: FormData) {
    return this.http.post(`${this.API_URI}/libros/upload`, archivo);
  }

  updateFile(archivo: FormData, uuid: string){
    return this.http.post(`${this.API_URI}/libros/updateFile/${uuid}`, archivo);
  }

  updateLibro(id: number, updatedLibro: any) {
    return this.http.put(`${this.API_URI}/libros/${id}`, updatedLibro);
  }

  downloadLibro(uuid: any) {
    return this.http.get(`${this.API_URI}/libros/download/${uuid}`, {
      responseType: 'blob',
    });
  }

  getCatalogo(tipo: string) {
    return this.http.get(`${this.API_URI}/catalogo/${tipo}`);
  }
}
