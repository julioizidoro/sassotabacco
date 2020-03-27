import { FluxocaixaService } from './fluxocaixa.service';
import { FluxocaixaComponent } from './fluxocaixa.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AccordionModule } from 'ngx-bootstrap';
import { ModalcontasComponent } from './modalcontas/modalcontas.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AgmCoreModule } from '@agm/core';
import { MDBBootstrapModule } from 'angular-bootstrap-md';

@NgModule({
  declarations: [
    FluxocaixaComponent,
    ModalcontasComponent,
  ],
  imports: [
    CommonModule,
    MDBBootstrapModule.forRoot(),
    HttpClientModule,
    ReactiveFormsModule,
    AccordionModule.forRoot(),
    AgmCoreModule.forRoot({
      // https://developers.google.com/maps/documentation/javascript/get-api-key?hl=en#key
      apiKey: ''
    }),
    BrowserAnimationsModule,
    FormsModule,
  ],
  exports: [
    FluxocaixaComponent,
    ModalcontasComponent,
    MDBBootstrapModule,
  ],
  providers: [
    FluxocaixaService
  ]
})
export class FluxocaixaModule { }
