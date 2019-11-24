import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment as env } from '../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Instituicao } from './model/instituicao';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor(
    private httpCliente: HttpClient
  ) { }

  salvar(instituicao: Instituicao): Observable<any> {
    return this.httpCliente.post<any>(env.baseApiUrl + 'instituicao/salvar', instituicao);
  }

  listar(tipo: string): Observable<Instituicao> {
    return this.httpCliente.get<Instituicao>(env.baseApiUrl + 'instituicao/listar/tipo/' + tipo);
  }

  pesquisar(nome: string, email: string): Observable<Instituicao> {
    return this.httpCliente.get<Instituicao>(env.baseApiUrl + 'instituicao/listar/nome/email');

  }

  pesquisarNome(nome: string): Observable<Instituicao> {
    return this.httpCliente.get<Instituicao>(env.baseApiUrl + 'instituicao/listar/nome');

  }

  pesquisarId(id: number): Observable<Instituicao> {
    return this.httpCliente.get<Instituicao>(env.baseApiUrl + 'instituicao/id/' + id);
  }
}
