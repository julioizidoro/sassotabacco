import { Acerto } from './acerto';
import { Estoque } from 'src/app/estoque/model/estoque';

export class Acertoproduto {

    idacertoproduto: number;
    quantidade: number;
    custo: number;
    acerto: Acerto;
    estoque: Estoque;
}