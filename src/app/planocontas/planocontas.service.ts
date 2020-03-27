import { Planoconta } from './model/planoconta';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment as env } from '../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';


@Injectable()
export class PlanoContasService {

  private planoConta: Planoconta;

  constructor( private httpCliente: HttpClient) { }

  setPlanoConta(planoConta: Planoconta) {
    this.planoConta = planoConta;
  }

  getPlanoConta() {
    return this.planoConta;
  }

  listar(): Observable<Planoconta> {
    return this.httpCliente.get<Planoconta>(env.baseApiUrl + 'planocontas');
  }

  pesquisarBens(): Observable<Planoconta> {
    return this.httpCliente.get<Planoconta>(env.baseApiUrl + 'planocontas/bens');
  }

  pesquisarDescricao(descricao: string): Observable<Planoconta> {
    return this.httpCliente.get<Planoconta>(env.baseApiUrl + 'planocontas/descricao/' + descricao);
  }

  pesquisarConta(conta: string): Observable<Planoconta> {
    return this.httpCliente.get<Planoconta>(env.baseApiUrl + 'planocontas/conta/' + conta);
  }

  pesquisarGrupo(idgrupo: number): Observable<Planoconta> {
    return this.httpCliente.get<Planoconta>(env.baseApiUrl + 'planocontas/grupo/' + idgrupo);
  }

  salvar(conta: Planoconta): Observable<any> {
      return this.httpCliente.post<any>(env.baseApiUrl + 'planocontas/salvar', conta);
  }

  pesquisarId(id: number): Observable<Planoconta> {
    return this.httpCliente.get<Planoconta>(env.baseApiUrl + 'planocontas/id/' + id);
  }
}
