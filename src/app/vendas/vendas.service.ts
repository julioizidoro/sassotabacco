import { Injectable } from '@angular/core';
import { Vendaproduto } from './model/vendaproduto';
import { Venda } from './model/venda';
import { environment as env } from '../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../usuario/login/auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VendasService {

  private listaVendaProduto: Vendaproduto[];
  private venda: Venda;

  constructor(
    private httpCliente: HttpClient,
    private authService: AuthService,
  ) { }

  setVenda(venda: Venda) {
    this.venda = venda;
  }

  getVenda() {
    return this.venda;
  }

  setListaVendaProduto(listaVendaProduto: Vendaproduto[]){
    this.listaVendaProduto = listaVendaProduto;
  }

  getListaVendaProduto() {
    return this.listaVendaProduto;
  }

  salvar(venda: Venda): Observable<any> {
    return this.httpCliente.post<any>(env.baseApiUrl + 'vendas/salvar/venda', venda);
  }

  listar(): Observable<Venda> {
     return this.httpCliente.get<Venda>(env.baseApiUrl + 'vendas/venda/listar/' + this.authService.getEmpresa().idempresa);
  }

  listarData(datainicial: Date, datafinal: Date): Observable<Venda> {
    return this.httpCliente.get<Venda>(env.baseApiUrl + 'vendas/venda/' + datainicial + "/" + datafinal + "/" + this.authService.getEmpresa().idempresa);
 }

 getVendaId(id: number): Observable<Venda> {
  return this.httpCliente.get<Venda>(env.baseApiUrl + 'vendas/venda/' + id );
}

salvarProduto(listaVendaProduto: Vendaproduto[]): Observable<any> {
  return this.httpCliente.post<any>(env.baseApiUrl + 'vendas/salvar/produto', listaVendaProduto);
}

listarVendaProduto(idvenda: number): Observable<Venda> {
  return this.httpCliente.get<Venda>(env.baseApiUrl + 'vendas/venda/produto/listar/' + idvenda);
}




}
