import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment as env } from '../../environments/environment.prod';
import { Compras } from './model/Comrpas';

@Injectable({
  providedIn: 'root'
})
export class ComprasService {

  private compra: Compras;

  constructor(
    private httpCliente: HttpClient,
  ) { }

  setCompra(compra: Compras) {
    this.compra = compra;
  }

  getCompra() {
    return this.compra;
  }

  salvar(compra: Compras): Observable<any> {
    return this.httpCliente.post<any>(env.baseApiUrl + 'compras/salvar', compra);
  }

  listar(nome: string): Observable<Compras> {
    return this.httpCliente.get<Compras>(env.baseApiUrl + 'compras/listar/' + nome);
  }

  pesquisarDocumento(documento: string): Observable<Compras> {
    return this.httpCliente.get<Compras>(env.baseApiUrl + 'compras/listar/doc/' + documento);
  }

  pesquisarNome(nome: string): Observable<Compras> {
    return this.httpCliente.get<Compras>(env.baseApiUrl + 'compras/listar/nome/' + nome);
  }

  pesquisarId(id: number): Observable<Compras> {
    return this.httpCliente.get<Compras>(env.baseApiUrl + 'instituicao/' + id);
  }

}
