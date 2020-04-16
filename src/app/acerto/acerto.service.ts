import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment as env } from '../../environments/environment.prod';
import { Acerto } from './model/acerto';
import { Acertoproduto } from './model/acertoproduto';

@Injectable({
  providedIn: 'root'
})
export class AcertoService {

  private acerto: Acerto;

  constructor(
    private httpCliente: HttpClient,
  ) { }

    setAcerto(acerto: Acerto) {
      this.acerto = acerto;
    }

    getAcerto() {
      return this.acerto;
    }

    //Acerto

    salvarAcerto(acerto: Acerto): Observable<any> {
      return this.httpCliente.post<any>(env.baseApiUrl + 'acertos/salvar/acerto', acerto);
    }

    listarAcerto(): Observable<Acerto> {
      return this.httpCliente.get<Acerto>(env.baseApiUrl + 'acertos/listar/acerto');
    }

    acertoId(id: number): Observable<Acerto> {
      return this.httpCliente.get<Acerto>(env.baseApiUrl + 'acertos/acerto/' + id);
    }



    //Produto

    salvarproduto(lista: Acertoproduto[]): Observable<any> {
      return this.httpCliente.post<any>(env.baseApiUrl + 'acertos/salvar/produto', lista);
    }

    listarProduto(id: number): Observable<Acertoproduto> {
      return this.httpCliente.get<Acertoproduto>(env.baseApiUrl + 'acertos/listar/produto/' + id);
    }

    produtoId(id: number): Observable<Acertoproduto> {
      return this.httpCliente.get<Acertoproduto>(env.baseApiUrl + 'acertos/produto/' + id);
    }

}
