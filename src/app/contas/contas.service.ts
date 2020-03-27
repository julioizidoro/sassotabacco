import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Contas } from './model/contas';
import { environment as env } from '../../environments/environment.prod';
import { Instituicao } from '../cliente/model/instituicao';
import { Contasarquivos } from './model/contasarquivos';

@Injectable({
  providedIn: 'root'
})
export class ContasService {

  private conta: Contas;
  private isntituicao: Instituicao;
  private receber: boolean;

  constructor( private httpCliente: HttpClient ) {

  }

  setContas( conta: Contas) {
    this.conta = conta;
  }

  getContas() {
    return this.conta;
  }

  setInstituicao( instituicao: Instituicao) {
    this.isntituicao = instituicao;
  }

  getInstituicao() {
    return this.isntituicao;
  }

  setReceber( receber: boolean ) {
    this.receber = receber;
  }

  getReceber() {
    return this.receber;
  }


  // Contas a recever

  listarCR(): Observable<Contas> {
    return this.httpCliente.get<Contas>(env.baseApiUrl + 'cr');
  }

  getcrId( id: number ): Observable<Contas> {
    return this.httpCliente.get<Contas>(env.baseApiUrl + 'cr/id/' + id);
  }

  salvarCR(conta: Contas): Observable<any> {
    return this.httpCliente.post<any>(env.baseApiUrl + 'cr/salvar', conta);
  }

  baixarCR(conta: Contas): Observable<any> {
    return this.httpCliente.post<any>(env.baseApiUrl + 'cr/baixar', conta);
  }

  pesquisarDocumentoCR(documento: string):  Observable<any> {
    return this.httpCliente.get<any>(env.baseApiUrl + 'cr/doc/' + documento);
  }

  // Todas com dataVencimento
  pesquisarTodasVencimentoCR(dataInicial: string, dataFinal: string, nome: string):  Observable<any> {
    return this.httpCliente.post<any>(env.baseApiUrl + 'cr/dvtodas/', dataInicial + '/' + dataFinal + '/' + nome );
  }

  // Recebidas com dataVencimento dvrecebidas/{datainicial}/{datafinal}/{nome}
  pesquisarRecebidasVencimentoCR(dataInicial: string, dataFinal: string, nome: string):  Observable<any> {
    return this.httpCliente.post<any>(env.baseApiUrl + 'cr/dvrecebidas/', dataInicial + '/' + dataFinal + '/' + nome );
  }

  // Recebidas com dataVencimento dvrecebidas/{datainicial}/{datafinal}/{nome}
  pesquisarReceberVencimentoCR(dataInicial: string, dataFinal: string, nome: string):  Observable<any> {
    return this.httpCliente.post<any>(env.baseApiUrl + 'cr/dvreceber/', dataInicial + '/' + dataFinal + '/' + nome );
  }



// Contas a pagar

  listarCP(): Observable<Contas> {
    return this.httpCliente.get<Contas>(env.baseApiUrl + 'cp');
  }

  getcpId( id: number ): Observable<Contas> {
    return this.httpCliente.get<Contas>(env.baseApiUrl + 'cp/id/' + id);
  }

  salvarCP(conta: Contas): Observable<any> {
    return this.httpCliente.post<any>(env.baseApiUrl + 'cp/salvar', conta);
  }

  baixarCP(conta: Contas): Observable<any> {
  return this.httpCliente.post<any>(env.baseApiUrl + 'cp/baixar', conta);
}

pesquisarDocumentoCP(documento: string):  Observable<any> {
  return this.httpCliente.get<any>(env.baseApiUrl + 'cp/doc/' + documento);
}

// Todas com dataVencimento
pesquisarTodasVencimentoCP(dataInicial: string, dataFinal: string, nome: string):  Observable<any> {
  return this.httpCliente.get<any>(env.baseApiUrl + 'cp/dvtodas/' + dataInicial + '/' + dataFinal + '/' + nome );
}

// Recebidas com dataVencimento dvrecebidas/{datainicial}/{datafinal}/{nome}
pesquisarRecebidasVencimentoCP(dataInicial: string, dataFinal: string, nome: string):  Observable<any> {
  return this.httpCliente.post<any>(env.baseApiUrl + 'cp/dvrecebidas/', dataInicial + '/' + dataFinal + '/' + nome );
}

// Recebidas com dataVencimento dvrecebidas/{datainicial}/{datafinal}/{nome}
pesquisarReceberVencimentoCP(dataInicial: string, dataFinal: string, nome: string):  Observable<any> {
  return this.httpCliente.get<any>(env.baseApiUrl + 'cp/dvreceber/' + dataInicial + '/' + dataFinal + '/' + nome );
}

uploadPagar(file: File, fileName: string): Observable<any> {
  const uri = env.baseApiUrl + 'usuarios/picture';
  const formData = new FormData();
  formData.append('file', file, file.name);
  const request = new HttpRequest('POST', uri, formData);
  return this.httpCliente.request(request);
}

uploadReceber(file: File, fileName: string): Observable<any> {
  const uri = env.baseApiUrl + 'usuarios/picture';
  const formData = new FormData();
  formData.append('file', file, file.name);
  const request = new HttpRequest('POST', uri, formData);
  return this.httpCliente.request(request);
}

salvarArquivo(contasArquivo: Contasarquivos): Observable<any> {
  return this.httpCliente.post<any>(env.baseApiUrl + 'ca/salvar', contasArquivo);
}


}
