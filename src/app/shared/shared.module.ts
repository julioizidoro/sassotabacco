
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { NgModule, NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CascadingPanelComponent } from './components/cascading-panel/cascading-panel.component';
import { PanelComponent } from './components/panel/panel.component';
import { ModalComponent } from './components/modal/modal.component';
import { ConfirmModalComponent } from './confirm-modal/confirm-modal.component';
import { CascadingCardComponent } from './components/cascading-card/cascading-card.component';
import { OverlayCardComponent } from './components/overlay-card/overlay-card.component';
import { AlertModalComponent } from './alert-modal/alert-modal.component';
import { ConsultacepService } from './cep/consultacep.service';

@NgModule({
  imports: [
    CommonModule,
    MDBBootstrapModule.forRoot(),

  ],
  declarations: [
    CascadingPanelComponent,
    CascadingCardComponent,
    OverlayCardComponent,
    PanelComponent,
    ModalComponent,
    ConfirmModalComponent, 
    AlertModalComponent,
  ],
  exports: [
    MDBBootstrapModule,
    CascadingPanelComponent,
    CascadingCardComponent,
    OverlayCardComponent,
    PanelComponent,
    ModalComponent,
    ConfirmModalComponent, 
    AlertModalComponent,
  ],
  providers: [
    ConsultacepService,
  ],
  schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]
})
export class SharedModule { }
