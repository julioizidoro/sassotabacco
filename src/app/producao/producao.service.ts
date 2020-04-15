import { Injectable } from '@angular/core';
import { Producao } from './model/producao';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment as env } from '../../environments/environment.prod';
import { Producaoproduto } from './model/producaoproduto';

@Injectable({
  providedIn: 'root'
})
export class ProducaoService {

  private producao: Producao;


  constructor(
    private httpCliente: HttpClient,
  ) { }

  setProducao(producao: Producao) {
    this.producao = producao;
  }

  getProducao() {
    return this.producao;
  }

  salvar(producao: Producao): Observable<any> {
    return this.httpCliente.post<any>(env.baseApiUrl + 'producoes/salvar/producao', producao);
  }

  listar(descricao: string): Observable<Producao> {
    return this.httpCliente.get<Producao>(env.baseApiUrl + 'producoes/producao/listar/' + descricao);
  }

  pesquisarId(id: number): Observable<Producao> {
    return this.httpCliente.get<Producao>(env.baseApiUrl + 'producoes/producao/' + id);
  }

  //Produção produto

  salvarProduto(producaoProduto: Producaoproduto[]): Observable<any> {
    return this.httpCliente.post<any>(env.baseApiUrl + 'producoes/salvar/produto', producaoProduto);
  }

  listarProduto(id: number): Observable<Producaoproduto> {
    return this.httpCliente.get<Producaoproduto>(env.baseApiUrl + 'producoes/produto/listar/' + id);
  }
}
