import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuarioService } from './usuario.service';
import { CadusuarioComponent } from './cadusuario/cadusuario.component';
import { ConsusuarioComponent } from './consusuario/consusuario.component';
import { TextMaskModule } from 'angular2-text-mask';
import { HttpClientModule } from '@angular/common/http';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BsDatepickerModule } from 'ngx-bootstrap';
import { BrowserModule } from '@angular/platform-browser';
import { DropdownModule } from 'primeng/dropdown';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    CadusuarioComponent,
    ConsusuarioComponent,
    LoginComponent,
  ],
  exports: [
    CadusuarioComponent,
    ConsusuarioComponent,
    LoginComponent,
  ],
  imports: [
    CommonModule,
    TextMaskModule,
    MDBBootstrapModule.forRoot(),
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule,
    DropdownModule,
    FormsModule,
    BsDatepickerModule.forRoot(),
    BrowserModule,
  ],
  providers: [
    UsuarioService,
  ],
  schemas: [NO_ERRORS_SCHEMA],
})
export class UsuarioModule { }
