import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cep } from './cep';


@Injectable()
export class CepService {

  constructor(private httpCliente: HttpClient) { }

  consultar(cep: string): Observable<Cep> {
    return this.httpCliente.get<Cep>('//viacep.com.br/ws/' + cep + '/json');
  }
}
