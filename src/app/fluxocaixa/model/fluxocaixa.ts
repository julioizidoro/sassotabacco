import { Fluxocontas } from './fluxoconta';
import { Fluxolancamento } from './fluxolancamento';
import { Conta } from 'src/app/conta/model/conta';


export class Fluxocaixa {
    idfluxocaixa: number;
    data: Date;
    entradas: number;
    saidas: number;
    saldoanterior: number;
    saldoatual: number;
    entradasprevistas: number;
    saidasprevistas: number;
    fluxocontasList: Fluxocontas[];
    fluxolancamentoList: Fluxolancamento[];
    conta: Conta;
}
