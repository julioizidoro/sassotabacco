import { Fluxocontas } from './fluxoconta';
import { Fluxolancamento } from './fluxolancamento';
import { Conta } from 'src/app/conta/model/conta';
import { Empresa } from 'src/app/empresa/model/empresa';


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
    empresa: Empresa;
}
