import { Instituicao } from 'src/app/cliente/model/instituicao';
import { Comprasconta } from './comprasconta';
import { Planoconta } from 'src/app/planocontas/model/planoconta';
import { Usuario } from 'src/app/usuario/model/usuario';
import { Comprasproduto } from './comprasproduto';
import { Empresa } from 'src/app/empresa/model/empresa';

export class Compras {
    idcompras: number;
    datacompra: Date;
    documento: string;
    valortotal: number;
    desconto: number;
    frete: number;
    totalliquido: number;
    formapagamento: string;
    observacao: string;
    instituicao: Instituicao;
    planoconta: Planoconta;
    usuario: Usuario;
    empresa: Empresa;

}