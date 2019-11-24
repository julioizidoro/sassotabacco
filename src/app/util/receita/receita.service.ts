import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReceitaService {

  
  constructor( private httpCliente: HttpClient) { }

  pesquisarCNPJe(cnpj: string): Observable<any> {
    return this.httpCliente.get<any>('https://www.receitaws.com.br/v1/cnpj/' + cnpj);
  }

  
}
