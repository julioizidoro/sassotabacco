import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment as env } from '../../environments/environment.prod';
import { Compras } from './model/Comrpas';
import { Comprasproduto } from './model/comprasproduto';
import { Comprasconta } from './model/comprasconta';
import { AuthService } from '../usuario/login/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ComprasService {

  private compra: Compras;
  private listaCompraProduto: Comprasproduto[];
  private listaCompraConta: Comprasconta[];

  constructor(
    private httpCliente: HttpClient,
    private authService: AuthService,
  ) { }

  setCompra(compra: Compras) {
    this.compra = compra;
  }

  getCompra() {
    return this.compra;
  }

  setListaCompraProduto(lista: Comprasproduto[]) {
    this.listaCompraProduto = lista;
  }

  getListaCompraProduto() {
    return this.listaCompraProduto;
  }

  setListaCompraConta(lista: Comprasconta[]) {
    this.listaCompraConta = lista;
  }

  getListaCompraConta() {
    return this.listaCompraConta;
  }

  salvar(compra: Compras): Observable<any> {
    return this.httpCliente.post<any>(env.baseApiUrl + 'compras/salvar', compra);
  }

    listar(nome: string): Observable<Compras> {
    return this.httpCliente.get<Compras>(env.baseApiUrl + 'compras/listar/' + nome + "/" + this.authService.getEmpresa().idempresa);
  }

  pesquisarDocumento(documento: string): Observable<Compras> {
    return this.httpCliente.get<Compras>(env.baseApiUrl + 'compras/listar/doc/' + documento + "/" + this.authService.getEmpresa().idempresa);
  }

  pesquisarNome(nome: string): Observable<Compras> {
    return this.httpCliente.get<Compras>(env.baseApiUrl + 'compras/listar/' + nome + "/" + this.authService.getEmpresa().idempresa);
  }

  pesquisarId(id: number): Observable<Compras> {
    return this.httpCliente.get<Compras>(env.baseApiUrl + 'compras/' + id);
  }

  //Compras produto
  salvarProduto(lista: Comprasproduto[]): Observable<any> {
    return this.httpCliente.post<any>(env.baseApiUrl + 'compras/salvar/produto', lista);
  }

  listarProduto(id: number): Observable<Comprasproduto> {
    return this.httpCliente.get<Comprasproduto>(env.baseApiUrl + 'compras/listar/produto/' + id);
  }



  //Compras conta

  salvarConta(lista: Comprasconta[]): Observable<any> {
    return this.httpCliente.post<any>(env.baseApiUrl + 'compras/salvar/conta', lista);
  }

  listarConta(id: number): Observable<Comprasconta> {
    return this.httpCliente.get<Comprasconta>(env.baseApiUrl + 'compras/listar/conta/' + id);
  }

}
