import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaLibrosComponent } from './lista-libros/lista-libros.component';
import { FormularioLibroComponent } from './formulario-libro/formulario-libro.component';
import { ConsultaLibrosComponent } from './consulta-libros/consulta-libros.component';

const routes: Routes = [
  {
    path: 'libros',
    component: ListaLibrosComponent
  },
  {
    path: 'libros/editar/:id',
    component: FormularioLibroComponent
  },
  {
    path: 'libros/agregar',
    component: FormularioLibroComponent
  },
  {
    path: 'libros/consultar/:id',
    component: ConsultaLibrosComponent
  },
  {
    path: '**',
    redirectTo: '/libros',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

 }
