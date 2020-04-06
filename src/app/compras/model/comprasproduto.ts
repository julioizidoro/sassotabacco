import { Estoque } from 'src/app/estoque/model/estoque';
import { Compras } from './Comrpas';

export class Comprasproduto {
    idcomprasproduto: number;
    quantidade: number;
    custo: number;
    subtotal: number;
    compras: Compras;
    estoque: Estoque;
}