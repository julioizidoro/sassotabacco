import { Estoque } from 'src/app/estoque/model/estoque';
import { Receita } from './receita';

export class Receitaproduto {

    idreceitaproduto: number;
    quantidade: number;
    receita: Receita;
    estoque: Estoque;

}