import { Injectable } from '@angular/core';
import { Receita } from './model/receita';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment as env } from '../../environments/environment.prod';
import { Receitaproduto } from './model/receitaproduto';

@Injectable({
  providedIn: 'root'
})
export class ReceitaService {

  private receita: Receita;

  constructor(
    private httpCliente: HttpClient,
  ) { }

  getReceita() {
    return this.receita;
  }

  setReceita(receita: Receita) {
    this.receita = receita;
  }

  salvar(receita: Receita): Observable<any> {
    return this.httpCliente.post<any>(env.baseApiUrl + 'receitas/salvar/receita', receita);
  }

  listar(descricao: string): Observable<Receita> {
    return this.httpCliente.get<Receita>(env.baseApiUrl + 'receitas/receita/listar/' + descricao);
  }

  pesquisarId(id: number): Observable<Receita> {
    return this.httpCliente.get<Receita>(env.baseApiUrl + 'receitas/receita/' + id);
  }

  //Receita Produto

  listarProduto(id: number): Observable<Receitaproduto> {
    return this.httpCliente.get<Receitaproduto>(env.baseApiUrl + 'receitas/produto/listar/' + id);
  }

  salvarProduto(listaReceitaProduto: Receitaproduto[]): Observable<any> {
    return this.httpCliente.post<any>(env.baseApiUrl + 'receitas/salvar/produto', listaReceitaProduto);
  }

  deleteProduto(receitaProduto: Receitaproduto): Observable<any> {
    return this.httpCliente.get<any>(env.baseApiUrl + 'receitas/produto/delete/' + receitaProduto.idreceitaproduto);
  }

}
