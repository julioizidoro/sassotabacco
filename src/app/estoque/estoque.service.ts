import { Injectable } from '@angular/core';
import { Estoque } from './model/estoque';
import { HttpClient } from '@angular/common/http';
import { environment as env } from '../../environments/environment.prod';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EstoqueService {

  private estoque: Estoque;

  constructor(
    private httpCliente: HttpClient
  ) { }

  setEstoque(estoque: Estoque) {
    this.estoque = estoque;
  }

  getEstoque() {
    return this.estoque;
  }

  salvar(estoque: Estoque): Observable<any> {
    return this.httpCliente.post<any>(env.baseApiUrl + 'estoque/salvar', estoque);
  }

  listarProdutoDescricao(descricao: string): Observable<Estoque> {
    return this.httpCliente.get<Estoque>(env.baseApiUrl + 'estoque/listar/produto/descricao/' + descricao);
  }

  listarProdutoCodigoBarras(codgioBarras: string): Observable<Estoque> {
    return this.httpCliente.get<Estoque>(env.baseApiUrl + 'estoque/listar/produto/cb/' + codgioBarras);
  }

  pesquisarId(id: number): Observable<Estoque> {
    return this.httpCliente.get<Estoque>(env.baseApiUrl + 'estoque/id/' + id);
  }

  pesquisarIdProduto(id: number): Observable<Estoque> {
    return this.httpCliente.get<Estoque>(env.baseApiUrl + 'estoque/produto/id/' + id);
  }
}
