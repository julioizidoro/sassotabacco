import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiReceitaService {

  constructor(private httpClient: HttpClient) { }

  get(numero: string): Observable<any> {
    let retorno = this.httpClient.get<any>('https://www.receitaws.com.br/v1/cnpj/' + numero);
    console.log(retorno);
    return retorno;
  }
}
