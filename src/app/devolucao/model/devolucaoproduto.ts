import { Devolucao } from './devolucao';
import { Estoque } from 'src/app/estoque/model/estoque';

export class Devolucaoproduto {

    iddevolucaoproduto: number;
    quantidade: number;
    custo: number;
    devolucao: Devolucao;
    estoque: Estoque;
}