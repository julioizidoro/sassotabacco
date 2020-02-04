import { Fluxocaixa } from './fluxocaixa';
import { Usuario } from 'src/app/usuario/model/usuario';
import { Formapagamento } from 'src/app/formapagamento/model/formapagamento';
import { Planoconta } from '../../planocontas/model/planoconta';

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
