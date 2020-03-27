import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment as env } from '../../environments/environment.prod';
import { Fluxocaixa } from './model/fluxocaixa';

@Injectable({
  providedIn: 'root'
})
export class FluxocaixaService {

  constructor(  private httpCliente: HttpClient ) { }


  listar(): Observable<Fluxocaixa> {
    return this.httpCliente.get<Fluxocaixa>(env.baseApiUrl + 'fluxocaixa');
  }

  listarInicial(): Observable<Fluxocaixa> {
    return this.httpCliente.get<Fluxocaixa>(env.baseApiUrl + 'fluxocaixa/listar');
  }

  getId(id: number): Observable<Fluxocaixa> {
    return this.httpCliente.get<Fluxocaixa>(env.baseApiUrl + 'fluxocaixa/id' + id);
  }

  getData(data: Date): Observable<Fluxocaixa> {
    return this.httpCliente.get<Fluxocaixa>(env.baseApiUrl + 'fluxocaixa/data/' + data);
  }

}
