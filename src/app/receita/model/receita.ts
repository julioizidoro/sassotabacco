import { Estoque } from 'src/app/estoque/model/estoque';
import { Receitaproduto } from './receitaproduto';

export class Receita {

    idreceita: number;
    quantidade: number;
    unidade: number;
    estoque: Estoque;
    receitaprodutoList: Receitaproduto[];

}