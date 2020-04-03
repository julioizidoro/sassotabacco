import { ConsfornecedorComponent } from './fornecedor/consfornecedor/consfornecedor.component';
import { TableComponent } from './views/tables/table.component';
import { RouterModule, Route } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { NotFoundComponent } from './views/errors/not-found/not-found.component';
import { DashboardComponent } from './views/dashboards/dashboard/dashboard.component';
import { ConsclienteComponent } from './cliente/conscliente/conscliente.component';
import { CadclienteComponent } from './cliente/cadcliente/cadcliente.component';
import { ConsprodutoComponent } from './produto/consproduto/consproduto.component';
import { CadprodutoComponent } from './produto/cadproduto/cadproduto.component';
import { CadfornecedorComponent } from './fornecedor/cadfornecedor/cadfornecedor.component';
import { CadcontaComponent } from './conta/cadconta/cadconta.component';
import { ConsccontaComponent } from './conta/conscconta/conscconta.component';
import { ConsusuarioComponent } from './usuario/consusuario/consusuario.component';
import { CadusuarioComponent } from './usuario/cadusuario/cadusuario.component';
import { ConsacessoComponent } from './acesso/consacesso/consacesso.component';
import { CadacessoComponent } from './acesso/cadacesso/cadacesso.component';
import { LoginComponent } from './usuario/login/login.component';
import { FluxocaixaComponent } from './fluxocaixa/fluxocaixa.component';
import { ConspagarComponent } from './contas/pagar/conspagar/conspagar.component';
import { ConsreceberComponent } from './contas/receber/consreceber/consreceber.component';
import { CadpagarComponent } from './contas/pagar/cadpagar/cadpagar.component';
import { CadreceberComponent } from './contas/receber/cadreceber/cadreceber.component';
import { CadsPlanoContasComponent } from './planocontas/cadplanocontas/cadplanocontas.component';
import { ConsPlanoContasComponent } from './planocontas/consplanocontas/consplanocontas.component';
import { ConsGrupoContasComponent } from './grupocontas/consgrupocontas/consgrupocontas.component';
import { CadGrupoContasComponent } from './grupocontas/cadgrupocontas/cadgrupocontas.component';
import { GerarsaldoComponent } from './fluxocaixa/gerarsaldo/gerarsaldo.component';

const routes: Route[] = [
  { path: '', pathMatch: 'full', redirectTo: 'inicio' },
  { path: 'inicio', component: DashboardComponent },
  { path: 'table', component: TableComponent },
  { path: 'login', component: LoginComponent },
  { path: 'conscliente', component: ConsclienteComponent },
  { path: 'consfornecedor', component: ConsfornecedorComponent },
  { path: 'cadfornecedor', component: CadfornecedorComponent },
  { path: 'cadcliente', component: CadclienteComponent },
  { path: 'consproduto', component: ConsprodutoComponent },
  { path: 'cadproduto', component: CadprodutoComponent },
  { path: 'consconta', component: ConsccontaComponent },
  { path: 'cadconta', component: CadcontaComponent },
  { path: 'fluxocaixa', component: FluxocaixaComponent },
  { path: 'fluxocaixa/:data', component: FluxocaixaComponent },
  { path: 'consusuario', component: ConsusuarioComponent },
  { path: 'cadusuario', component: CadusuarioComponent },
  { path: 'consacesso', component: ConsacessoComponent },
  { path: 'cadacesso', component: CadacessoComponent },
  { path: 'conspagar', component: ConspagarComponent },
  { path: 'consreceber', component: ConsreceberComponent },
  { path: 'cadpagar', component: CadpagarComponent },
  { path: 'cadreceber', component: CadreceberComponent },
  { path: 'cadplanocontas', component: CadsPlanoContasComponent },
  { path: 'consplanocontas', component: ConsPlanoContasComponent },
  { path: 'consgrupocontas', component: ConsGrupoContasComponent },
  { path: 'cadgrupocontas', component: CadGrupoContasComponent },
  { path: 'gerarsaldo', component: GerarsaldoComponent },
  { path: '**', component: NotFoundComponent },


];

export const AppRoutes: ModuleWithProviders = RouterModule.forRoot(routes);
