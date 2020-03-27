import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment as env } from '../../environments/environment.prod';
import { Contasaldo } from '../conta/model/contasaldo';

@Injectable({
  providedIn: 'root'
})
export class ContasaldoService {

  constructor( private httpCliente: HttpClient ) { }

  salvar(contaSaldo: Contasaldo): Observable<any> {
    return this.httpCliente.post<any>(env.baseApiUrl + 'contasaldos/salvar', contaSaldo);
  }

  listarMesAno(mesano: string): Observable<Contasaldo> {
    return this.httpCliente.get<Contasaldo>(env.baseApiUrl + 'contasaldos/listar/' + mesano);
  }

  getConta(idconta: number, mesano: string): Observable<Contasaldo> {
    return this.httpCliente.get<Contasaldo>(env.baseApiUrl + 'contasaldos/conta/' + idconta + "/" + mesano);
  }

  getId(id: number): Observable<Contasaldo> {
    return this.httpCliente.get<Contasaldo>(env.baseApiUrl + 'contasaldos/' + id);
  }


}
