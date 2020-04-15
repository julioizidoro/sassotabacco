import { Producao } from './producao';
import { Estoque } from 'src/app/estoque/model/estoque';

export class Producaoproduto {

    idproducaoproduto: number;
    quantidade: number;
    custo: number;
    producao: Producao;
    estoque: Estoque;
}