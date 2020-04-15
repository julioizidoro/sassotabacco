import { Usuario } from './../../usuario/model/usuario';
import { Planoconta } from 'src/app/planocontas/model/planoconta';
import { Fluxocaixa } from './fluxocaixa';

export class Fluxolancamento {
    idfluxolancamento: number;
    data: Date;
    valorentrada: number;
    valorsaida: number;
    planoconta: Planoconta;
    fluxocaixa: Fluxocaixa;
    usuario: Usuario;
}
