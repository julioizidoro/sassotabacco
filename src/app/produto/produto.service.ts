import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment as env } from '../../environments/environment.prod';
import { Produto } from './model/produto';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  constructor(
    private httpCliente: HttpClient
  ) { }

  salvar(produto: Produto): Observable<any> {
    return this.httpCliente.post<any>(env.baseApiUrl + 'produtos/salvar', produto);
  }

  listar(): Observable<Produto> {
    return this.httpCliente.get<Produto>(env.baseApiUrl + 'produtos');
  }

  pesquisarDescricao(descricao: string): Observable<Produto> {
    return this.httpCliente.get<Produto>(env.baseApiUrl + 'produtos/listar/descricao/' + descricao);

  }

  pesquisarCodigoBarras(codgioBarras: string): Observable<Produto> {
    return this.httpCliente.get<Produto>(env.baseApiUrl + 'produtos/listar/cb' + codgioBarras);
  }

  pesquisarId(id: number): Observable<Produto> {
    return this.httpCliente.get<Produto>(env.baseApiUrl + 'produtos/id/' + id);
  }
}