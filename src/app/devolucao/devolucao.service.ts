import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment as env } from '../../environments/environment.prod';
import { DevolucaoModule } from './devolucao.module';
import { Devolucao } from './model/devolucao';
import { Devolucaoproduto } from './model/devolucaoproduto';



@Injectable({
  providedIn: 'root'
})
export class DevolucaoService {

  private devolucao: Devolucao;

  constructor(
    private httpCliente: HttpClient,
  ) { }

  getDevolucao() {
    return this.devolucao;
  }

  setDevolucao(devolucao: Devolucao) {
    this.devolucao = devolucao;
  }

  //Devolucao

  salvarDevolucao(devolucao: Devolucao): Observable<any> {
    return this.httpCliente.post<any>(env.baseApiUrl + 'devolucaoes/salvar/devolucao', devolucao);
  }

  listarDevolucao(): Observable<Devolucao> {
    return this.httpCliente.get<Devolucao>(env.baseApiUrl + 'devolucoes/listar/devolucao');
  }

  devolucaoId(id: number): Observable<Devolucao> {
    return this.httpCliente.get<Devolucao>(env.baseApiUrl + 'devolucoes/devolucao/' + id);
  }



  //Produto

  salvarproduto(lista: Devolucaoproduto[]): Observable<any> {
    return this.httpCliente.post<any>(env.baseApiUrl + 'devolucoes/salvar/produto', lista);
  }

  listarProduto(id: number): Observable<Devolucaoproduto> {
    return this.httpCliente.get<Devolucaoproduto>(env.baseApiUrl + 'devolucoes/listar/produto/' + id);
  }

  produtoId(id: number): Observable<Devolucaoproduto> {
    return this.httpCliente.get<Devolucaoproduto>(env.baseApiUrl + 'devolucoes/produto/' + id);
  }

}
