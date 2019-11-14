import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AgmCoreModule } from '@agm/core';

import { CalendarModule,  } from 'angular-calendar';
import { SharedModule } from '../shared/shared.module';

import { TableComponent } from './tables/table.component';
import { ModalsComponent } from './modals/modals.component';
import { CardDashboardComponent } from './dashboards/common/card-dashboard/card-dashboard.component';
import { DashboardComponent } from './dashboards/dashboard/dashboard.component';
import {LoginComponent} from './login/login.component';
import {LinhaTempoComponent} from './dashboards/linha-tempo/linha-tempo.component';
import {GraficoVendasComponent} from './dashboards/grafico-vendas/grafico-vendas.component';
import {ChartModule} from 'primeng/chart';


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    SharedModule,
    ChartModule,
    AgmCoreModule.forRoot({
      // https://developers.google.com/maps/documentation/javascript/get-api-key?hl=en#key
      apiKey: ''
    }),
    CalendarModule.forRoot()
  ],
  declarations: [
    TableComponent,
    ModalsComponent,
    CardDashboardComponent,
    LinhaTempoComponent,
    GraficoVendasComponent,
    DashboardComponent,
    LoginComponent,
  ],
  exports: [
    TableComponent,
    ModalsComponent,
    CardDashboardComponent,
    DashboardComponent,
    LoginComponent,
  ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class ViewsModule { }
