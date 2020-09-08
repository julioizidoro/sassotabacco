import { Estoque } from 'src/app/estoque/model/estoque';
import { Venda } from './venda';

export class Vendaproduto {

    idvendaproduto: number;
    quantidade: number;
    subtotal: number;
    estoque: Estoque;
    venda: Venda;
}