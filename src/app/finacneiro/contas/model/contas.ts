import { Instituicao } from 'src/app/cliente/model/instituicao';
import { Contasarquivos } from './contasarquivos';
import { Formapagamento } from 'src/app/formapagamento/model/formapagamento';
import { Planoconta } from '../../planocontas/model/planoconta';
import { Conta } from 'src/app/conta/model/conta';


export class Contas {
    idcontas: number;
    documento: string;
    dataemissao: Date;
    datavencimento: Date;
    numeroparcela: string;
    valorparcela: number;
    desconto: number;
    juros: number;
    datapagamento: Date;
    valorpago: number;
    observacao: string;
    codigobarras: string;
    tipo: string;
    planoconta: Planoconta;
    instituicao: Instituicao;
    formapagamento: Formapagamento;
    conta: Conta;
    contasarquivosList: Contasarquivos[];
}
