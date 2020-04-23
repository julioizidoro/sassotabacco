import { AgmCoreModule } from '@agm/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA, LOCALE_ID } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AppRoutes } from './app.routes.service';

import { ViewsModule } from './views/views.module';
;
import { ErrorModule } from './views/errors/error.module';

// main layout
import { NavigationModule } from './main-layout/navigation/navigation.module';
import { UsuarioModule } from './usuario/usuario.module';
import { HttpClientModule } from '@angular/common/http';
import { ClienteModule } from './cliente/cliente.module';
import { ProdutoModule } from './produto/produto.module';
import { FornecedorModule } from './fornecedor/fornecedor.module';
import {AccordionModule} from 'primeng/accordion';
import { ContaModule } from './conta/conta.module';
import { AcessoModule } from './acesso/acesso.module';
import { ApiReceitaModule } from './api-receita/api-receita.module';
import { ContasModule } from './contas/contas.module';
import { FluxocaixaModule } from './fluxocaixa/fluxocaixa.module';
import { PlanoContasModule } from './planocontas/planocontas.module';
import { GrupoContasModule } from './grupocontas/grupocontas.module';
import { registerLocaleData } from '@angular/common';
import localePtBr from '@angular/common/locales/pt';
import { AuthService } from './usuario/login/auth.service';
import { ModalModule } from 'ngx-bootstrap';
import { ComprasModule } from './compras/compras.module';
import { MomentModule } from 'angular2-moment';
import { ProducaoModule } from './producao/producao.module';
import { ReceitaModule } from './receita/receita.module';
import { DropdownModule } from 'primeng/dropdown';
import { ShareModule } from './share/share.module';
import { AcertoModule } from './acerto/acerto.module';
import { DevolucaoModule } from './devolucao/devolucao.module';
import { EmpresaModule } from './empresa/empresa.module';

registerLocaleData(localePtBr);

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AgmCoreModule.forRoot({
      apiKey: ''
    }),
    ModalModule.forRoot(),
    BrowserModule,
    DropdownModule,
    BrowserAnimationsModule,
    NavigationModule,
    AppRoutes,
    RouterModule,
    HttpClientModule,
    FormsModule,
    ShareModule,
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
    ApiReceitaModule,
    PlanoContasModule,
    GrupoContasModule,
    ComprasModule,
    MomentModule,
    ProducaoModule,
    ReceitaModule,
    AcertoModule,
    DevolucaoModule,
    EmpresaModule,
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'pt' },
    AuthService,
  ],
  bootstrap: [AppComponent],
  schemas: [ NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule { }
