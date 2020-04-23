import { Produto } from 'src/app/produto/model/produto';
import { Empresa } from 'src/app/empresa/model/empresa';

export class Estoque {

    idestoque: number;
    quantidadeestoque: number;
    customedio: number;
    valorvenda: number;
    produto: Produto;
    empresa: Empresa;

}