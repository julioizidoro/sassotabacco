import { AgmCoreModule } from '@agm/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA, LOCALE_ID } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AppRoutes } from './app.routes.service';

import { ViewsModule } from './views/views.module';
import { SharedModule } from './shared/shared.module';
import { ErrorModule } from './views/errors/error.module';

// main layout
import { NavigationModule } from './main-layout/navigation/navigation.module';
import { UsuarioModule } from './usuario/usuario.module';
import { HttpClientModule } from '@angular/common/http';
import { ClienteModule } from './cliente/cliente.module';
import { ProdutoModule } from './produto/produto.module';
import { FornecedorModule } from './fornecedor/fornecedor.module';
import {AccordionModule} from 'primeng/accordion';
import { registerLocaleData } from '@angular/common';
import { ContaModule } from './conta/conta.module';
import { FluxocaixaModule } from './finacneiro/fluxocaixa/fluxocaixa.module';
import { ContasModule } from './finacneiro/contas/contas.module';
import { AcessoModule } from './acesso/acesso.module';
import { FormapagamentoModule } from './formapagamento/formapagamento.module';
import { ApiReceitaModule } from './api-receita/api-receita.module';

//registerLocaleData(br, 'pt-BR');

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AgmCoreModule.forRoot({
      apiKey: ''
    }),
    BrowserModule,
    BrowserAnimationsModule,
    NavigationModule,
    AppRoutes,
    RouterModule,
    HttpClientModule,
    FormsModule,
    SharedModule,
    ViewsModule,
    ClienteModule,
    ProdutoModule,
    ErrorModule,
    ReactiveFormsModule,
    UsuarioModule,
    FornecedorModule,
    AccordionModule,
    ContaModule,
    FluxocaixaModule,
    ContasModule,
    AcessoModule,
    FormapagamentoModule,
    ApiReceitaModule,
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'pt-BR' }
  ],
  bootstrap: [AppComponent],
  schemas: [ NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule { }
