import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment as env } from '../../environments/environment.prod';
import { Contasaldo } from '../conta/model/contasaldo';
import { Empresa } from '../empresa/model/empresa';

@Injectable({
  providedIn: 'root'
})
export class ContasaldoService {

  constructor( private httpCliente: HttpClient ) { }

  salvar(contaSaldo: Contasaldo): Observable<any> {
    return this.httpCliente.post<any>(env.baseApiUrl + 'contasaldos/salvar', contaSaldo);
  }

  listarMesAno(mesano: string, empresa: Empresa): Observable<Contasaldo> {
    
    return this.httpCliente.get<Contasaldo>(env.baseApiUrl + 'contasaldos/listar/' + mesano + '/' + empresa.idempresa);
  }

  getConta(idconta: number, mesano: string, empresa: Empresa): Observable<Contasaldo> {
    return this.httpCliente.get<Contasaldo>(env.baseApiUrl + 'contasaldos/conta/' + idconta + "/" + mesano + "/" + empresa.idempresa);
  }

  getId(id: number): Observable<Contasaldo> {
    return this.httpCliente.get<Contasaldo>(env.baseApiUrl + 'contasaldos/' + id);
  }

  fecharMesAtual(contaSaldo: Contasaldo): Observable<string> {
    return this.httpCliente.post<string>(env.baseApiUrl + 'contasaldos/gerarsaldo', contaSaldo);
  }

  getAtivos(empresa: Empresa): Observable<Contasaldo> {
    return this.httpCliente.get<Contasaldo>(env.baseApiUrl + 'contasaldos/ativos/' + empresa.idempresa);  
  }


}
