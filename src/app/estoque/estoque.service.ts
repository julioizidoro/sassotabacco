import { Injectable } from '@angular/core';
import { Estoque } from './model/estoque';
import { HttpClient } from '@angular/common/http';
import { environment as env } from '../../environments/environment.prod';
import { Observable } from 'rxjs';
import { AuthService } from '../usuario/login/auth.service';

@Injectable({
  providedIn: 'root'
})
export class EstoqueService {

  private estoque: Estoque;

  constructor(
    private httpCliente: HttpClient,
    private authService: AuthService,
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
    return this.httpCliente.get<Estoque>(env.baseApiUrl + 'estoque/listar/produto/descricao/' + descricao + '/' + this.authService.getEmpresa().idempresa);
  }

  listarProdutoCodigoBarras(codgioBarras: string): Observable<Estoque> {
    return this.httpCliente.get<Estoque>(env.baseApiUrl + 'estoque/listar/produto/cb/' + codgioBarras + '/' + this.authService.getEmpresa().idempresa);
  }

  pesquisarId(id: number): Observable<Estoque> {
    return this.httpCliente.get<Estoque>(env.baseApiUrl + 'estoque/id/' + id);
  }

  pesquisarIdProduto(id: number): Observable<Estoque> {
    return this.httpCliente.get<Estoque>(env.baseApiUrl + 'estoque/produto/id/' + id + '/'+ this.authService.getEmpresa().idempresa);
  }
}
