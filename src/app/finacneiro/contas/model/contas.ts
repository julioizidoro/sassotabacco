import { Instituicao } from 'src/app/cliente/model/instituicao';
import { Contasarquivos } from './contasarquivos';
import { Subcategoria } from 'src/app/categoria/model/subcategoria';
import { Formapagamento } from 'src/app/formapagamento/model/formapagamento';


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
    tipo: string;
    subcategoria: Subcategoria;
    instituicao: Instituicao;
    formapagamento: Formapagamento;
    codigobarras: string;
    contasarquivos: Contasarquivos[];
}
