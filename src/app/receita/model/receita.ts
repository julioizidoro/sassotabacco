import { Estoque } from 'src/app/estoque/model/estoque';
import { Receitaproduto } from './receitaproduto';

export class Receita {

    idreceita: number;
    descricao: string;
    quantidade: number;
    estoque: Estoque;
}