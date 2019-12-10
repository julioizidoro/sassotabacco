import { Fluxocaixa } from './fluxocaixa';
import { Subcategoria } from 'src/app/categoria/model/subcategoria';
import { Usuario } from 'src/app/usuario/model/usuario';
import { Formapagamento } from 'src/app/formapagamento/model/formapagamento';

export class Fluxolancamento {
    idfluxolancamento: number;
    data: Date;
    valorentrada: number;
    valorsaida: number;
    sucategoria: Subcategoria;
    formapgamento: Formapagamento;
    fluxocaixa: Fluxocaixa;
    usuario: Usuario;
}
