import { Formapagamento } from './model/formapagamento';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment as env } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class FormapagamentoService {

  private formaPagamento: Formapagamento;

  constructor( private httpCliente: HttpClient ) { }

  setFormaPagamento( formaPagamento: Formapagamento) {
    this.formaPagamento = formaPagamento;
  }

  getFormaPagamento() {
    return this.formaPagamento;
  }

  listar(): Observable<Formapagamento> {
    return this.httpCliente.get<Formapagamento>(env.baseApiUrl + 'formapagamento');
  }
}
