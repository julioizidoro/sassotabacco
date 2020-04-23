import { Conta } from 'src/app/conta/model/conta';
import { Empresa } from 'src/app/empresa/model/empresa';

export class Contasaldo {

    idcontasaldo: number;
    mesano: string;
    saldoinicial: number;
    entradas: number;
    saidas: number;
    saldoliquido: number;
    saldo: number;
    conta: Conta;
    empresa: Empresa;
}
