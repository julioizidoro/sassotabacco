import { Injectable } from '@angular/core';
import { Conta } from './model/conta';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment as env } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ContaService {

  private conta: Conta;

  constructor(
    private httpCliente: HttpClient
  ) { }


  setConta( conta: Conta) {
    this.conta = conta;
  }

  getConta() {
    return this.conta;
  }

  salvar(conta: Conta): Observable<any> {
    return this.httpCliente.post<any>(env.baseApiUrl + 'contas/salvar', conta);
  }

  listar(descricao: string): Observable<Conta> {
    return this.httpCliente.get<Conta>(env.baseApiUrl + 'contas/listar/' + descricao);
  }
}
