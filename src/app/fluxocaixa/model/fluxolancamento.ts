import { Usuario } from './../../usuario/model/usuario';
import { Planoconta } from 'src/app/planocontas/model/planoconta';
import { Formapagamento } from 'src/app/formapagamento/model/formapagamento';
import { Fluxocaixa } from './fluxocaixa';

export class Fluxolancamento {
    idfluxolancamento: number;
    data: Date;
    valorentrada: number;
    valorsaida: number;
    planoconta: Planoconta;
    formapgamento: Formapagamento;
    fluxocaixa: Fluxocaixa;
    usuario: Usuario;
}
