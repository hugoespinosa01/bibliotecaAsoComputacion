import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListaLibrosComponent } from './lista-libros/lista-libros.component';
import { FormularioLibroComponent } from './formulario-libro/formulario-libro.component';
import { LibroService } from './shared/libro.service';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { TablerIconsModule } from 'angular-tabler-icons';
import {NgxPaginationModule} from 'ngx-pagination';
import { IconBooks, 
        IconPlus,
        IconTrashFilled, 
        IconDownload,
        IconBookFilled,
        IconUser,
        IconFileInfo,
        IconCategory,
        IconClockHour4,
        IconPencil,
        IconSearch,
        IconChevronLeft,
        IconSend,
        IconReload,
        IconLayoutGrid,
        IconLayoutList
      } from 'angular-tabler-icons/icons';
import {PdfViewerModule} from 'ng2-pdf-viewer';
import { ConsultaLibrosComponent } from './consulta-libros/consulta-libros.component';
import { FilterPipe } from './pipes/filter.pipe'
import { FilterByAutorPipe } from './pipes/filterAutor.pipe';
import { FilerByCategoriaPipe } from './pipes/filterCategoria.pipe';

const icons = {
  IconBooks,
  IconPlus,
  IconTrashFilled,
  IconDownload,
  IconBookFilled,
  IconUser,
  IconFileInfo,
  IconCategory,
  IconClockHour4,
  IconPencil,
  IconSearch,
  IconChevronLeft,
  IconSend,
  IconReload,
  IconLayoutGrid,
  IconLayoutList
}

@NgModule({
  declarations: [
    AppComponent,
    ListaLibrosComponent,
    FormularioLibroComponent,
    ConsultaLibrosComponent,
    FilterPipe,
    FilterByAutorPipe,
    FilerByCategoriaPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    TablerIconsModule.pick(icons),
    PdfViewerModule,
    NgxPaginationModule
  ],
  providers: [LibroService],
  bootstrap: [AppComponent]
})
export class AppModule { }
