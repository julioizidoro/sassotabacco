import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment as env } from '../../environments/environment.prod';
import { Contasaldo } from '../conta/model/contasaldo';
import { AuthService } from '../usuario/login/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ContasaldoService {

  constructor(
    private httpCliente: HttpClient,
    private authService: AuthService,
     ) { }

  salvar(contaSaldo: Contasaldo): Observable<any> {
    return this.httpCliente.post<any>(env.baseApiUrl + 'contasaldos/salvar', contaSaldo);
  }

  listarMesAno(mesano: string): Observable<Contasaldo> {
    console.log(this.authService.getEmpresa());
    return this.httpCliente.get<Contasaldo>(env.baseApiUrl + 'contasaldos/listar/' + mesano + "/" + this.authService.getEmpresa().idempresa);
  }

  getConta(idconta: number, mesano: string): Observable<Contasaldo> {
    return this.httpCliente.get<Contasaldo>(env.baseApiUrl + 'contasaldos/conta/' + idconta + "/" + mesano + "/" + this.authService.getEmpresa().idempresa);
  }

  getId(id: number): Observable<Contasaldo> {
    return this.httpCliente.get<Contasaldo>(env.baseApiUrl + 'contasaldos/' + id);
  }

  fecharMesAtual(contaSaldo: Contasaldo): Observable<string> {
    return this.httpCliente.post<string>(env.baseApiUrl + 'contasaldos/gerarsaldo' + '/' + this.authService.getEmpresa().idempresa, contaSaldo);
  }

  getAtivos(): Observable<Contasaldo> {
    return this.httpCliente.get<Contasaldo>(env.baseApiUrl + 'contasaldos/ativos'  + "/" + this.authService.getEmpresa().idempresa);
  }


}
