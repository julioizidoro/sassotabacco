import { Formapagamento } from './../../formapagamento/model/formapagamento';
import { Instituicao } from 'src/app/cliente/model/instituicao';
import { Planoconta } from 'src/app/planocontas/model/planoconta';
import { Contasarquivos } from './contasarquivos';
import { Conta } from 'src/app/conta/model/conta';


export class Contas {
    idcontas: number;
    documento: string;
    dataemissao: Date;
    datavencimento: Date;
    numeroparcela: number;
    valorparcela: number;
    desconto: number;
    juros: number;
    datapagamento: Date;
    valorpago: number;
    observacao: string;
    codigobarras: string;
    tipo: string;
    instituicao: Instituicao;
    formapagamento: Formapagamento;
    conta: Conta;
    planoconta: Planoconta;
    contasarquivosList: Contasarquivos[];
}
