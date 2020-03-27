import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment as env } from '../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Grupoplanoconta } from './model/grupoplanoconta';


@Injectable()
export class GrupoContasService {

  private grupoPlannoContas : Grupoplanoconta;

  constructor( private httpCliente: HttpClient) { }

  setGrupoPlanoContas( grupoPlanoContas: Grupoplanoconta) {
    this.grupoPlannoContas = grupoPlanoContas;
  }

  getGrupoPlanoContas() {
    return this.grupoPlannoContas;
  }

  listar(): Observable<Grupoplanoconta> {
    return this.httpCliente.get<Grupoplanoconta>(env.baseApiUrl + 'grupoplanocontas');
  }

  pesquisarDescricao(descricao: string): Observable<Grupoplanoconta> {
    return this.httpCliente.get<Grupoplanoconta>(env.baseApiUrl + 'grupoplanocontas/descricao/' + descricao);
  }

  pesquisarConta(conta: string): Observable<Grupoplanoconta> {
    return this.httpCliente.get<Grupoplanoconta>(env.baseApiUrl + 'grupoplanocontas/conta/' + conta);
  }

  salvar(grupoConta: Grupoplanoconta): Observable<any> {
      return this.httpCliente.post<any>(env.baseApiUrl + 'grupoplanocontas/salvar', grupoConta);
  }

  pesquisarId(id: number): Observable<Grupoplanoconta> {
    return this.httpCliente.get<Grupoplanoconta>(env.baseApiUrl + 'grupoplanocontas/id/' + id);
  }

}
